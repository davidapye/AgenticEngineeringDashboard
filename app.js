// Mock card data
const mockCards = {
  backlog: [
    { id: 'US-891204', badge: 'US', title: 'Add dark mode toggle to user preferences panel', status: 'Queued', statusType: 'queued' },
    { id: 'ISSUE-204817', badge: 'Issue', title: 'Fix pagination offset error in search results API', status: 'Queued', statusType: 'queued', isIssue: true },
    { id: 'US-891299', badge: 'US', title: 'Implement OAuth2 PKCE flow for mobile clients', status: 'Queued', statusType: 'queued' },
  ],
  inProgress: [
    { id: 'US-741927', badge: 'US', title: 'Centralize session connection management', status: 'Modifying files...', statusType: 'inprogress', isSpinner: true },
    { id: 'ISSUE-136529', badge: 'Issue', title: 'Support Electron v38 runtime compatibility', status: 'Creating pull request...', statusType: 'inprogress', isSpinner: true, isIssue: true },
  ],
  review: [
    { id: 'US-740188', badge: 'US', title: 'Migrate legacy API endpoints to v3 schema', status: 'Draft PR created', statusType: 'review', reviewed: true },
    { id: 'BUG-980744', badge: 'Bug', title: 'Memory leak in WebSocket reconnection handler', status: 'Draft PR created', statusType: 'review', reviewed: true, isBug: true },
  ]
}

// Flatten all cards for lookup
const allCardsMap = {}
Object.values(mockCards).forEach(column => {
  column.forEach(card => {
    allCardsMap[card.id] = card
  })
})

// Router state
let currentPage = 'dashboard'
let currentCardId = null

// Simple router
function navigate(page, cardId = null) {
  currentPage = page
  currentCardId = cardId
  render()
  window.scrollTo(0, 0)
}

// Render functions
function renderTitleBar() {
  return `
    <div class="titlebar">
      <span class="hamburger">☰</span>
      <span class="back-btn" onclick="handleBackClick()">←</span>
      <div class="icon"></div>
      <span class="title">Hercules</span>
    </div>
  `
}

function renderNavigation() {
  const dashboardActive = currentPage === 'dashboard' ? 'active' : ''
  const settingsActive = currentPage === 'settings' ? 'active' : ''
  
  return `
    <div class="nav-pane">
      <div>
        <div class="nav-item ${dashboardActive}" onclick="navigate('dashboard')">
          <span class="icon">📊</span> Dashboard
        </div>
      </div>
      <div>
        <div class="nav-item ${settingsActive}" onclick="navigate('settings')">
          <span class="icon">⚙️</span> Settings
        </div>
      </div>
    </div>
  `
}

function renderCard(card) {
  const badgeClass = card.isIssue ? 'issue' : card.isBug ? 'bug' : ''
  const reviewed = card.reviewed ? `<span style="color: #10b981; font-size: 14px;">✓</span>` : ''
  const spinner = card.isSpinner ? '<div class="spinner"></div>' : ''
  const statusClass = card.reviewed ? 'review-status' : ''
  
  return `
    <div class="card" onclick="navigate('detail', '${card.id}')">
      <div class="card-badges">
        <span class="badge ${badgeClass}">${card.id}</span>
        <span class="badge ${badgeClass}">${card.badge}</span>
        ${reviewed}
      </div>
      <div class="card-title">${card.title}</div>
      <div class="card-status ${statusClass}">
        ${spinner}
        ${card.status}
      </div>
    </div>
  `
}

function renderColumn(title, accent, cards) {
  const cardsHtml = cards.map(card => renderCard(card)).join('')
  
  return `
    <div class="column">
      <div class="column-header">
        <div class="column-accent ${accent}"></div>
        <span class="column-title">${title}</span>
        <span class="count-badge">${cards.length}</span>
      </div>
      <div class="cards-container">
        ${cardsHtml}
      </div>
    </div>
  `
}

function renderDashboard() {
  return `
    <div class="main-content">
      <div class="header">
        <div class="header-left">
          <div class="hercules-logo">H</div>
          <span class="header-title">Hercules</span>
        </div>
        <div class="header-actions">
          <button class="btn">🔄 Refresh</button>
          <button class="btn toggle-btn">Auto-Poll</button>
        </div>
      </div>

      <div class="kanban-board">
        ${renderColumn('Backlog', 'backlog', mockCards.backlog)}
        ${renderColumn('In Progress', 'inprogress', mockCards.inProgress)}
        ${renderColumn('Review', 'review', mockCards.review)}
      </div>

      <div class="status-bar">
        <span class="status-message">US-741927 — Modifying files in constellation-ui</span>
        <div class="status-counts">
          <div class="status-count"><div class="status-dot backlog"></div> 3</div>
          <div class="status-count"><div class="status-dot inprogress"></div> 2</div>
          <div class="status-count"><div class="status-dot review"></div> 2</div>
        </div>
      </div>
    </div>
  `
}

