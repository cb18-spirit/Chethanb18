import shutil
from pathlib import Path

# Define source and destination paths
source = Path('C:/path/to/source/file.txt')  # Source file path
destination = Path('C:/path/to/destination/file.txt')  # Destination file path

# Copy the file
shutil.copy(source, destination)

print(f"File copied successfully to {destination}")
