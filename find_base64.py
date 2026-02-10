
import re
import os
import base64

file_path = r"d:\Web3 Work\Vibe Code\flowfi2\index.html"
output_dir = r"d:\Web3 Work\Vibe Code\flowfi2\public\assets"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find SVGs containing base64 images
# Pattern matches <svg ... class="..."> ... <image ... xlink:href="data:image/png;base64,..."> ... </svg>
# This regex is a bit simplistic, might need adjustment for multi-line.
# Instead, let's find the specific comment blocks first.

# 1. FFtoken.svg
match_fftoken = re.search(r'<!-- Asset: FFtoken\.svg -->\s*<svg[^>]*>.*?(data:image/png;base64,[^"]+).*?</svg>', content, re.DOTALL)
if match_fftoken:
    print("Found FFtoken.svg base64 data")
    
# 2. ecosystem.svg
match_ecosystem = re.search(r'<!-- Asset: ecosystem\.svg -->\s*(?:<!-- Asset: ecosystem\.svg -->\s*)?<svg[^>]*>.*?(data:image/png;base64,[^"]+).*?</svg>', content, re.DOTALL)
if match_ecosystem:
    print("Found ecosystem.svg base64 data")

# Let's get generic matches too
matches = re.finditer(r'data:image/([a-zA-Z]+);base64,([^"]+)', content)
for i, match in enumerate(matches):
    print(f"Match {i}: {match.group(1)} data length {len(match.group(2))}")
