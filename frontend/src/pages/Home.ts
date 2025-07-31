// pages/Home.ts
export default function Home(): string {
  return `
    <div class="game-container">
      <div class="left-section">
        <div class="game-modes">
          <a href="/play" data-link class="game-mode-box quick-match">
            <div class="mode-icon">⚡</div>
            <span class="mode-title">QUICK MATCH</span>
            <p class="mode-subtitle">Jump into a game instantly</p>
          </a>
          
          <a href="/tournament" data-link class="game-mode-box tournament">
            <div class="mode-icon">🏆</div>
            <span class="mode-title">TOURNAMENT</span>
            <p class="mode-subtitle">Compete in tournaments</p>
          </a>
        </div>
      </div>
      
      <div class="right-section">
        <div class="chat-box" id="chat-section">
          <div class="chat-header">
            <h3>Game Chat</h3>
            <div class="online-indicator"></div>
          </div>
          <div class="chat-messages" id="chat-messages">
            <div class="chat-message system">Welcome to PONG!</div>
            <div class="chat-message user">Ready to play?</div>
          </div>
          <div class="chat-input-container">
            <input type="text" class="chat-input" placeholder="Type your message..." />
            <button class="chat-send">Send</button>
          </div>
        </div>
      </div>
    </div>
  `
}
