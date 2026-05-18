import os
import glob

# Path to website directory
website_dir = r"c:\Foram\MODEL-1\website"

# Replacements
replacements = {
    'bg-dark': 'bg-light',
    'text-light': 'text-dark',
    'navbar-dark': 'navbar-light',
    'dropdown-menu-dark': ''
}

# Find all HTML files
html_files = glob.glob(os.path.join(website_dir, '*.html'))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old_class, new_class in replacements.items():
        content = content.replace(old_class, new_class)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(filepath)}")
    else:
        print(f"No changes in {os.path.basename(filepath)}")

print("Done converting to light theme.")
