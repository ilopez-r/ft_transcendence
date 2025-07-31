// pages/Login.ts
export default function Login(): string {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-form-container">
          <div class="auth-header">
            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Sign in to your PONG account</p>
          </div>
          
          <form class="auth-form" id="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div class="form-options">
              <label class="checkbox-container">
                <input type="checkbox" id="remember" name="remember">
                <span class="checkmark"></span>
                Remember me
              </label>
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>
            
            <button type="submit" class="auth-button primary" id="login-btn">
              <span class="button-text">Sign In</span>
              <div class="button-loader" style="display: none;">
                <div class="loader-spinner"></div>
              </div>
            </button>
            
            <div class="auth-divider">
              <span>or</span>
            </div>
            
            <div class="social-login">
              <button type="button" class="social-button google">
                <span class="social-icon">🔍</span>
                Continue with Google
              </button>
            </div>
            
            <div class="auth-footer">
              <p>Don't have an account? <a href="/signup" data-link class="auth-link">Sign up</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}
