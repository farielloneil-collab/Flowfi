
import os

file_path = r"d:\Web3 Work\Vibe Code\flowfi2\index.html"

replacements = [
    ('class="transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3"', ''),
    ('class="transition-transform duration-700 ease-out group-hover:-translate-x-3 group-hover:-translate-y-3"', ''),
    ('class="motion-lines-top transition-transform duration-500 ease-out group-hover:-translate-x-6 group-hover:-translate-y-6"', 'class="motion-lines-top"'),
    ('class="motion-lines-bottom transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6"', 'class="motion-lines-bottom"'),
    ('class="transition-transform duration-700 ease-out group-hover:-translate-y-4"', ''),
    ('class="transition-transform duration-700 ease-out group-hover:translate-x-8 group-hover:-translate-y-8"', ''),
    ('class="transition-transform duration-700 ease-out group-hover:-translate-x-8 group-hover:-translate-y-8"', '')
]

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated index.html")
    else:
        print("No changes needed or patterns not found.")

except Exception as e:
    print(f"Error: {e}")
