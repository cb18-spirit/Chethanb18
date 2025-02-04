import os

path = 'folder/subfolder/example.txt'
print(os.path.basename(path))  # Output: example.txt
print(os.path.dirname(path))   # Output: folder/subfolder
print(os.path.abspath(path))
