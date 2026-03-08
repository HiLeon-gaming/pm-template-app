#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Entity replacement map
entity_map = {
    # Em dash and punctuation
    '&#x2014;': '—',
    '&#x2022;': '•',
    '&#xA9;': '©',
    '&#x2264;': '≤',
    '&#x2265;': '≥',
    
    # Comparison operators (but not &nbsp; which works correctly)
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    
    # Emoji - People & Communication
    '&#x1F465;': '👥',
    '&#x1F464;': '👤',
    '&#x1F4AC;': '💬',
    '&#x1F4AD;': '💭',
    '&#x1F5E3;': '🗣',
    '&#x1F5E8;': '🗨',
    
    # Emoji - Charts & Data
    '&#x1F4CA;': '📊',
    '&#x1F4C8;': '📈',
    '&#x1F4C9;': '📉',
    '&#x1F4CB;': '📋',
    '&#x1F4C4;': '📄',
    '&#x1F4C3;': '📃',
    '&#x1F4C5;': '📅',
    '&#x1F4C6;': '📆',
    '&#x1F4C7;': '📇',
    
    # Emoji - Office & Tools
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
    
    # Emoji - Technology
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
    
    # Emoji - Communication devices
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
    
    # Emoji - Symbols & Icons
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
    
    # Emoji - Time & Calendar
    '&#x23F0;': '⏰',
    '&#x23F1;': '⏱',
    '&#x23F2;': '⏲',
    '&#x231A;': '⌚',
    '&#x231B;': '⌛',
    '&#x23F3;': '⏳',
    
    # Emoji - Arrows & Directions
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
    '&#x2192;': '→',
    
    # Emoji - Checkmarks & Status
    '&#x2611;': '☑',
    '&#x2610;': '☐',
    '&#x1F7E2;': '🟢',
    '&#x1F7E1;': '🟡',
    '&#x1F534;': '🔴',
    '&#x1F7E0;': '🟠',
    
    # Emoji - Misc useful
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
}

def replace_entities_in_file(file_path):
    """Replace HTML entities in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace each entity
        for entity, replacement in entity_map.items():
            content = content.replace(entity, replacement)
        
        # Only write if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def process_directory(directory):
    """Process all .tsx and .ts files in directory recursively."""
    files_fixed = 0
    files_processed = 0
    
    # Walk through directory
    for root, dirs, files in os.walk(directory):
        # Skip certain directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules', '.git', '.vercel']]
        
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                files_processed += 1
                
                if replace_entities_in_file(file_path):
                    print(f"✓ Fixed: {file_path}")
                    files_fixed += 1
    
    return files_fixed, files_processed

if __name__ == '__main__':
    src_app = Path(__file__).parent / 'src' / 'app'
    print('Starting HTML entity replacement...\n')
    fixed, total = process_directory(src_app)
    print(f'\n✅ Complete! Fixed {fixed} out of {total} files processed.')
