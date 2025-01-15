import os
from pathlib import Path
import zipfile

def backup_folder_to_zip(folder_name):
    current_directory = Path(__file__).parent
    
    folder_path = current_directory / folder_name
    if not folder_path.exists() or not folder_path.is_dir():
        print(f"The folder '{folder_name}' does not exist in the current directory.")
        return
    
    backup_zip = current_directory / f"{folder_name}_backup.zip"
    
    with zipfile.ZipFile(backup_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for folder, subfolders, files in os.walk(folder_path):
            for file in files:
                file_path = Path(folder) / file
                zipf.write(file_path, file_path.relative_to(current_directory))
    
    print(f"Folder '{folder_name}' has been successfully backed up to '{backup_zip}'.")

folder_to_backup = 'my_folder'  
backup_folder_to_zip(folder_to_backup)
