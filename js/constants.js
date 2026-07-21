// ============= Knowledge Base (Firestore-backed) =============
const CATEGORY_LABELS = {
  skills: 'Skill',
  commands: 'Command',
  agents: 'AI Agent',
  mcps: 'MCP',
  plugins: 'Plugin',
  discoveries: 'Discovery',
  'other-tools': 'Other AI Tool',
  'shortcut-desktop': 'Claude Desktop',
  'shortcut-code': 'Claude Code',
  'shortcut-slash': 'Slash Command',
  'chatgpt-shortcut-desktop': 'ChatGPT Desktop',
  'chatgpt-shortcut-code': 'ChatGPT Code',
  'chatgpt-shortcut-slash': 'Slash Command',
  // legacy labels kept so older entries still display a clean tag
  prompting: 'Prompting Technique',
  resources: 'Resource'
};

const CATEGORY_PLURAL_LABELS = {
  skills: 'Skills',
  commands: 'Commands',
  agents: 'AI Agents',
  mcps: 'MCPs',
  plugins: 'Plugins',
  discoveries: 'Discoveries',
  'other-tools': 'Other AI Tools',
  'shortcut-desktop': 'Claude Shortcuts',
  'shortcut-code': 'Claude Shortcuts',
  'shortcut-slash': 'Claude Shortcuts',
  'chatgpt-shortcut-desktop': 'ChatGPT Shortcuts',
  'chatgpt-shortcut-code': 'ChatGPT Shortcuts',
  'chatgpt-shortcut-slash': 'ChatGPT Shortcuts'
};

const CATEGORY_ICON_PATHS = {
  skills: '<path d="M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1z"/>',
  commands: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
  agents: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/>',
  mcps: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>',
  plugins: '<path d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.7 2.7 0 0 1 0 5.4H2V20a2 2 0 0 0 2 2h3.8v-1.5a2.7 2.7 0 0 1 5.4 0V22H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z"/>',
  discoveries: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  'other-tools': '<path d="M12 3l2.1 4.9L19 10l-4.9 2.1L12 17l-2.1-4.9L5 10l4.9-2.1z"/><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z"/>'
};
function cardPlaceholderHtml(category){
  const path = CATEGORY_ICON_PATHS[category];
  if(!path) return '';
  return `<div class="card-placeholder"><svg viewBox="0 0 24 24">${path}</svg></div>`;
}

// Categories that use the full detail template (Purpose, Best For, Sample Prompts, etc.)
const RICH_CATEGORIES = ['skills', 'commands', 'agents', 'mcps', 'plugins'];
function isRichCategory(cat){ return RICH_CATEGORIES.includes(cat); }

const CLAUDE_SHORTCUT_CATS = ['shortcut-desktop', 'shortcut-code', 'shortcut-slash'];
const CHATGPT_SHORTCUT_CATS = ['chatgpt-shortcut-desktop', 'chatgpt-shortcut-code', 'chatgpt-shortcut-slash'];
const SHORTCUT_CATEGORIES = [...CLAUDE_SHORTCUT_CATS, ...CHATGPT_SHORTCUT_CATS];
function isShortcutCategory(cat){ return SHORTCUT_CATEGORIES.includes(cat); }
function shortcutBadgeHtml(key){
  if(!key) return '';
  return `<div class="card-placeholder"><span class="shortcut-key-text">${escapeHtml(key)}</span></div>`;
}
