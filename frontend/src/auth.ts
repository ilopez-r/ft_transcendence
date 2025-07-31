// auth.ts - CORREGIDO: Hacer logout en backend ANTES de limpiar cookies
import { authService } from "./services/authService"
import { AUTH_CONFIG } from "./config/api"
import type { User } from "./types/api"

class AuthManager {
  private user: User | null = null
  private listeners: (() => void)[] = []
  private pending2FA: string | null = null // Email pendiente de 2FA
  private pending2FAPassword: string | null = null // ✅ NUEVO: Guardar password para 2FA

  constructor() {
    this.loadStoredAuth()
  }

  private loadStoredAuth(): void {
    try {
      const savedUser = localStorage.getItem(AUTH_CONFIG.USER_STORAGE_KEY)
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        console.log("📱 Usuario cargado desde localStorage:", this.user?.display_name)
      }
    } catch (error) {
      console.error("Error loading stored auth:", error)
      this.clearStorage()
    }
  }

  isAuthenticated(): boolean {
    return this.user !== null
  }

  getCurrentUser(): User | null {
    return this.user
  }

  isPending2FA(): boolean {
    return this.pending2FA !== null
  }

  getPending2FAEmail(): string | null {
    return this.pending2FA
  }

  // ✅ MÉTODO MEJORADO para limpiar cookies manualmente
  private clearCookies(): void {
    console.log("🍪 Limpiando cookies de sesión")

    // Lista de cookies que pueden existir
    const cookiesToClear = ["session_id", "csrf_token", "token"]

    cookiesToClear.forEach((cookieName) => {
      // Limpiar para diferentes paths y dominios
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=127.0.0.1;`
    })

    console.log("🍪 Cookies después de limpiar:", document.cookie)
  }

  // ✅ LOGIN actualizado - guarda password para 2FA
  async login(email: string, password: string): Promise<{ requires2FA: boolean }> {
    try {
      console.log("🔄 Iniciando login para:", email)

      const response = await authService.login({ email, password })

      // ✅ Verificar si requiere 2FA según tu backend
      if (response.twofa_required) {
        this.pending2FA = email
        this.pending2FAPassword = password // ✅ NUEVO: Guardar password para después
        console.log("⚠️ 2FA requerido para:", email)
        return { requires2FA: true }
      } else {
        // ✅ LOGIN EXITOSO - Obtener datos del usuario
        await this.fetchUserData()
        this.pending2FA = null
        this.pending2FAPassword = null // ✅ Limpiar password guardada
        this.notifyListeners()
        console.log("✅ Login completado")
        return { requires2FA: false }
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      throw error
    }
  }

  // ✅ VERIFICAR 2FA actualizado - usa password guardada
  async verify2FA(code: string): Promise<void> {
    if (!this.pending2FA || !this.pending2FAPassword) {
      throw new Error("No hay verificación 2FA pendiente")
    }

    try {
      console.log("🔄 Verificando código 2FA")

      // ✅ Verificar código 2FA
      await authService.verify2FA({
        email: this.pending2FA,
        code: code,
      })

      // ✅ Después de verificar 2FA, hacer login con la password guardada
      console.log("🔄 Haciendo login después de verificar 2FA")
      const loginResponse = await authService.login({
        email: this.pending2FA,
        password: this.pending2FAPassword, // ✅ USAR PASSWORD GUARDADA
      })

      // ✅ Obtener datos del usuario
      await this.fetchUserData()
      this.pending2FA = null
      this.pending2FAPassword = null // ✅ Limpiar password guardada
      this.notifyListeners()
      console.log("✅ 2FA verificado y login completado")
    } catch (error) {
      console.error("❌ 2FA verification error:", error)
      throw error
    }
  }

  // ✅ SIGNUP actualizado para tu backend
  async signup(username: string, email: string, password: string): Promise<void> {
    try {
      console.log("🔄 Iniciando registro para:", email)

      await authService.signup({
        display_name: username,
        email,
        password,
      })

      console.log("✅ Registro exitoso para:", email)

      // ✅ Después del registro, hacer login automático
      const loginResult = await this.login(email, password)

      if (loginResult.requires2FA) {
        console.log("⚠️ Registro exitoso, pero requiere 2FA")
      } else {
        console.log("✅ Registro y login completados")
      }
    } catch (error) {
      console.error("❌ Signup error:", error)
      throw error
    }
  }

  // ✅ LOGOUT CORREGIDO - hacer petición al backend ANTES de limpiar cookies
  async logout(): Promise<void> {
    try {
      console.log("🔄 Iniciando logout")

      // ✅ PRIMERO: Intentar logout en el backend CON las cookies
      try {
        console.log("🔄 Intentando logout en el backend...")
        await authService.logout()
        console.log("✅ Logout del backend exitoso")
      } catch (error) {
        console.warn("⚠️ Error en logout del backend:", error)
      }

      // ✅ SEGUNDO: Limpiar estado local DESPUÉS de la petición
      this.clearAuth()
      this.clearCookies()

      // ✅ Redirigir al home
      history.pushState(null, "", "/")
      window.dispatchEvent(new PopStateEvent("popstate"))

      console.log("✅ Logout completado - estado y cookies limpiados")
    } catch (error) {
      console.error("❌ Logout error:", error)
      // Asegurar que el estado se limpie aunque falle todo
      this.clearAuth()
      this.clearCookies()
    }
  }

  // ✅ VERIFICAR AUTH MEJORADO - limpiar localStorage si no hay sesión válida
  async verifyAuth(): Promise<boolean> {
    try {
      console.log("🔄 Verificando autenticación")

      // ✅ Siempre verificar con el backend, no confiar solo en localStorage
      const response = await authService.getMe()

      // ✅ Actualizar datos del usuario según tu backend
      this.user = {
        user_id: response.user.user_id,
        email: "", // Tu backend no devuelve email en /me
        display_name: response.user.display_name,
      }

      this.saveToStorage()
      console.log("✅ Usuario autenticado:", this.user.display_name)
      return true
    } catch (error) {
      console.log("ℹ️ No hay sesión activa en el backend - limpiando estado local")
      // ✅ NUEVO: Limpiar localStorage si no hay sesión válida
      this.clearAuth()
      this.clearCookies()
      return false
    }
  }

  // ✅ TOGGLE 2FA actualizado para tu backend
  async toggle2FA(): Promise<boolean> {
    try {
      console.log("🔄 Cambiando estado 2FA")

      const response = await authService.toggle2FA()

      // ✅ Actualizar estado local según tu backend
      if (this.user) {
        this.user.twofa_enabled = response.twofa_enabled
        this.saveToStorage()
      }

      console.log("✅ 2FA cambiado a:", response.twofa_enabled)
      return response.twofa_enabled
    } catch (error) {
      console.error("❌ 2FA toggle error:", error)
      throw error
    }
  }

  // ✅ Health check del backend
  async checkBackendHealth(): Promise<boolean> {
    try {
      await authService.healthCheck()
      return true
    } catch (error) {
      console.error("❌ Backend not available:", error)
      return false
    }
  }

  // ✅ Obtener datos completos del usuario
  private async fetchUserData(): Promise<void> {
    try {
      const response = await authService.getMe()
      this.user = {
        user_id: response.user.user_id,
        email: "", // Tu backend no devuelve email
        display_name: response.user.display_name,
      }
      this.saveToStorage()
    } catch (error) {
      console.error("Error fetching user data:", error)
      throw error
    }
  }

  onAuthChange(callback: () => void): void {
    this.listeners.push(callback)
  }

  private saveToStorage(): void {
    if (this.user) {
      localStorage.setItem(AUTH_CONFIG.USER_STORAGE_KEY, JSON.stringify(this.user))
      console.log("💾 Usuario guardado en localStorage:", this.user.display_name)
    }
  }

  private clearStorage(): void {
    localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_KEY)
    console.log("🗑️ localStorage limpiado")
  }

  // ✅ MÉTODO MEJORADO para limpiar completamente el estado
  private clearAuth(): void {
    console.log("🧹 Limpiando estado de autenticación completo")
    this.user = null
    this.pending2FA = null
    this.pending2FAPassword = null // ✅ NUEVO: Limpiar password guardada
    this.clearStorage()
    this.notifyListeners()
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback())
  }
}

export const authManager = new AuthManager()
export type { User }
