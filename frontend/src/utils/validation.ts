// utils/validation.ts - Validaciones del frontend
export class ValidationUtils {
  static validateEmail(email: string): { isValid: boolean; message?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      return { isValid: false, message: "Email is required" }
    }

    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address" }
    }

    return { isValid: true }
  }

  static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (!password) {
      return { isValid: false, message: "Password is required" }
    }

    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" }
    }

    // Opcional: validaciones adicionales
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }
    }

    return { isValid: true }
  }

  static validateDisplayName(displayName: string): { isValid: boolean; message?: string } {
    if (!displayName) {
      return { isValid: false, message: "Username is required" }
    }

    if (displayName.length < 3) {
      return { isValid: false, message: "Username must be at least 3 characters long" }
    }

    if (displayName.length > 20) {
      return { isValid: false, message: "Username must be less than 20 characters long" }
    }

    const validChars = /^[a-zA-Z0-9_-]+$/
    if (!validChars.test(displayName)) {
      return {
        isValid: false,
        message: "Username can only contain letters, numbers, underscores, and hyphens",
      }
    }

    return { isValid: true }
  }

  static validate2FACode(code: string): { isValid: boolean; message?: string } {
    if (!code) {
      return { isValid: false, message: "Verification code is required" }
    }

    if (code.length !== 6) {
      return { isValid: false, message: "Verification code must be 6 digits" }
    }

    if (!/^\d{6}$/.test(code)) {
      return { isValid: false, message: "Verification code must contain only numbers" }
    }

    return { isValid: true }
  }
}