function renderSettings() {
  return `
    <div class="main-content settings">
      <div class="page-title">Settings</div>
      <div class="settings-stack">

        <!-- Agile Studio Configuration -->
        <div class="card">
          <div class="section-title">Agile Studio</div>
          <div class="field">
            <label>Team ID</label>
            <input type="text" value="PROJ-2342" />
          </div>
          <div class="field">
            <label>Your Name</label>
            <input type="text" value="John Smith" />
          </div>
          <div class="field">
            <label>Workspace Directory</label>
            <input type="text" value="C:\\Source" />
          </div>
        </div>

        <!-- Repository Configuration -->
        <div class="card">
          <div class="section-header">
            <div class="section-title" style="margin-bottom: 0;">Repositories</div>
            <button class="add-btn">+ Add Repo</button>
          </div>
          <div class="hint">
            Configure the GitHub repositories the agents can work with.
          </div>

          <div class="repo-row">
            <div class="row-grid">
              <div class="field" style="margin-bottom: 0;">
                <label>Repository (owner/repo)</label>
                <input type="text" value="hercules/constellation-ui" />
              </div>
              <div class="field" style="margin-bottom: 0;">
                <label>Local Path</label>
                <input type="text" value="C:\\Source\\constellation-ui" />
              </div>
              <button class="remove-btn">🗑</button>
            </div>
            <div class="desc-row">
              <div class="field" style="margin-bottom: 0;">
                <label>Description (helps agent choose repo)</label>
                <input type="text" value="Main frontend React application" />
              </div>
            </div>
          </div>

          <div class="repo-row">
            <div class="row-grid">
              <div class="field" style="margin-bottom: 0;">
                <label>Repository (owner/repo)</label>
                <input type="text" value="hercules/dx-api" />
              </div>
              <div class="field" style="margin-bottom: 0;">
                <label>Local Path</label>
                <input type="text" value="C:\\Source\\dx-api" />
              </div>
              <button class="remove-btn">🗑</button>
            </div>
            <div class="desc-row">
              <div class="field" style="margin-bottom: 0;">
                <label>Description (helps agent choose repo)</label>
                <input type="text" value="DX API backend services (Java/Spring)" />
              </div>
            </div>
          </div>
        </div>

        <!-- Polling Configuration -->
        <div class="card">
          <div class="section-title">Polling</div>
          <div class="field">
            <label>Check for new items every</label>
            <select>
              <option>1 minutes</option>
              <option selected>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
        </div>

        <!-- Agent Configuration -->
        <div class="card">
          <div class="section-title">Agent</div>
          <div class="field">
            <label>AI Model</label>
            <select>
              <option selected>claude-sonnet-4.5</option>
              <option>gpt-5</option>
              <option>claude-opus-4.5</option>
            </select>
          </div>
        </div>

        <!-- GitHub Authentication -->
        <div class="card">
          <div class="section-title">GitHub Authentication</div>
          <div class="auth-status">
            <div class="auth-dot connected"></div>
            <span class="auth-text connected-text">Connected</span>
          </div>
          <div class="auth-msg">Authenticated as jsmith-hercules</div>
          <div class="btn-row">
            <button class="btn btn-secondary">Logout</button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="save-row">
          <button class="btn btn-primary">Save Settings</button>
          <span class="save-status">✓ Settings saved successfully</span>
        </div>

      </div>
    </div>
  `
}

function renderDetail() {
  const card = allCardsMap[currentCardId] || {
    id: 'US-741927',
    title: 'Centralize session connection management',
    status: 'InProgress',
    description: 'Refactor the session connection logic to use a centralized connection manager instead of per-component WebSocket instances.',
    branch: 'hercules/constellation-ui: US-741927_CentralizeSessionConnection_CI_'
  }

  const statusColor = card.statusType === 'inprogress' ? '#f59e0b' : card.statusType === 'review' ? '#10b981' : '#6b7280'
  
  return `
    <div class="main-content detail">
      <div class="overlay">
        <div class="dialog">
          <div class="dialog-title">
            <span class="id">${card.id}</span> — ${card.title}
          </div>

          <div class="detail-row">
            <div class="detail-label">Status</div>
            <div class="detail-value" style="color: ${statusColor}; font-weight: 600;">
              ${card.statusType.charAt(0).toUpperCase() + card.statusType.slice(1)}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-label">Description</div>
            <div class="detail-value subtle">
              ${card.description}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-label">Branch</div>
            <div class="branch-info">
              ${card.branch}
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-label">Agent Timeline</div>
            <div class="timeline">
              <div class="timeline-entry">
                <span class="time">14:32:01</span>
                <span class="msg">Analyzing work item...</span>
              </div>
              <div class="timeline-entry">
                <span class="time">14:32:08</span>
                <span class="msg">Reading codebase...</span>
              </div>
              <div class="timeline-entry">
                <span class="time">14:32:22</span>
                <span class="msg">Searching codebase...</span>
              </div>
              <div class="timeline-entry">
                <span class="time">14:32:35</span>
                <span class="msg">Running commands...</span>
              </div>
              <div class="timeline-entry">
                <span class="time">14:32:41</span>
                <span class="msg">Working with Git...</span>
              </div>
              <div class="timeline-entry">
                <span class="time">14:33:12</span>
                <span class="msg active">⟳ Modifying files...</span>
              </div>
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-label">Add notes to help the agent</div>
            <textarea class="notes-input" placeholder="Add notes to help the agent..."></textarea>
          </div>

          <div class="action-row">
            <button class="btn btn-primary">Send Notes</button>
            <button class="btn">Pause</button>
            <button class="btn btn-warn">Cancel</button>
          </div>

          <div class="close-row">
            <button class="btn btn-close" onclick="handleBackClick()">Close</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function handleBackClick() {
  if (currentPage === 'detail') {
    navigate('dashboard')
  }
}

function render() {
  const app = document.getElementById('app')
  
  let pageContent = ''
  
  if (currentPage === 'dashboard') {
    pageContent = renderDashboard()
  } else if (currentPage === 'settings') {
    pageContent = renderSettings()
  } else if (currentPage === 'detail') {
    pageContent = renderDetail()
  }
  
  app.innerHTML = `
    <div class="app-container">
      ${renderTitleBar()}
      <div class="app-layout">
        ${renderNavigation()}
        ${pageContent}
      </div>
    </div>
  `
}

// Initial render
render()
