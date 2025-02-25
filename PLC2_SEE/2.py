import shutil  
source_folder = r"C:\Users\18che\Downloads\source"
zip_file_name = "backup"  
shutil.make_archive(zip_file_name, 'zip', source_folder) 