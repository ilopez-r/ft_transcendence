import { API_CONFIG, AUTH_CONFIG } from "../config/api"
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LogoutResponse,
  MeResponse,
  Verify2FARequest,
  Verify2FAResponse,
  Toggle2FAResponse,
  ApiError,
} from "../types/api"

class AuthService {
  // 🔧 Método para obtener CSRF token de las cookies
  private getCsrfToken(): string | null {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "csrf_token") {
        return value
      }
    }
    return null
  }

  // 🔧 Headers base para las peticiones
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // Agregar CSRF token si existe
    const csrfToken = this.getCsrfToken()
    if (csrfToken) {
      headers[AUTH_CONFIG.CSRF_HEADER] = csrfToken
    }

    return headers
  }

  // ✅ Headers SIN Content-Type para logout
  private getHeadersWithoutContentType(): Record<string, string> {
    const headers: Record<string, string> = {}

    // Agregar CSRF token si existe
    const csrfToken = this.getCsrfToken()
    if (csrfToken) {
      headers[AUTH_CONFIG.CSRF_HEADER] = csrfToken
    }

    return headers
  }

  // ✅ LOGIN actualizado para tu backend
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      console.log("🔄 Enviando login al backend:", data.email)

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: this.getHeaders(),
        credentials: "include",
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const result: LoginResponse = await response.json()
      console.log("✅ Login exitoso:", result.message)

      return result
    } catch (error) {
      console.error("❌ Login error:", error)
      throw error
    }
  }

  // ✅ SIGNUP actualizado para tu backend
  async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      console.log("🔄 Enviando registro al backend:", data.email)

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: this.getHeaders(),
        credentials: "include",
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || "Signup failed")
      }

      const result: SignupResponse = await response.json()
      console.log("✅ Registro exitoso:", result.message)

      return result
    } catch (error) {
      console.error("❌ Signup error:", error)
      throw error
    }
  }

  // ✅ LOGOUT CORREGIDO - sin Content-Type y con body vacío
  async logout(): Promise<LogoutResponse> {
    try {
      console.log("🔄 Enviando logout al backend")

      // 🔍 DEBUG: Mostrar cookies actuales ANTES de la petición
      console.log("🍪 Cookies antes del logout:", document.cookie)

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, {
        method: "POST",
        headers: this.getHeadersWithoutContentType(), // ✅ SIN Content-Type
        credentials: "include",
        body: JSON.stringify({}), // ✅ Body vacío pero válido
      })

      console.log("📥 Respuesta logout - Status:", response.status)

      if (response.ok) {
        const result: LogoutResponse = await response.json()
        console.log("✅ Logout exitoso:", result.message)

        // 🔍 DEBUG: Mostrar información adicional si está disponible
        if ("debug" in result) {
          console.log("🔍 Debug info:", result.debug)
        }

        return result
      } else {
        // ✅ Intentar leer el error del backend
        try {
          const errorData = await response.json()
          console.warn("⚠️ Error en logout del backend:", errorData)
        } catch {
          console.warn("⚠️ Error en logout del backend (sin detalles):", response.status)
        }

        return { message: "Logout successful (local only)" }
      }
    } catch (error) {
      console.error("❌ Logout error:", error)
      // Incluso si hay error, considerarlo como exitoso para el frontend
      return { message: "Logout successful (local only)" }
    }
  }

  // ✅ VERIFICAR USUARIO actualizado para tu backend
  async getMe(): Promise<MeResponse> {
    try {
      console.log("🔄 Verificando usuario autenticado")

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ME}`, {
        method: "GET",
        headers: this.getHeadersWithoutContentType(), // ✅ GET no necesita Content-Type
        credentials: "include",
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || "Authentication failed")
      }

      const result: MeResponse = await response.json()
      console.log("✅ Usuario autenticado:", result.user.display_name)

      return result
    } catch (error) {
      console.error("❌ Auth verification error:", error)
      throw error
    }
  }

  // ✅ VERIFICAR 2FA actualizado para tu backend
  async verify2FA(data: Verify2FARequest): Promise<Verify2FAResponse> {
    try {
      console.log("🔄 Verificando código 2FA para:", data.email)

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VERIFY_2FA}`, {
        method: "POST",
        headers: this.getHeaders(),
        credentials: "include",
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || "2FA verification failed")
      }

      const result: Verify2FAResponse = await response.json()
      console.log("✅ 2FA verificado:", result.message)

      return result
    } catch (error) {
      console.error("❌ 2FA verification error:", error)
      throw error
    }
  }

  // ✅ TOGGLE 2FA actualizado para tu backend
  async toggle2FA(): Promise<Toggle2FAResponse> {
    try {
      console.log("🔄 Cambiando estado 2FA")

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TOGGLE_2FA}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || "2FA toggle failed")
      }

      const result: Toggle2FAResponse = await response.json()
      console.log("✅ 2FA cambiado:", result.message)

      return result
    } catch (error) {
      console.error("❌ 2FA toggle error:", error)
      throw error
    }
  }

  // ✅ Health check del backend
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`, {
        method: "GET",
        headers: {}, // ✅ Health check no necesita headers especiales
      })

      if (!response.ok) {
        throw new Error("Backend not available")
      }

      const result = await response.json()
      console.log("✅ Backend health check:", result.status)
      return result
    } catch (error) {
      console.error("❌ Backend health check failed:", error)
      throw error
    }
  }
}

export const authService = new AuthService()
