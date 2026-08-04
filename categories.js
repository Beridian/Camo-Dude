<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Camo Dude</title>
  <!-- Load external categories, but we have a fallback in JS just in case -->
  <script src="categories.js"></script>
  <style>
    :root {
      /* Palette */
      --bg-yellow: #FFD93B;
      --bg-yellow-light: #FFE66D;
      --bg-card: #FFFFFF;
      --bg-surface: #F8FAFC;
      --bg-info: #FFF9D2;
      --border-color: #000000;
      
      /* Text Colors */
      --text-main: #000000;
      --text-muted: #475569;
      --text-light: #FFFFFF;
      
      /* Accents */
      --accent-coral: #FF6B6B;
      --accent-teal: #4ECDC4;
      --accent-yellow: #FFD93B;
      --accent-purple: #C7D2FE;
      --accent-danger: #FF4757;
      
      /* Radii */
      --radius-lg: 24px;
      --radius-md: 16px;
      --radius-sm: 12px;
      
      /* Shadows */
      --shadow-base: 4px 4px 0px 0px var(--border-color);
      --shadow-hover: 6px 6px 0px 0px var(--border-color);
      --shadow-active: 2px 2px 0px 0px var(--border-color);
      --shadow-card: 8px 8px 0px 0px var(--border-color);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    body {
      background-color: var(--bg-yellow);
      background-image: radial-gradient(circle at 50% 0%, var(--bg-yellow-light) 0%, var(--bg-yellow) 100%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 1rem;
      overflow-x: hidden;
    }

    /* Container */
    #app {
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding-bottom: 2rem;
      padding-top: 3rem; /* Space for audio button */
    }

    .top-audio-btn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 50;
    }

    /* Buttons */
    .audio-btn {
      background: var(--accent-teal);
      border: 3px solid var(--border-color);
      color: var(--text-main);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.35rem;
      box-shadow: var(--shadow-base);
      transition: all 0.15s ease;
    }

    .audio-btn:active {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-active);
    }

    .btn {
      width: 100%;
      min-height: 54px;
      padding: 0.85rem 1.25rem;
      border-radius: var(--radius-md);
      border: 3px solid var(--border-color);
      font-size: 1.1rem;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      transition: all 0.15s ease;
      white-space: nowrap;
      box-shadow: var(--shadow-base);
    }

    .btn:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover);
    }

    .btn:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-active);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(0.5);
    }

    .btn-primary { background: var(--accent-coral); color: var(--text-main); }
    .btn-secondary { background: var(--bg-card); color: var(--text-main); }
    .btn-success { background: var(--accent-teal); color: var(--text-main); }
    .btn-warning { background: var(--accent-yellow); color: var(--text-main); }
    .btn-danger { background: var(--accent-danger); color: var(--text-light); }

    /* Screen Management & Animation */
    .screen-card {
      background: var(--bg-card);
      border: 4px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.75rem 1.5rem;
      box-shadow: var(--shadow-card);
      display: none;
      flex-direction: column;
      gap: 1.5rem;
    }

    .screen-card.active {
      display: flex;
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    @keyframes popIn {
      from { opacity: 0; transform: translateY(15px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Typography & Structural Utilities */
    .card-title {
      font-size: 1.75rem;
      font-weight: 900;
      text-align: center;
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }

    .card-subtitle {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-muted);
      text-align: center;
      line-height: 1.4;
      margin-top: -0.75rem;
    }

    .section-label {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .info-box {
      background: var(--bg-info);
      padding: 1rem;
      border-radius: var(--radius-md);
      border: 3px solid var(--border-color);
      box-shadow: var(--shadow-base);
      text-align: center;
    }

    .flex-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
    }

    /* Scrollable Utility */
    .scroll-box {
      max-height: 280px;
      overflow-y: auto;
      padding: 0.25rem;
      margin: -0.25rem;
      padding-right: 0.5rem;
    }
    
    /* Make scrollbars neat on supporting browsers */
    .scroll-box::-webkit-scrollbar, .player-inputs::-webkit-scrollbar {
      width: 6px;
    }
    .scroll-box::-webkit-scrollbar-track, .player-inputs::-webkit-scrollbar-track {
      background: transparent;
    }
    .scroll-box::-webkit-scrollbar-thumb, .player-inputs::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2);
      border-radius: 4px;
    }

    /* Player Counter Grid */
    .counter-row {
      background: var(--bg-yellow-light);
      border: 3px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 0.85rem 1.25rem;
      box-shadow: var(--shadow-base);
    }

    .counter-label {
      font-weight: 800;
      font-size: 1.1rem;
    }

    .counter-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .counter-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--bg-card);
      border: 3px solid var(--border-color);
      font-size: 1.35rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 3px 3px 0px 0px var(--border-color);
      transition: all 0.1s ease;
    }

    .counter-btn:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0px 0px var(--border-color);
    }

    .counter-val {
      font-size: 1.4rem;
      font-weight: 900;
      width: 32px;
      text-align: center;
    }

    /* Inputs */
    .player-inputs {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-height: 240px;
      overflow-y: auto;
      padding-right: 0.25rem;
    }

    .input-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--bg-surface);
      border: 3px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 0.6rem 1rem;
      box-shadow: 3px 3px 0px 0px var(--border-color);
      transition: background-color 0.2s;
    }
    
    .input-group:focus-within {
      background: var(--bg-card);
    }

    .input-avatar { font-size: 1.3rem; }
    
    .input-field {
      width: 100%;
      background: transparent;
      border: none;
      color: var(--text-main);
      font-size: 1.05rem;
      font-weight: 800;
      outline: none;
    }
    .input-field::placeholder { color: #94A3B8; font-weight: 600; }

    /* Selection Grids */
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .grid-1 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .selectable-card {
      background: var(--bg-card);
      border: 3px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 0.85rem;
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: var(--shadow-base);
    }

    .selectable-card:hover {
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover);
      background: var(--bg-info);
    }

    .selectable-card.selected {
      background: var(--accent-purple);
      border-width: 3px;
    }
    
    .category-card { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
    .category-card.selected { background: var(--accent-teal); }
    .category-icon { font-size: 1.8rem; }
    .category-name { font-size: 0.95rem; font-weight: 800; word-break: break-word; }

    .mode-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }
    .mode-icon { font-size: 1.3rem; }
    .mode-title { font-size: 1rem; font-weight: 900; text-transform: uppercase; }
    .mode-desc { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); line-height: 1.35; }

    .toggle-card {
      background: var(--accent-purple);
      padding: 0.85rem 1.25rem;
    }
    .toggle-card[data-active="false"] { background: var(--bg-card); }

    /* Special Sections (Shield, Secret) */
    .shield-box {
      text-align: center;
      padding: 2.5rem 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      background: var(--bg-yellow-light);
      border: 4px solid var(--border-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-hover);
    }
    .shield-icon { font-size: 5rem; animation: pulse 2s infinite ease-in-out; }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .player-target-badge {
      font-size: 2rem;
      font-weight: 900;
      background: var(--bg-card);
      padding: 0.75rem 2rem;
      border-radius: 999px;
      border: 3px solid var(--border-color);
      box-shadow: var(--shadow-base);
      text-transform: uppercase;
    }

    .secret-box {
      border-radius: var(--radius-lg);
      padding: 2.5rem 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      border: 4px solid var(--border-color);
      box-shadow: var(--shadow-card);
    }
    .secret-box.insider { background: var(--accent-teal); }
    .secret-box.imposter { background: var(--accent-coral); }

    .role-badge {
      display: inline-block;
      padding: 0.6rem 1.5rem;
      border-radius: 999px;
      font-size: 1rem;
      font-weight: 900;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin: 0 auto;
      border: 3px solid var(--border-color);
      box-shadow: 3px 3px 0px 0px var(--border-color);
      background: var(--bg-card);
    }

    .secret-word-display {
      font-size: 2.5rem;
      font-weight: 900;
      background: var(--bg-card);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      border: 3px solid var(--border-color);
      box-shadow: var(--shadow-base);
      line-height: 1.2;
      color: var(--text-main);
    }

    .tip-box {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5;
      background: rgba(255, 255, 255, 0.9);
      padding: 1rem;
      border-radius: var(--radius-sm);
      border: 3px solid var(--border-color);
    }

    /* Discussion Phase & Timer */
    .timer-display {
      font-size: 3rem;
      font-weight: 900;
      text-align: center;
      font-variant-numeric: tabular-nums;
      margin: 0.5rem 0;
    }

    .turn-order-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      background: var(--bg-info);
      padding: 1rem;
      border-radius: var(--radius-md);
      border: 3px solid var(--border-color);
      box-shadow: var(--shadow-base);
    }

    .turn-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      font-weight: 800;
    }

    .turn-num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--border-color);
      font-size: 0.95rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bg-card);
    }

    /* Resolution Phase */
    .result-banner {
      font-size: 2.25rem;
      font-weight: 900;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      padding: 1rem;
      border: 4px solid var(--border-color);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-hover);
    }
    .result-banner.win { background: var(--accent-teal); }
    .result-banner.loss { background: var(--accent-coral); }

    .result-detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: var(--bg-info);
      border-radius: var(--radius-sm);
      border: 3px solid var(--border-color);
      box-shadow: 3px 3px 0px 0px var(--border-color);
    }
    .result-detail-label { font-size: 1rem; font-weight: 800; }
    .result-detail-value { font-size: 1.15rem; font-weight: 900; }

  </style>
