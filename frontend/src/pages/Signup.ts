// pages/Signup.ts
export default function Signup(): string {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-form-container">
          <div class="auth-header">
            <h1 class="auth-title">Join PONG</h1>
            <p class="auth-subtitle">Create your account and start playing</p>
          </div>
          
          <form class="auth-form" id="signup-form">
            <div class="form-group">
              <label for="username" class="form-label">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                class="form-input" 
                placeholder="Choose a username"
                required
                minlength="3"
                maxlength="20"
              />
            </div>
            
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
                placeholder="Create a password"
                required
                minlength="8"
              />
            </div>
            
            <div class="form-group">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                name="confirm-password" 
                class="form-input" 
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <div class="form-options">
              <label class="checkbox-container">
                <input type="checkbox" id="terms" name="terms" required>
                <span class="checkmark"></span>
                I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
              </label>
            </div>
            
            <button type="submit" class="auth-button primary" id="signup-btn">
              <span class="button-text">Create Account</span>
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
              <p>Already have an account? <a href="/login" data-link class="auth-link">Log in</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}
