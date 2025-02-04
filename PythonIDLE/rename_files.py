import os
import re

def convert_date(date_str):
    match = re.match(r'(\d{2})-(\d{2})-(\d{4})', date_str)
    if match:
        return f'{match.group(2)}-{match.group(1)}-{match.group(3)}'
    return date_str

def rename_files_in_directory(directory):
    for filename in os.listdir(directory):
        new_filename = re.sub(r'(\d{2})-(\d{2})-(\d{4})', lambda x: convert_date(x.group(0)), filename)
        
        if new_filename != filename:
            old_file = os.path.join(directory, filename)
            new_file = os.path.join(directory, new_filename)
            os.rename(old_file, new_file)
            print(f'Renamed: {filename} -> {new_filename}')

directory_path = directory_path = 'C:\\Users\\18che\\Code_Projects\\PythonIDLE'
rename_files_in_directory(directory_path)
