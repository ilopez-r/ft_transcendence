// types/api.ts - Tipos específicos según tu backend
export interface User {
  user_id: number
  email: string
  display_name: string
  twofa_enabled?: boolean
  twofa_verified?: boolean
}

// ✅ Respuesta de login según tu backend
export interface LoginResponse {
  message: string
  twofa_required?: boolean // Directamente en el root
}

// ✅ Respuesta de registro según tu backend
export interface SignupResponse {
  message: string
  user_id: number // Directamente en el root
}

// ✅ Respuesta de logout según tu backend
export interface LogoutResponse {
  message: string
}

// ✅ Respuesta de /me según tu backend
export interface MeResponse {
  message: string
  user: {
    user_id: number
    display_name: string
  }
  token: string
}

// ✅ Respuesta de verificación 2FA según tu backend
export interface Verify2FAResponse {
  message: string
}

// ✅ Respuesta de toggle 2FA según tu backend
export interface Toggle2FAResponse {
  message: string
  twofa_enabled: boolean
}

// ✅ Estructura de errores según tu backend
export interface ApiError {
  error: string
}

// ✅ Datos que se envían a tu backend
export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  display_name: string
}

export interface Verify2FARequest {
  email: string
  code: string
}
