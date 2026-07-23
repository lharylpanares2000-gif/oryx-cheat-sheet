function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str == null ? '' : String(str);
  return d.innerHTML;
}
function isValidLink(url){
  try{ const u = new URL(url); return u.protocol === 'http:' || u.protocol === 'https:'; }catch(e){ return false; }
}

function panelSweepSvg(){
  return `<svg class="panel-sweep" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M240 6 C170 6 120 40 85 150" stroke="white" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M240 20 C177 20 132 52 105 150" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
  </svg>`;
}
function detailBlock(label, value, valueClass){
  return `<div class="detail-block"><div class="detail-label">${escapeHtml(label)}</div><div class="${valueClass || 'detail-value'}">${escapeHtml(value)}</div></div>`;
}
function detailBlockHtml(label, valueHtml, valueClass){
  return `<div class="detail-block"><div class="detail-label">${escapeHtml(label)}</div><div class="${valueClass || 'detail-value'}">${valueHtml}</div></div>`;
}

function closeDetail(){
  document.getElementById('skillPage').classList.remove('open');
}

function optionalBlock(label, value, valueClass){
  if(value === undefined || value === null || !String(value).trim()) return '';
  return detailBlock(label, value, valueClass);
}

function faviconUrlForLink(link){
  try{ return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(link).hostname)}&sz=64`; }
  catch(e){ return null; }
}

function platformMeta(platform){
  const map = {
    claude:  { label: 'Claude',        color: '#F5A623' },
    chatgpt: { label: 'ChatGPT',       color: '#34D399' },
    other:   { label: 'Other AI Tool', color: '#A78BFA' }
  };
  return map[platform] || map.claude;
}

const DOWNLOAD_HELP_TEXT = 'Click the "Download Skill (.md)" button at the bottom of this page. The file saves to your device as a Markdown (.md) file you can open, edit, or share with the team.';
const USE_LINK_HELP_TEXT = 'Open the link above to visit this tool.';
const INSTALL_HELP_TEXT = 'Open Claude (claude.ai or the desktop app) and start a new chat, or open your team Project. Paste the sample prompt above to run it. To reuse it as a saved skill, upload the downloaded .md file into your Claude Project knowledge, or paste its contents into the conversation.';

function slugify(str){
  return (str || 'skill').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'skill';
}

function buildSkillMarkdown(entry){
  const pm = platformMeta(entry.platform);
  const catLabel = CATEGORY_LABELS[entry.category] || entry.category;
  const dateStr = new Date(entry.createdAt).toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'});
  const lines = [];
  lines.push(`# ${entry.title || 'Untitled'}`, '');
  lines.push(`- **AI platform:** ${pm.label}`);
  lines.push(`- **Category:** ${catLabel}`);
  if(entry.department) lines.push(`- **Department:** ${entry.department}`);
  lines.push(`- **Added by:** ${entry.author || 'Anonymous'}`);
  lines.push(`- **Date added:** ${dateStr}`, '');

  const section = (title, val) => {
    if(val && String(val).trim()){ lines.push(`## ${title}`, '', String(val).trim(), ''); }
  };

  if(isRichCategory(entry.category)){
    section('Purpose', entry.purpose || entry.body);
    section('Best For', entry.bestFor);
    section('Sample Prompts', entry.samplePrompt);
    section('Example Output', entry.exampleOutput);
    section('Notes', entry.notes);
    section('How to Install and Use It in Claude', entry.howToAccess);
    section('How This Helps Oryx Doors & Windows', entry.oryxTip);
  } else if(isShortcutCategory(entry.category)){
    section('Shortcut / Command', entry.shortcutKey);
    section('Purpose', entry.purpose);
    section('How to Use It', entry.howToUse);
    section('Example', entry.example);
    section('Notes', entry.notes);
  } else {
    section('Details', entry.body);
  }
  section('Link', entry.link);
  return lines.join('\n');
}

function downloadSkillMd(entry){
  const md = buildSkillMarkdown(entry);
  const blob = new Blob([md], {type:'text/markdown;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = slugify(entry.title) + '.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
