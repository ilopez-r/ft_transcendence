// pages/Play.ts
export default function Play(): string {
	return showMainMenu()
  }
  
  export function showMainMenu(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Game Arena</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/">← Back to Home</button>
			<div class="game-mode-selection fade-in">
			  <a href="/play/local" data-link class="mode-card local">
				<span class="mode-icon">🏠</span>
				<h2 class="mode-title">Local Play</h2>
				<p class="mode-description">Play with friends on the same device. Perfect for local tournaments and casual gaming sessions.</p>
			  </a>
			  
			  <a href="/play/online" data-link class="mode-card online">
				<span class="mode-icon">🌐</span>
				<h2 class="mode-title">Online Play</h2>
				<p class="mode-description">Challenge players from around the world. Compete in ranked matches and climb the leaderboards.</p>
			  </a>
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function showLocalOptions(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Local Play</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play">← Back to Main Menu</button>
			<div class="game-mode-selection fade-in">
			  <a href="/play/local/1vsai" data-link class="mode-card ai-match">
				<span class="mode-icon">🤖</span>
				<h2 class="mode-title">1 vs AI</h2>
				<p class="mode-description">Challenge our intelligent AI opponent. Perfect for practice and skill improvement.</p>
			  </a>
			  
			  <a href="/play/local/1vs1" data-link class="mode-card pvp-match">
				<span class="mode-icon">⚔️</span>
				<h2 class="mode-title">1 vs 1</h2>
				<p class="mode-description">Classic head-to-head match between two players on the same device.</p>
			  </a>
			  
			  <a href="/play/local/2vs2" data-link class="mode-card team-match">
				<span class="mode-icon">👥</span>
				<h2 class="mode-title">2 vs 2</h2>
				<p class="mode-description">Team up with a friend and face another duo in an epic 4-player battle.</p>
			  </a>
			</div>
			
		  </div>
		</div>
	  </div>
	`
  }
  
  export function showOnlineOptions(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Online Play</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play">← Back to Main Menu</button>
			<div class="game-mode-selection fade-in">
			  <a href="/play/online/1vs1" data-link class="mode-card online-1v1">
				<span class="mode-icon">⚔️</span>
				<h2 class="mode-title">1 vs 1</h2>
				<p class="mode-description">Classic online duel against another player from around the world.</p>
			  </a>
			  
			  <a href="/play/online/2vs2" data-link class="mode-card online-2v2">
				<span class="mode-icon">👥</span>
				<h2 class="mode-title">2 vs 2</h2>
				<p class="mode-description">Team-based online matches with various matchmaking options.</p>
			  </a>
			</div>
			
		  </div>
		</div>
	  </div>
	`
  }
  
  export function showOnline1v1Options(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">1 vs 1 Online</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play/online">← Back to Online Menu</button>
			<div class="game-mode-selection fade-in">
			  <a href="/play/online/1vs1/random" data-link class="mode-card random-match">
				<span class="mode-icon">🎲</span>
				<h2 class="mode-title">Random Match</h2>
				<p class="mode-description">Get matched instantly with a random opponent of similar skill level.</p>
			  </a>
			  
			  <a href="/play/online/1vs1/search" data-link class="mode-card search-match">
				<span class="mode-icon">🔍</span>
				<h2 class="mode-title">Search Player</h2>
				<p class="mode-description">Find and challenge a specific player by their username.</p>
			  </a>
			</div>
			
		  </div>
		</div>
	  </div>
	`
  }
  
  export function showOnline2v2Options(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">2 vs 2 Online</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play/online">← Back to Online Menu</button>
			<div class="game-mode-selection fade-in">
			  <a href="/play/online/2vs2/fullrandom" data-link class="mode-card full-random">
				<span class="mode-icon">🎲</span>
				<h2 class="mode-title">Full Random</h2>
				<p class="mode-description">Get matched with 3 random players. You'll be assigned a random teammate.</p>
			  </a>
			  
			  <a href="/play/online/2vs2/friend" data-link class="mode-card with-friend">
				<span class="mode-icon">👫</span>
				<h2 class="mode-title">Friends vs Random</h2>
				<p class="mode-description">Team up with a friend and face two random opponents together.</p>
			  </a>
			  
			  <a href="/play/online/2vs2/custom" data-link class="mode-card custom-match">
				<span class="mode-icon">⚙️</span>
				<h2 class="mode-title">Friends vs Friends</h2>
				<p class="mode-description">Create or join a custom 2 vs 2 match with specific players.</p>
			  </a>
			</div>
			
		  </div>
		</div>
	  </div>
	`
  }
  
  export function startLocalGame(mode: string): string {
	const modeTitle = mode === "1vsai" ? "1 vs AI" : mode === "1vs1" ? "1 vs 1" : "2 vs 2"
	const gameIcon = mode === "1vsai" ? "🤖" : mode === "1vs1" ? "⚔️" : "👥"
	const estimatedTime = mode === "1vsai" ? "~5 seconds" : mode === "1vs1" ? "~3 seconds" : "~10 seconds"
  
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">${modeTitle} Local</h1>
		  <div id="play-content" class="play-content">
			<button class="cancel-search-btn back-button" data-link href="/play/local">Cancel</button>
			<div class="random-match-container fade-in">
			  <div class="match-status">
				<div class="status-icon">${gameIcon}</div>
				<h2 class="status-title">Initializing ${modeTitle} game...</h2>
				<p class="status-description">Setting up local ${modeTitle} match</p>
				
				<div class="search-progress">
				  <div class="progress-bar">
					<div class="progress-fill local"></div>
				  </div>
				  <p class="search-info">
					Local game setup in progress
				  </p>
				</div>
				
				<div class="match-info">
				  <div class="info-item">
					<span class="info-label">Estimated setup:</span>
					<span class="info-value">${estimatedTime}</span>
				  </div>
				  <div class="info-item">
					<span class="info-label">Game mode:</span>
					<span class="info-value">${modeTitle} Local</span>
				  </div>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function showRandomMatch(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Random Match</h1>
		  <div id="play-content" class="play-content">
			<button class="cancel-search-btn back-button" data-link href="/play/online/1vs1">Cancel</button>
			<div class="random-match-container fade-in">
			  <div class="match-status">
				<div class="status-icon">🎲</div>
				<h2 class="status-title">Searching for opponent...</h2>
				<p class="status-description">We're finding you a random opponent with similar skill level</p>
				
				<div class="search-progress">
				  <div class="progress-bar">
					<div class="progress-fill random"></div>
				  </div>
				  <p class="search-info">
					<span class="online-count">247</span> players online
				  </p>
				</div>
				
				<div class="match-info">
				  <div class="info-item">
					<span class="info-label">Estimated wait:</span>
					<span class="info-value">~30 seconds</span>
				  </div>
				  <div class="info-item">
					<span class="info-label">Game mode:</span>
					<span class="info-value">1 vs 1</span>
				  </div>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function showPlayerSearch(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Find Player</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play/online/1vs1">← Back to 1 vs 1 Menu</button>
			<div class="player-search-container fade-in">
			  <div class="search-form">
				<h2 class="search-title">Search for a player</h2>
				<div class="search-input-container">
				  <input type="text" class="player-search-input" placeholder="Enter username..." />
				  <button class="search-btn">🔍</button>
				</div>
			  </div>
			  
			  <div class="search-results">
				<div class="results-header">
				  <h3>Recent players</h3>
				</div>
				<div class="recent-players">
				  <div class="player-item">
					<div class="player-avatar">👤</div>
					<div class="player-info">
					  <span class="player-name">ProGamer123</span>
					  <span class="player-status online">Online</span>
					</div>
					<button class="challenge-btn">Challenge</button>
				  </div>
				  
				  <div class="player-item">
					<div class="player-avatar">👤</div>
					<div class="player-info">
					  <span class="player-name">PongMaster</span>
					  <span class="player-status online">Online</span>
					</div>
					<button class="challenge-btn">Challenge</button>
				  </div>
				  
				  <div class="player-item">
					<div class="player-avatar">👤</div>
					<div class="player-info">
					  <span class="player-name">GameNinja</span>
					  <span class="player-status offline">Offline</span>
					</div>
					<button class="challenge-btn" disabled>Challenge</button>
				  </div>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function show2v2FullRandom(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Full Random 2 vs 2</h1>
		  <div id="play-content" class="play-content">
			<button class="cancel-search-btn back-button" data-link href="/play/online/2vs2">Cancel</button>
			<div class="random-match-container fade-in">
			  <div class="match-status">
				<div class="status-icon">🎲</div>
				<h2 class="status-title">Searching for 3 players...</h2>
				<p class="status-description">Finding you a random teammate and 2 opponents</p>
				
				<div class="search-progress">
				  <div class="progress-bar">
					<div class="progress-fill team"></div>
				  </div>
				  <p class="search-info">
					<span class="online-count">247</span> players online
				  </p>
				</div>
				
				<div class="match-info">
				  <div class="info-item">
					<span class="info-label">Estimated wait:</span>
					<span class="info-value">~45 seconds</span>
				  </div>
				  <div class="info-item">
					<span class="info-label">Game mode:</span>
					<span class="info-value">2 vs 2 Full Random</span>
				  </div>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function show2v2WithFriend(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Friends vs Random</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play/online/2vs2">← Back to 2 vs 2 Menu</button>
			<div class="player-search-container fade-in">
			  <div class="search-form">
				<h2 class="search-title">Invite a friend to team up</h2>
				<div class="search-input-container">
				  <input type="text" class="player-search-input" placeholder="Enter friend's username..." />
				  <button class="search-btn">🔍</button>
				</div>
			  </div>
			  
			  <div class="search-results">
				<div class="results-header">
				  <h3>Friends & Recent players</h3>
				</div>
				<div class="recent-players">
				  <div class="player-item">
					<div class="player-avatar">👤</div>
					<div class="player-info">
					  <span class="player-name">BestFriend42</span>
					  <span class="player-status online">Online</span>
					</div>
					<button class="invite-btn">Invite</button>
				  </div>
				  
				  <div class="player-item">
					<div class="player-avatar">👤</div>
					<div class="player-info">
					  <span class="player-name">TeamMate99</span>
					  <span class="player-status online">Online</span>
					</div>
					<button class="invite-btn">Invite</button>
				  </div>
				  
				  <div class="player-item">
					<div class="player-avatar">👤</div>
					<div class="player-info">
					  <span class="player-name">OfflineBuddy</span>
					  <span class="player-status offline">Offline</span>
					</div>
					<button class="invite-btn" disabled>Invite</button>
				  </div>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function show2v2Custom(): string {
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Friends vs Friends</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play/online/2vs2">← Back to 2 vs 2 Menu</button>
			<div class="player-search-container fade-in">
			  <div class="search-form">
				<h2 class="search-title">Invite players for custom 2 vs 2</h2>
				<div class="search-input-container">
				  <input type="text" class="player-search-input" placeholder="Search for players to invite..." />
				  <button class="search-btn">🔍</button>
				</div>
			  </div>
			  
			  <div class="invited-players">
				<h3>Invited Players</h3>
				<p class="invited-count">0/3 players invited</p>
				<div class="recent-players">
				  <div class="player-item" style="opacity: 0.5;">
					<div class="player-avatar">❓</div>
					<div class="player-info">
					  <span class="player-name">Waiting for invite...</span>
					  <span class="player-status">Teammate</span>
					</div>
				  </div>
				  <div class="player-item" style="opacity: 0.5;">
					<div class="player-avatar">❓</div>
					<div class="player-info">
					  <span class="player-name">Waiting for invite...</span>
					  <span class="player-status">Opponent</span>
					</div>
				  </div>
				  <div class="player-item" style="opacity: 0.5;">
					<div class="player-avatar">❓</div>
					<div class="player-info">
					  <span class="player-name">Waiting for invite...</span>
					  <span class="player-status">Opponent</span>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  
  export function startOnlineGame(mode: string): string {
	const modeTitle = mode === "quick" ? "Quick Match" : "Ranked Match"
	return `
	  <div class="play-page">
		<div class="game-arena">
		  <h1 class="play-title">Game Arena</h1>
		  <div id="play-content" class="play-content">
			<button class="back-button" data-link href="/play/online">← Back to Online Modes</button>
			<div class="game-starting fade-in">
			  <div class="game-board online">
				<h2 class="section-title">Starting ${modeTitle}</h2>
				<div class="game-placeholder">
				  <div class="game-icon">🌐</div>
				  <p>Searching for opponents...</p>
				  <div class="loading-bar">
					<div class="loading-progress online"></div>
				  </div>
				  <p style="margin-top: 1rem; font-size: 0.9rem; color: rgba(255, 255, 255, 0.5);">
					Players found: <span style="color: #00d4ff;">2/4</span>
				  </p>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
	  </div>
	`
  }
  