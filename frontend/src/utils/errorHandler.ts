// utils/errorHandler.ts - Manejo centralizado de errores
export class ApiErrorHandler {
  static handle(error: any): string {
    console.error("API Error:", error)

    // Errores de red
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return "Unable to connect to server. Please check your internet connection."
    }

    // Errores de timeout
    if (error.name === "AbortError") {
      return "Request timed out. Please try again."
    }

    // Errores del backend
    if (error.message) {
      // Mapear errores comunes del backend a mensajes amigables
      const errorMappings: Record<string, string> = {
        "User already exists": "An account with this email already exists.",
        "Invalid credentials": "Invalid email or password.",
        "Invalid verification code": "The verification code is incorrect or has expired.",
        "2FA not enabled for this user": "Two-factor authentication is not enabled for this account.",
        "Authentication required": "Please log in to continue.",
        "Invalid or expired session": "Your session has expired. Please log in again.",
        "Invalid CSRF token": "Security token mismatch. Please refresh the page.",
      }

      return errorMappings[error.message] || error.message
    }

    return "An unexpected error occurred. Please try again."
  }

  static isNetworkError(error: any): boolean {
    return error.name === "TypeError" && error.message.includes("fetch")
  }

  static isAuthError(error: any): boolean {
    const authErrors = ["Authentication required", "Invalid or expired session", "Invalid CSRF token"]
    return authErrors.some((authError) => error.message?.includes(authError))
  }
}
