// config/api.ts - ACTUALIZAR URL DEL BACKEND REAL
export const API_CONFIG = {
  // 🔧 CAMBIAR: URL donde corre tu backend real
  BASE_URL: "http://localhost:3000", // O la URL de tu backend

  // ✅ ENDPOINTS YA CONFIGURADOS según el backend
  ENDPOINTS: {
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout", // ✅ CAMBIADO a endpoint simplificado
    VERIFY_2FA: "/verify-2fa",
    TOGGLE_2FA: "/2fa/toggle",
    ME: "/me",
    HEALTH: "/health", // ✅ NUEVO endpoint
  },

  // ⚙️ CONFIGURACIÓN
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
}

// ✅ CONFIGURACIÓN YA AJUSTADA según el backend
export const AUTH_CONFIG = {
  USE_JWT: true,
  USE_COOKIES: true,
  TOKEN_STORAGE_KEY: "auth_token",
  USER_STORAGE_KEY: "user_data",
  CSRF_HEADER: "x-csrf-token", // ✅ Header CSRF del backend
}
