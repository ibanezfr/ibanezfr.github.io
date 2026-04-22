import { visit } from 'unist-util-visit';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function nodeToHtml(node) {
  if (!node) return '';
  switch (node.type) {
    case 'text':       return esc(node.value);
    case 'inlineCode': return `<code>${esc(node.value)}</code>`;
    case 'strong':     return `<b>${(node.children || []).map(nodeToHtml).join('')}</b>`;
    case 'em':         return `<em>${(node.children || []).map(nodeToHtml).join('')}</em>`;
    case 'link':       return `<a href="${esc(node.url)}">${(node.children || []).map(nodeToHtml).join('')}</a>`;
    default:           return (node.children || []).map(nodeToHtml).join('');
  }
}

function renderKeyCell(cellNode) {
  // children: inlineCode nodes (key combos) and text nodes (e.g. " / " separators)
  let html = '<span class="ap-kbdseq">';
  for (const child of (cellNode.children || [])) {
    if (child.type === 'inlineCode') {
      // split " + " → individual keys; space-only parts → adjacent keycaps
      const parts = child.value.split(' + ').map(k => k.trim()).filter(Boolean);
      parts.forEach((part, j) => {
        if (j > 0) html += '<span class="ap-kbd-plus">+</span>';
        // part may have spaces (e.g. "Tab Tab") → adjacent keycaps without "+"
        const subkeys = part.split(' ').filter(Boolean);
        subkeys.forEach((key, si) => {
          if (si > 0) html += '<span class="ap-kbd-gap"></span>';
          html += `<kbd class="ap-kbd">${esc(key)}</kbd>`;
        });
      });
    } else if (child.type === 'text' && child.value.includes('/')) {
      html += '<span class="ap-kbd-or">/</span>';
    }
  }
  html += '</span>';
  return html;
}

export function remarkShortcutTable() {
  return (tree) => {
    visit(tree, 'table', (node, index, parent) => {
      if (!parent || index == null) return;

      const header = node.children[0];
      if (!header || header.type !== 'tableRow') return;

      const firstCellText = (header.children[0]?.children || [])
        .filter(n => n.type === 'text')
        .map(n => n.value)
        .join('')
        .toLowerCase()
        .trim();

      if (!/^(atajo|shortcut)/.test(firstCellText)) return;

      let html = '<div class="ap-stable">';
      for (const row of node.children.slice(1)) {
        if (row.type !== 'tableRow' || row.children.length < 2) continue;
        const keysHtml = renderKeyCell(row.children[0]);
        const descHtml = (row.children[1].children || []).map(nodeToHtml).join('');
        html += `<div class="ap-stable-row">`;
        html += `<div class="ap-stable-keys">${keysHtml}</div>`;
        html += `<div class="ap-stable-desc">${descHtml}</div>`;
        html += `</div>`;
      }
      html += '</div>';

      parent.children[index] = { type: 'html', value: html };
    });
  };
}