</head>
<body>

  <main id="app">
    <!-- Floating Audio Toggle -->
    <div class="top-audio-btn">
      <button class="audio-btn" id="audioToggleBtn" title="Toggle Sound" aria-label="Toggle Audio">🔊</button>
    </div>

    <!-- SCREEN 1: SETUP -->
    <div id="screenSetup" class="screen-card active">
      <h1 class="card-title">🥸 Camo Dude</h1>

      <!-- Player Count -->
      <div class="counter-row flex-row">
        <span class="counter-label">Players</span>
        <div class="counter-controls">
          <button class="counter-btn" id="btnMinusPlayers" aria-label="Decrease players">-</button>
          <span class="counter-val" id="playerCountVal">4</span>
          <button class="counter-btn" id="btnPlusPlayers" aria-label="Increase players">+</button>
        </div>
      </div>

      <!-- Player Names -->
      <div>
        <div class="section-label">Names</div>
        <div class="player-inputs" id="playerInputsContainer"></div>
      </div>

      <!-- Game Mode Selection -->
      <div>
        <div class="section-label">Game Mode</div>
        <div class="grid-1" id="modeGrid">
          <div class="selectable-card selected" data-mode="hint">
            <div class="mode-header">
              <span class="mode-icon">💡</span><span class="mode-title">Hint Mode</span>
            </div>
            <div class="mode-desc">Camo Dude gets a hint.</div>
          </div>
          <div class="selectable-card" data-mode="no_hint">
            <div class="mode-header">
              <span class="mode-icon">❓</span><span class="mode-title">No Hint Mode</span>
            </div>
            <div class="mode-desc">Camo Dude hard mode.</div>
          </div>
          <div class="selectable-card" data-mode="decoy">
            <div class="mode-header">
              <span class="mode-icon">🎭</span><span class="mode-title">Decoy Word Mode</span>
            </div>
            <div class="mode-desc">Camo Dude doesn't know they are imposter, gets a fake word!</div>
          </div>
          <div class="selectable-card" data-mode="double_trouble">
            <div class="mode-header">
              <span class="mode-icon">🎪</span><span class="mode-title">Double Agent Mode</span>
            </div>
            <div class="mode-desc">1 Camo Dude (No Hint) + 1 Dunce (Fake Word)!</div>
          </div>
        </div>
      </div>

      <!-- Turn Order Setting -->
      <div>
        <div class="section-label">Turn Order Setting</div>
        <div id="turnOrderToggleCard" class="selectable-card toggle-card flex-row" data-active="true">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">🎲</span>
            <div>
              <div class="mode-title">Randomize Order</div>
              <div class="mode-desc">Shuffle starting turn</div>
            </div>
          </div>
          <div style="font-size: 1.5rem;" id="turnOrderBadge">✅</div>
        </div>
      </div>

      <!-- Category Selection (Scrollable to support many topics securely) -->
      <div>
        <div class="section-label">Select Topic Category</div>
        <div class="scroll-box">
          <div class="grid-2" id="categoryGrid"></div>
        </div>
      </div>

      <button class="btn btn-primary" id="btnStartGame">Start Game</button>
    </div>

    <!-- SCREEN 2: PASS & PLAY SHIELD -->
    <div id="screenShield" class="screen-card">
      <div class="shield-box">
        <div class="shield-icon">🙈</div>
        <div class="section-label">Secret</div>
        <div style="font-size: 1.25rem; font-weight: 800;">Pass the device to:</div>
        <div class="player-target-badge" id="shieldPlayerName">Player 1</div>
        <button class="btn btn-primary" id="btnRevealSecret">Reveal</button>
      </div>
    </div>

    <!-- SCREEN 3: SECRET REVEAL -->
    <div id="screenReveal" class="screen-card">
      <div class="secret-box" id="secretBox">
        <div class="role-badge" id="roleBadge">INSIDER</div>
        <div class="section-label" id="revealCategoryLabel">Topic Category</div>
        <div class="secret-word-display" id="secretWordDisplay">Elephant</div>
        <div class="tip-box" id="revealTipBox">
          Say one word related to this topic.
        </div>
      </div>
      <button class="btn btn-secondary" id="btnHideAndContinue">Hide & Next Player</button>
    </div>

    <!-- SCREEN 4: DISCUSSION PHASE -->
    <div id="screenDiscussion" class="screen-card">
      <div class="flex-row">
        <h2 class="card-title">🗣️ Discussion</h2>
        <button class="btn btn-secondary" id="btnReshuffleTurnOrder" style="padding: 0.4rem 0.75rem; font-size: 0.9rem; min-height: 40px; width: auto;">Shuffle</button>
      </div>
      <div class="card-subtitle">Going in order below, say OUT LOUD exactly ONE word or phrase related to the secret!</div>

      <div class="turn-order-list" id="turnOrderList"></div>

      <!-- Optional Timer -->
      <div class="info-box">
        <div class="section-label">Discussion Timer</div>
        <div class="timer-display" id="timerDisplay">01:00</div>
        <div style="display: flex; gap: 0.75rem; justify-content: center; margin-top: 0.5rem;">
          <button class="btn btn-secondary" id="btnStartTimer" style="min-height: 48px; font-size: 1rem;">▶️ Start</button>
          <button class="btn btn-secondary" id="btnResetTimer" style="min-height: 48px; font-size: 1rem;">🔄 Reset</button>
        </div>
      </div>

      <button class="btn btn-warning" id="btnBeginVoting">Begin Voting</button>
    </div>

    <!-- SCREEN 5: VOTING -->
    <div id="screenVoting" class="screen-card">
      <h2 class="card-title" id="votingTitle">🔎 Who is Camo Dude?</h2>
      <div class="card-subtitle" id="votingSubtitle">Discuss and tap the player you suspect!</div>

      <div class="grid-2" id="votingGrid"></div>

      <button class="btn btn-danger" id="btnConfirmVote" disabled>⚖️ Confirm Accusation</button>
    </div>

    <!-- SCREEN 6: CAMO DUDE GUESS -->
    <div id="screenImposterGuess" class="screen-card">
      <h2 class="card-title" id="imposterGuessTitle">🥸 Caught, ya dingus!</h2>
      <div class="card-subtitle">
        <strong id="accusedImposterName">Alex</strong> was caught! Speak your blind guess OUT LOUD to the group!
      </div>

      <div class="section-label" style="text-align: center;" id="imposterCategoryHeader">Category: Animals</div>

      <div id="imposterGuessStep1" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div class="info-box" id="imposterGuessTip">
          🔊 Camo Dude: Last chance to guess the secret.
        </div>
        <button class="btn btn-primary" id="btnRevealWordForCheck">Reveal Secret Word</button>
      </div>

      <div id="imposterGuessStep2" style="display: none; flex-direction: column; gap: 1.5rem;">
        <div class="info-box" style="background: var(--bg-card);">
          <div class="section-label">The Actual Secret Word Was:</div>
          <div class="secret-word-display" id="secretWordCheckDisplay" style="background: var(--accent-yellow);">ELEPHANT</div>
        </div>
        <div style="font-size: 1.15rem; font-weight: 900; text-align: center;">
          Did <span id="accusedImposterName2">Alex</span> guess it correctly?
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-success" id="btnGuessCorrect">Yes</button>
          <button class="btn btn-danger" id="btnGuessWrong">No</button>
        </div>
      </div>
    </div>

    <!-- SCREEN 7: RESOLUTION -->
    <div id="screenResolution" class="screen-card">
      <div class="result-banner" id="resultBanner">INSIDERS WIN! 🎉</div>
      <div id="resolutionDetailsContainer" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
      
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
        <button class="btn btn-primary" id="btnPlayAgainSame">Play Again (Same Players)</button>
        <button class="btn btn-secondary" id="btnNewGame">Main Menu</button>
      </div>
    </div>

  </main>

  <script>
    // --- 1. GAME DATA STRUCTURE ---
    // Fallback data in case categories.js is missing or empty
    const FALLBACK_CATEGORIES = [
      { 
        id: 'animals', name: 'Animals', icon: '🦁', 
        words: [
          { secret: 'Elephant', hint: 'Has a trunk' }, 
          { secret: 'Lion', hint: 'King of jungle' },
          { secret: 'Penguin', hint: 'Tuxedo bird' }
        ] 
      },
      { 
        id: 'food', name: 'Food', icon: '🍔', 
        words: [
          { secret: 'Pizza', hint: 'Italian slices' }, 
          { secret: 'Sushi', hint: 'Raw fish' },
          { secret: 'Taco', hint: 'Shell and meat' }
        ] 
      }
    ];
    const getCategories = () => (window.CATEGORIES && window.CATEGORIES.length > 0) ? window.CATEGORIES : FALLBACK_CATEGORIES;

    const AVATARS = ["🦊", "🐼", "🐯", "🦁", "🦄", "🐨", "🐸", "🦉"];

    // --- 2. GAME STATE MANAGEMENT ---
    let state = {
      playerCount: 4,
      playerNames: ["Player 1", "Player 2", "Player 3", "Player 4"],
      gameMode: "hint", // "hint" | "no_hint" | "decoy" | "double_trouble"
      randomizeTurnOrder: true,
      turnOrder: [0, 1, 2, 3],
      selectedCategoryId: "random",
      currentCategory: null,
      secretWordObj: null,
      decoyWordObj: null,
      imposterIndex: -1, 
      dunceIndex: -1,    
      caughtRole: null,  
      currentTurnIndex: 0,
      votedPlayerIndex: -1,
      timerSeconds: 60,
      timerInterval: null,
      soundEnabled: true
    };

    // --- 3. WEB AUDIO SYNTHESIZER ---
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx && AudioContextClass) audioCtx = new AudioContextClass();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }

    function playSound(type) {
      if (!state.soundEnabled) return;
      try {
        initAudio();
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        if (type === 'click') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
        } else if (type === 'reveal') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === 'win') {
          const notes = [440, 554.37, 659.25, 880];
          notes.forEach((freq, idx) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.type = 'sine';
            o.frequency.setValueAtTime(freq, now + idx * 0.1);
            g.gain.setValueAtTime(0.2, now + idx * 0.1);
            g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.25);
            o.connect(g);
            g.connect(audioCtx.destination);
            o.start(now + idx * 0.1);
            o.stop(now + idx * 0.1 + 0.25);
          });
        } else if (type === 'loss') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        } else if (type === 'tick') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.03);
        }
      } catch (e) {
        console.log("Audio playback error:", e);
      }
    }

    // --- 4. DOM ELEMENTS & NAVIGATION ---
    const screens = {
      setup: document.getElementById('screenSetup'),
      shield: document.getElementById('screenShield'),
      reveal: document.getElementById('screenReveal'),
      discussion: document.getElementById('screenDiscussion'),
      voting: document.getElementById('screenVoting'),
      imposterGuess: document.getElementById('screenImposterGuess'),
      resolution: document.getElementById('screenResolution')
    };

    function showScreen(screenKey) {
      Object.keys(screens).forEach(key => {
        if (key === screenKey) {
          screens[key].classList.add('active');
        } else {
          screens[key].classList.remove('active');
        }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- 5. SETUP & RENDER FUNCTIONS ---
    function initUI() {
      renderPlayerInputs();
      renderModeGrid();
      renderCategoryGrid();
      attachEventListeners();
    }

    function renderModeGrid() {
      const cards = document.querySelectorAll('#modeGrid .selectable-card');
      cards.forEach(card => {
        const mode = card.getAttribute('data-mode');
        card.classList.toggle('selected', mode === state.gameMode);
        
        card.onclick = () => {
          playSound('click');
          state.gameMode = mode;
          if (state.gameMode === 'double_trouble' && state.playerCount < 4) {
            state.playerCount = 4;
            while(state.playerNames.length < 4) state.playerNames.push(`Player ${state.playerNames.length + 1}`);
            renderPlayerInputs();
          }
          renderModeGrid();
        };
      });
    }

    function renderPlayerInputs() {
      const container = document.getElementById('playerInputsContainer');
      container.innerHTML = '';

      for (let i = 0; i < state.playerCount; i++) {
        const avatar = AVATARS[i % AVATARS.length];
        const defaultName = state.playerNames[i] || `Player ${i + 1}`;

        const group = document.createElement('div');
        group.className = 'input-group';
        group.innerHTML = `
          <span class="input-avatar">${avatar}</span>
          <input type="text" class="input-field" data-index="${i}" value="${defaultName}" placeholder="Player ${i + 1} Name">
        `;

        const input = group.querySelector('input');
        input.addEventListener('change', (e) => {
          state.playerNames[i] = e.target.value.trim() || `Player ${i + 1}`;
        });

        container.appendChild(group);
      }
      
      document.getElementById('playerCountVal').textContent = state.playerCount;
      const minPlayers = (state.gameMode === 'double_trouble') ? 4 : 3;
      document.getElementById('btnMinusPlayers').disabled = state.playerCount <= minPlayers;
      document.getElementById('btnPlusPlayers').disabled = state.playerCount >= 8;
    }

    function renderCategoryGrid() {
      const grid = document.getElementById('categoryGrid');
      
      // If the grid elements are already built, just update the CSS classes
      // This prevents the scroll position from jumping when the user taps a card!
      if (grid.children.length > 0) {
        Array.from(grid.children).forEach(card => {
          card.classList.toggle('selected', card.dataset.id === state.selectedCategoryId);
        });
        return;
      }
      
      grid.innerHTML = '';
      const cats = getCategories();

      // Factory helper to build the cards cleanly
      const createCard = (id, icon, name) => {
        const card = document.createElement('div');
        card.dataset.id = id;
        card.className = `selectable-card category-card ${state.selectedCategoryId === id ? 'selected' : ''}`;
        card.innerHTML = `<span class="category-icon">${icon}</span><span class="category-name">${name}</span>`;
        card.addEventListener('click', () => {
          playSound('click');
          state.selectedCategoryId = id;
          // Apply selection visuals inline instantly
          Array.from(grid.children).forEach(c => {
             c.classList.toggle('selected', c.dataset.id === id);
          });
        });
        return card;
      };

      grid.appendChild(createCard('random', '🎲', 'Random'));
      cats.forEach(cat => grid.appendChild(createCard(cat.id, cat.icon, cat.name)));
    }

    // --- 6. GAME LOOP LOGIC ---
    function startGame() {
      playSound('click');
      const cats = getCategories();

      // Ensure names array covers player count
      for (let i = 0; i < state.playerCount; i++) {
        const inputField = document.querySelector(`.input-field[data-index="${i}"]`);
        state.playerNames[i] = inputField ? (inputField.value.trim() || `Player ${i + 1}`) : `Player ${i + 1}`;
      }

      // Assign Category & Words
      if (state.selectedCategoryId === 'random') {
        state.currentCategory = cats[Math.floor(Math.random() * cats.length)];
      } else {
        state.currentCategory = cats.find(c => c.id === state.selectedCategoryId) || cats[0];
      }

      const wordIdx = Math.floor(Math.random() * state.currentCategory.words.length);
      state.secretWordObj = state.currentCategory.words[wordIdx];
      state.caughtRole = null;

      // Assign Roles
      if (state.gameMode === 'double_trouble') {
        state.imposterIndex = Math.floor(Math.random() * state.playerCount);
        do { state.dunceIndex = Math.floor(Math.random() * state.playerCount); } 
        while (state.dunceIndex === state.imposterIndex);
        
        const otherWords = state.currentCategory.words.filter(w => w.secret !== state.secretWordObj.secret);
        state.decoyWordObj = otherWords[Math.floor(Math.random() * otherWords.length)];
      } else if (state.gameMode === 'decoy') {
        state.imposterIndex = Math.floor(Math.random() * state.playerCount);
        state.dunceIndex = -1;
        const otherWords = state.currentCategory.words.filter(w => w.secret !== state.secretWordObj.secret);
        state.decoyWordObj = otherWords[Math.floor(Math.random() * otherWords.length)];
      } else {
        state.imposterIndex = Math.floor(Math.random() * state.playerCount);
        state.dunceIndex = -1;
        state.decoyWordObj = null;
      }

      // Set Order
      let order = Array.from({ length: state.playerCount }, (_, i) => i);
      if (state.randomizeTurnOrder) {
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
      }
      state.turnOrder = order;
      state.currentTurnIndex = 0;

      resetTimer();
      setupTurnShield();
    }

    function setupTurnShield() {
      const pIdx = state.turnOrder[state.currentTurnIndex];
      document.getElementById('shieldPlayerName').textContent = state.playerNames[pIdx];
      showScreen('shield');
    }

    function revealSecretRole() {
      playSound('reveal');
      const pIdx = state.turnOrder[state.currentTurnIndex];
      const isImposter = (pIdx === state.imposterIndex);
      const isDunce = (state.gameMode === 'double_trouble' && pIdx === state.dunceIndex);

      const secretBox = document.getElementById('secretBox');
      const roleBadge = document.getElementById('roleBadge');
      const wordDisplay = document.getElementById('secretWordDisplay');
      const tipBox = document.getElementById('revealTipBox');
      
      document.getElementById('revealCategoryLabel').textContent = `Category: ${state.currentCategory.name}`;

      if (state.gameMode === 'double_trouble') {
        if (isImposter) {
          secretBox.className = 'secret-box imposter';
          roleBadge.textContent = 'CAMO DUDE 🥸';
          wordDisplay.textContent = '❓ NO HINT';
          tipBox.textContent = "There is also a DUNCE with a fake word. Listen to clues to deduce the secret!";
        } else if (isDunce) {
          secretBox.className = 'secret-box insider';
          roleBadge.textContent = 'INSIDER 🤫';
          wordDisplay.textContent = state.decoyWordObj.secret;
          tipBox.textContent = `Say ONE word related to "${state.decoyWordObj.secret}".`;
        } else {
          secretBox.className = 'secret-box insider';
          roleBadge.textContent = 'INSIDER 🤫';
          wordDisplay.textContent = state.secretWordObj.secret;
          tipBox.textContent = `Say ONE word related to "${state.secretWordObj.secret}".`;
        }
      } else if (isImposter) {
        if (state.gameMode === 'decoy') {
          secretBox.className = 'secret-box insider';
          roleBadge.textContent = 'INSIDER 🤫';
          wordDisplay.textContent = state.decoyWordObj.secret;
          tipBox.textContent = `Say ONE word related to "${state.decoyWordObj.secret}".`;
        } else if (state.gameMode === 'no_hint') {
          secretBox.className = 'secret-box imposter';
          roleBadge.textContent = 'CAMO DUDE (OR DUDETTE) 🥸';
          wordDisplay.textContent = '❓ NO HINT';
          tipBox.textContent = "Listen closely to everyone's clues during discussion to deduce the secret word and blend in!";
        } else {
          secretBox.className = 'secret-box imposter';
          roleBadge.textContent = 'CAMO DUDE (OR DUDETTE) 🥸';
          wordDisplay.textContent = `Hint: "${state.secretWordObj.hint}"`;
          tipBox.textContent = "Don't be a dingus. Blend in!";
        }
      } else {
        secretBox.className = 'secret-box insider';
        roleBadge.textContent = 'INSIDER 🤫';
        wordDisplay.textContent = state.secretWordObj.secret;
        tipBox.textContent = `Say ONE word related to "${state.secretWordObj.secret}".`;
      }
      showScreen('reveal');
    }

    function advancePassAndPlay() {
      playSound('click');
      state.currentTurnIndex++;
      if (state.currentTurnIndex < state.playerCount) {
        setupTurnShield();
      } else {
        startDiscussionPhase();
      }
    }

    function startDiscussionPhase() {
      showScreen('discussion');
      renderTurnOrderList();
    }

    function renderTurnOrderList() {
      const turnList = document.getElementById('turnOrderList');
      turnList.innerHTML = '';
      state.turnOrder.forEach((pIdx, pos) => {
        const item = document.createElement('div');
        item.className = 'turn-item';
        item.innerHTML = `
          <span class="turn-num">${pos + 1}</span>
          <span style="font-size:
