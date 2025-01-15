import zipfile
import os

def backup_folder(folder_name, zip_name):
    try:
        if os.path.isdir(folder_name):  # Check if it's a valid directory
            with zipfile.ZipFile(zip_name, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
                for root, _, files in os.walk(folder_name):
                    for file in files:
                        file_path = os.path.join(root, file)
                        zipf.write(file_path, os.path.relpath(file_path, folder_name))
            print(f"Backup completed with compression: {zip_name}")
        else:
            print(f"Error: {folder_name} is not a valid directory!")
    except Exception as e:
        print(f"An error occurred: {e}")

# Usage
backup_folder('Backup_this', 'Backup.zip')
