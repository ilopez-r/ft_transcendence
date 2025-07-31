// main.ts - Actualizado para tu backend
import { router } from "./router"
import { authManager } from "./auth"

document.addEventListener("DOMContentLoaded", async () => {
  // ✅ VERIFICAR CONEXIÓN CON TU BACKEND
  console.log("🔄 Verificando conexión con el backend...")

  try {
    const backendAvailable = await authManager.checkBackendHealth()
    if (backendAvailable) {
      console.log("✅ Backend conectado correctamente")
      await authManager.verifyAuth()
    } else {
      console.warn("⚠️ Backend no disponible")
    }
  } catch (error) {
    console.warn("⚠️ Error conectando con backend:", error)
  }

  router()

  // 🔧 MANEJAR NAVEGACIÓN
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement
    const linkElement = target.closest("[data-link]") as HTMLElement

    if (linkElement) {
      e.preventDefault()
      const href = linkElement.getAttribute("href")

      if (href) {
        history.pushState(null, "", href)
        router()
      }
    }
  })

  window.addEventListener("popstate", router)

  // ✅ MANEJAR VALIDACIÓN EN TIEMPO REAL PARA 2FA
  document.body.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement

    if (target.id === "code" && target.maxLength === 6) {
      const value = target.value
      target.value = value.replace(/[^0-9]/g, "")

      if (target.value.length === 6) {
        target.classList.add("valid")
        target.classList.remove("invalid")
      } else {
        target.classList.remove("valid", "invalid")
      }
    }
  })

  // ✅ MANEJAR FORMULARIOS DE AUTENTICACIÓN
  document.body.addEventListener("submit", async (e) => {
    const target = e.target as HTMLFormElement

    if (target.id === "login-form") {
      e.preventDefault()
      await handleLogin(target)
    } else if (target.id === "signup-form") {
      e.preventDefault()
      await handleSignup(target)
    } else if (target.id === "twofa-form") {
      e.preventDefault()
      await handle2FA(target)
    }
  })

  // ✅ FUNCIÓN DE LOGIN
  async function handleLogin(form: HTMLFormElement) {
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement
    const buttonText = loginBtn.querySelector(".button-text") as HTMLElement
    const buttonLoader = loginBtn.querySelector(".button-loader") as HTMLElement

    loginBtn.disabled = true
    buttonText.style.display = "none"
    buttonLoader.style.display = "flex"

    try {
      const result = await authManager.login(email, password)

      if (result.requires2FA) {
        console.log("🔄 Redirigiendo a 2FA para:", email)
        history.pushState(null, "", "/2fa")
        router()
      } else {
        history.pushState(null, "", "/")
        router()
      }
    } catch (error: any) {
      console.error("Login error:", error)
      alert(error.message || "Login failed. Please try again.")
    } finally {
      loginBtn.disabled = false
      buttonText.style.display = "inline"
      buttonLoader.style.display = "none"
    }
  }

  // ✅ FUNCIÓN DE SIGNUP
  async function handleSignup(form: HTMLFormElement) {
    const formData = new FormData(form)
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    const signupBtn = document.getElementById("signup-btn") as HTMLButtonElement
    const buttonText = signupBtn.querySelector(".button-text") as HTMLElement
    const buttonLoader = signupBtn.querySelector(".button-loader") as HTMLElement

    signupBtn.disabled = true
    buttonText.style.display = "none"
    buttonLoader.style.display = "flex"

    try {
      await authManager.signup(username, email, password)

      if (authManager.isPending2FA()) {
        console.log("🔄 Registro exitoso, redirigiendo a 2FA")
        history.pushState(null, "", "/2fa")
        router()
      } else {
        history.pushState(null, "", "/")
        router()
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      alert(error.message || "Signup failed. Please try again.")
    } finally {
      signupBtn.disabled = false
      buttonText.style.display = "inline"
      buttonLoader.style.display = "none"
    }
  }

  // ✅ FUNCIÓN PARA MANEJAR 2FA
  async function handle2FA(form: HTMLFormElement) {
    const formData = new FormData(form)
    const code = formData.get("code") as string
    const codeInput = document.getElementById("code") as HTMLInputElement

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      codeInput.classList.add("invalid")
      alert("Please enter a valid 6-digit code")
      return
    }

    const twofaBtn = document.getElementById("twofa-btn") as HTMLButtonElement
    const buttonText = twofaBtn.querySelector(".button-text") as HTMLElement
    const buttonLoader = twofaBtn.querySelector(".button-loader") as HTMLElement

    twofaBtn.disabled = true
    buttonText.style.display = "none"
    buttonLoader.style.display = "flex"

    try {
      await authManager.verify2FA(code)
      history.pushState(null, "", "/")
      router()
    } catch (error: any) {
      console.error("2FA error:", error)
      codeInput.classList.add("invalid")
      alert(error.message || "Invalid code. Please try again.")
      codeInput.value = ""
      codeInput.focus()
    } finally {
      twofaBtn.disabled = false
      buttonText.style.display = "inline"
      buttonLoader.style.display = "none"
    }
  }
})
