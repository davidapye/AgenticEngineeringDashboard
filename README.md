# Hercules — Agentic Engineering Dashboard

A beautiful, fully interactive single-page application (SPA) dashboard mockup showcasing an agentic engineering workflow management system. Built with vanilla JavaScript, HTML, and CSS for maximum portability. This dashboard would utilize the GitHub Copilot SDK and MCP server integration. Polling the MCP server for User stories or issues assigned to the User and then working on them in parellel. 

## 🎯 Features

- **Dashboard View**: Kanban-style board with three columns (Backlog, In Progress, Review)
- **Settings View**: Comprehensive configuration interface for workspace, repositories, polling, and agent settings
- **Detail View**: Modal dialog with detailed information about selected items
- **Responsive Navigation**: Click-based routing between dashboard, settings, and detail pages
- **Interactive Cards**: Click any card to view its details
- **Fully Branded**: Updated from "PegaRun" to "Hercules" branding throughout

## 📁 Project Structure

```
hercules-dashboard/
├── index.html          # Main HTML entry point
├── app.js             # Application logic and routing (vanilla JS)
├── styles.css         # Complete styling and layout
├── package.json       # Project metadata
└── docs/              # Original mockup files (reference)
```

## 🚀 Getting Started

### Run Locally

```bash
# Navigate to project directory
cd hercules-dashboard

# Start a local server (Python)
python -m http.server 8000

# Or using npm (if available)
npm run serve
```

Then open `http://localhost:8000` in your browser.

### No Build Tools Required

This is a **zero-dependency** project. It uses:
- Vanilla JavaScript (no frameworks)
- Plain CSS (no preprocessors)
- Standard HTML5

## 🎨 Pages

### Dashboard (`/`)
The main landing page featuring:
- Kanban board with three columns
- Mock work items with various statuses
- Quick action buttons (Refresh, Auto-Poll)
- Status summary bar
- Click any card to view details

### Settings (`/settings`)
Configuration interface with:
- Agile Studio settings (Team ID, Name, Workspace)
- Repository configuration
- Polling preferences
- AI Model selection
- GitHub authentication status
- Save settings confirmation

### Detail Modal (`/detail/:id`)
Work item details showing:
- Item ID and title
- Current status
- Full description
- Git branch information
- Agent timeline (activity log)
- Notes input for agent communication
- Action buttons (Send, Pause, Cancel)

## 🔄 Navigation

- **Dashboard ↔ Settings**: Click navigation items in the left sidebar
- **Dashboard → Detail**: Click any card in the kanban board
- **Detail → Dashboard**: Click the "Close" button or back arrow
- **Back Button**: Always returns to the previous view

## 💡 Customization

To add your own data, modify the `mockCards` object in `app.js`:

```javascript
const mockCards = {
  backlog: [
    { 
      id: 'US-XXXXX', 
      badge: 'US', 
      title: 'Your custom title', 
      status: 'Queued' 
    },
    // Add more cards here
  ],
  // ...
}
```

## 📦 Integration with Portfolio

This project is designed to be easily embedded in a portfolio website:

1. Copy the `index.html`, `app.js`, and `styles.css` files
2. Serve from your web server
3. Link from your portfolio: `<iframe src="/hercules-dashboard/index.html"></iframe>`
4. Or integrate as a standalone section on your portfolio

## 🎯 Portfolio Highlights

- **Zero Dependencies**: Clean, maintainable vanilla JavaScript
- **No Build Process**: Works immediately in any browser
- **Responsive Design**: Works on desktop (optimized for display)
- **Performance**: Fast loading, minimal resource usage
- **Modern UI**: Professional design with smooth interactions

## 📝 Notes

- All "PegaRun" references have been replaced with "Hercules"
- Logo letter changed from "P" to "H"
- Repository names updated (e.g., `pegasystems/` → `hercules/`)
- Authentication examples updated to show "hercules" instead of "pega"

## 🔗 Related Files

- Original mockups: `docs/mockup-dashboard.html`, `docs/mockup-settings.html`, `docs/mockup-detail.html`
- Mockup screenshots in `docs/` folder

## 👨‍💻 Author

David Apye

---

*Hercules Dashboard is a portfolio project showcasing frontend development skills with a focus on clean code, responsive design, and user experience.*
