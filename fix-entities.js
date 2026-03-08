const fs = require('fs');
const path = require('path');

// Entity replacement map
const entityMap = {
  // Em dash and punctuation
  '&#x2014;': '—',
  '&#x2022;': '•',
  '&#xA9;': '©',
  '&#x2264;': '≤',
  '&#x2265;': '≥',
  
  // Comparison operators (but not &nbsp; which works correctly)
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  
  // Emoji - People & Communication
  '&#x1F465;': '👥',
  '&#x1F464;': '👤',
  '&#x1F4AC;': '💬',
  '&#x1F4AD;': '💭',
  '&#x1F5E3;': '🗣',
  '&#x1F5E8;': '🗨',
  
  // Emoji - Charts & Data
  '&#x1F4CA;': '📊',
  '&#x1F4C8;': '📈',
  '&#x1F4C9;': '📉',
  '&#x1F4CB;': '📋',
  '&#x1F4C4;': '📄',
  '&#x1F4C3;': '📃',
  '&#x1F4C5;': '📅',
  '&#x1F4C6;': '📆',
  '&#x1F4C7;': '📇',
  
  // Emoji - Office & Tools
  '&#x1F4DD;': '📝',
  '&#x1F4D3;': '📓',
  '&#x1F4D4;': '📔',
  '&#x1F4D5;': '📕',
  '&#x1F4D6;': '📖',
  '&#x1F4D7;': '📗',
  '&#x1F4D8;': '📘',
  '&#x1F4D9;': '📙',
  '&#x1F4DA;': '📚',
  '&#x1F4DC;': '📜',
  '&#x1F4CE;': '📎',
  '&#x1F4CF;': '📏',
  '&#x1F4D0;': '📐',
  '&#x1F4D1;': '📑',
  '&#x1F4D2;': '📒',
  
  // Emoji - Technology
  '&#x1F4BB;': '💻',
  '&#x1F4BC;': '💼',
  '&#x1F4BD;': '💽',
  '&#x1F4BE;': '💾',
  '&#x1F4BF;': '💿',
  '&#x1F5A5;': '🖥',
  '&#x1F5A8;': '🖨',
  '&#x2328;': '⌨',
  '&#x1F5B1;': '🖱',
  '&#x1F5B2;': '🖲',
  
  // Emoji - Communication devices
  '&#x1F4E6;': '📦',
  '&#x1F4E7;': '📧',
  '&#x1F4E8;': '📨',
  '&#x1F4E9;': '📩',
  '&#x1F4EA;': '📪',
  '&#x1F4EB;': '📫',
  '&#x1F4EC;': '📬',
  '&#x1F4ED;': '📭',
  '&#x1F4EE;': '📮',
  '&#x1F4EF;': '📯',
  '&#x1F4F1;': '📱',
  '&#x1F4F2;': '📲',
  '&#x1F4DE;': '📞',
  '&#x260E;': '☎',
  
  // Emoji - Symbols & Icons
  '&#x1F680;': '🚀',
  '&#x1F4A1;': '💡',
  '&#x26A0;': '⚠',
  '&#x2705;': '✅',
  '&#x274C;': '❌',
  '&#x2714;': '✔',
  '&#x2716;': '✖',
  '&#x1F6A8;': '🚨',
  '&#x1F4AF;': '💯',
  '&#x1F525;': '🔥',
  '&#x1F52E;': '🔮',
  '&#x1F3AF;': '🎯',
  '&#x1F4A5;': '💥',
  '&#x2B50;': '⭐',
  '&#x1F31F;': '🌟',
  '&#x1F4AB;': '💫',
  '&#x2728;': '✨',
  
  // Emoji - Time & Calendar
  '&#x23F0;': '⏰',
  '&#x23F1;': '⏱',
  '&#x23F2;': '⏲',
  '&#x231A;': '⌚',
  '&#x231B;': '⌛',
  '&#x23F3;': '⏳',
  
  // Emoji - Arrows & Directions
  '&#x27A1;': '➡',
  '&#x2B05;': '⬅',
  '&#x2B06;': '⬆',
  '&#x2B07;': '⬇',
  '&#x2197;': '↗',
  '&#x2198;': '↘',
  '&#x2199;': '↙',
  '&#x2196;': '↖',
  '&#x21A9;': '↩',
  '&#x21AA;': '↪',
  
  // Emoji - Checkmarks & Status
  '&#x2611;': '☑',
  '&#x2610;': '☐',
  '&#x1F7E2;': '🟢',
  '&#x1F7E1;': '🟡',
  '&#x1F534;': '🔴',
  '&#x1F7E0;': '🟠',
  
  // Emoji - Misc useful
  '&#x1F4B0;': '💰',
  '&#x1F4B5;': '💵',
  '&#x1F4B8;': '💸',
  '&#x1F4B9;': '💹',
  '&#x1F4C1;': '📁',
  '&#x1F4C2;': '📂',
  '&#x1F5C2;': '🗂',
  '&#x1F5C3;': '🗃',
  '&#x1F5C4;': '🗄',
  '&#x1F5D1;': '🗑',
  '&#x1F512;': '🔒',
  '&#x1F513;': '🔓',
  '&#x1F50D;': '🔍',
  '&#x1F50E;': '🔎',
  '&#x1F527;': '🔧',
  '&#x1F528;': '🔨',
  '&#x2699;': '⚙',
  '&#x1F4A3;': '💣',
  '&#x1F4A2;': '💢',
};

function replaceEntitiesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    for (const [entity, replacement] of Object.entries(entityMap)) {
      if (content.includes(entity)) {
        content = content.split(entity).join(replacement);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  let filesFixed = 0;
  
  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules, .next, .git
        if (!['node_modules', '.next', '.git', '.vercel'].includes(item)) {
          walkDir(fullPath);
        }
      } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
        if (replaceEntitiesInFile(fullPath)) {
          filesFixed++;
        }
      }
    }
  }
  
  walkDir(dir);
  return filesFixed;
}

// Process the src/app directory
const appDir = path.join(__dirname, 'src', 'app');
console.log('Starting HTML entity replacement...\n');
const count = processDirectory(appDir);
console.log(`\n✅ Complete! Fixed ${count} files.`);
