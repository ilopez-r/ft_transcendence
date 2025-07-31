// pages/TwoFA.ts
export default function TwoFA(): string {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-form-container">
          <div class="auth-header">
            <h1 class="auth-title">Two-Factor Authentication</h1>
            <p class="auth-subtitle">Enter the 6-digit code sent to your email</p>
          </div>
          
          <form class="auth-form" id="twofa-form">
            <div class="form-group">
              <label for="code" class="form-label">Verification Code</label>
              <div class="twofa-code-container">
                <input 
                  type="text" 
                  id="code" 
                  name="code" 
                  class="form-input" 
                  placeholder="000000"
                  required
                  maxlength="6"
                  pattern="[0-9]{6}"
                  autocomplete="one-time-code"
                />
              </div>
            </div>
            
            <button type="submit" class="auth-button twofa-verify" id="twofa-btn">
              <span class="button-text">Verify Code</span>
              <div class="button-loader" style="display: none;">
                <div class="loader-spinner"></div>
              </div>
            </button>
            
            <div class="auth-footer">
              <p>Didn't receive the code? <a href="#" class="auth-link resend-code" id="resend-code">Resend Code</a></p>
              <p><a href="/login" data-link class="auth-link">← Back to Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}
