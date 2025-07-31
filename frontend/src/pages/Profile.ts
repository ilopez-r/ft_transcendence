// pages/Profile.ts
export default function Profile(): string {
	return `
	  <div class="profile-page">
		<div class="profile-container">
		  <button class="back-button" data-link href="/">← Back to Home</button>
		  <div class="profile-header">
			<div class="avatar">
			  <div class="avatar-placeholder">👤</div>
			</div>
			<div class="profile-info">
			  <h1 class="username">Player Name</h1>
			  <p class="user-title">Gaming Champion</p>
			  <div class="user-stats">
				<div class="stat">
				  <span class="stat-value">1,234</span>
				  <span class="stat-label">Score</span>
				</div>
				<div class="stat">
				  <span class="stat-value">42</span>
				  <span class="stat-label">Wins</span>
				</div>
				<div class="stat">
				  <span class="stat-value">8</span>
				  <span class="stat-label">Losses</span>
				</div>
			  </div>
			</div>
		  </div>
		  
		  <div class="profile-sections">
			<div class="section">
			  <h2>Recent Matches</h2>
			  <div class="matches-list">
				<div class="match-item win">
				  <span class="match-result">WIN</span>
				  <span class="match-opponent">vs Player123</span>
				  <span class="match-score">15-12</span>
				</div>
				<div class="match-item loss">
				  <span class="match-result">LOSS</span>
				  <span class="match-opponent">vs ProGamer</span>
				  <span class="match-score">8-15</span>
				</div>
				<div class="match-item win">
				  <span class="match-result">WIN</span>
				  <span class="match-opponent">vs Newbie</span>
				  <span class="match-score">15-3</span>
				</div>
			  </div>
			</div>
			
			<div class="section">
			  <h2>Achievements</h2>
			  <div class="achievements-grid">
				<div class="achievement">
				  <div class="achievement-icon">🏆</div>
				  <span>First Win</span>
				</div>
				<div class="achievement">
				  <div class="achievement-icon">🔥</div>
				  <span>Win Streak</span>
				</div>
				<div class="achievement">
				  <div class="achievement-icon">⭐</div>
				  <span>Rising Star</span>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  