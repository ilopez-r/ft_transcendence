// router.ts - VERSIÓN PRODUCCIÓN (sin testing)
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TwoFA from "./pages/TwoFA"
import { authManager } from "./auth"
import {
  showMainMenu,
  showLocalOptions,
  showOnlineOptions,
  showOnline1v1Options,
  showOnline2v2Options,
  startLocalGame,
  startOnlineGame,
  showRandomMatch,
  showPlayerSearch,
  show2v2FullRandom,
  show2v2WithFriend,
  show2v2Custom,
} from "./pages/Play"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Tournament from "./pages/Tournament"

export function router() {
  const path = window.location.pathname
  const app = document.getElementById("app")

  if (!app) return

  // ✅ RUTAS
  if (path === "/") {
    app.innerHTML = Home()
  } else if (path === "/profile") {
    app.innerHTML = Profile()
  } else if (path === "/tournament") {
    app.innerHTML = Tournament()
  } else if (path === "/play") {
    app.innerHTML = showMainMenu()
  } else if (path === "/play/local") {
    app.innerHTML = showLocalOptions()
  } else if (path === "/play/online") {
    app.innerHTML = showOnlineOptions()
  } else if (path === "/play/online/1vs1") {
    app.innerHTML = showOnline1v1Options()
  } else if (path === "/play/online/2vs2") {
    app.innerHTML = showOnline2v2Options()
  } else if (path.startsWith("/play/local/")) {
    const parts = path.split("/")
    const mode = parts[3]
    if (mode === "1vsai" || mode === "1vs1" || mode === "2vs2") {
      app.innerHTML = startLocalGame(mode)
    } else {
      app.innerHTML = "<h2>404 - Invalid Local Mode</h2>"
    }
  } else if (path.startsWith("/play/online/1vs1/")) {
    const parts = path.split("/")
    const subMode = parts[4]
    if (subMode === "random") {
      app.innerHTML = showRandomMatch()
    } else if (subMode === "search") {
      app.innerHTML = showPlayerSearch()
    } else {
      app.innerHTML = "<h2>404 - Invalid 1v1 Mode</h2>"
    }
  } else if (path.startsWith("/play/online/2vs2/")) {
    const parts = path.split("/")
    const subMode = parts[4]
    if (subMode === "fullrandom") {
      app.innerHTML = show2v2FullRandom()
    } else if (subMode === "friend") {
      app.innerHTML = show2v2WithFriend()
    } else if (subMode === "custom") {
      app.innerHTML = show2v2Custom()
    } else {
      app.innerHTML = "<h2>404 - Invalid 2v2 Mode</h2>"
    }
  } else if (path.startsWith("/play/online/")) {
    const parts = path.split("/")
    const mode = parts[3]
    if (mode === "quick" || mode === "ranked") {
      app.innerHTML = startOnlineGame(mode)
    } else {
      app.innerHTML = "<h2>404 - Invalid Online Mode</h2>"
    }
  } else if (path === "/login") {
    app.innerHTML = Login()
  } else if (path === "/signup") {
    app.innerHTML = Signup()
  } else if (path === "/2fa") {
    // ✅ SOLO PERMITIR SI HAY 2FA PENDIENTE (SIN TESTING)
    if (authManager.isPending2FA()) {
      app.innerHTML = TwoFA()
    } else {
      // Si no hay 2FA pendiente, redirigir al login
      history.pushState(null, "", "/login")
      app.innerHTML = Login()
    }
  } else if (path !== "/") {
    app.innerHTML = "<h2>404 - Page Not Found</h2>"
  }

  // 🔧 ACTUALIZAR NAVEGACIÓN
  updateNavigation()
}

// 🔧 ACTUALIZAR NAVEGACIÓN SEGÚN AUTENTICACIÓN
function updateNavigation() {
  const navRight = document.getElementById("nav-right")
  if (!navRight) return

  if (authManager.isAuthenticated()) {
    // Usuario logueado: mostrar Profile y Logout
    navRight.innerHTML = `
      <a href="/profile" data-link class="nav-btn">Profile</a>
      <button class="nav-btn logout-btn" id="logout-btn">Logout</button>
    `

    // Agregar event listener para logout
    const logoutBtn = document.getElementById("logout-btn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await authManager.logout()
      })
    }
  } else {
    // Usuario no logueado: mostrar Login y Sign Up
    navRight.innerHTML = `
      <a href="/login" data-link class="nav-btn">Login</a>
      <a href="/signup" data-link class="nav-btn signup-btn">Sign Up</a>
    `
  }
}

// 🔧 ESCUCHAR CAMBIOS EN AUTENTICACIÓN
authManager.onAuthChange(() => {
  updateNavigation()
})
