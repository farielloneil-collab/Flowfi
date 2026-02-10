
import re

file_path = r"d:\Web3 Work\Vibe Code\flowfi2\index.html"
patterns = [r"transition-transform", r"duration-[0-9]+", r"group-hover:[^\"\s]+", r"ease-[a-z]+"]

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        for pattern in patterns:
            if re.search(pattern, line):
                print(f"{i+1}: {line.strip()}")
                break
                
except Exception as e:
    print(f"Error: {e}")
