import os

def get_directory_size(directory_path):
    total_size = 0
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                total_size += os.path.getsize(file_path)
            except (OSError, FileNotFoundError):
                print(f"Warning: Unable to access {file_path}")
    return total_size

def main():
    directory = r"C:\Windows\System32"
    print(f"Calculating the total size of all files in '{directory}'...")
    
    try:
        total_size = get_directory_size(directory)
        print(f"Total size of all files in '{directory}': {total_size / (1024**2):.2f} MB")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()


