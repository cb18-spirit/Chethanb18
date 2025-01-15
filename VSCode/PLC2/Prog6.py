def sort_file_contents(bands.txt, bands_sorted):
    try:
        with open(bands.txt, 'r') as infile:
            lines = infile.readlines()
            lines.sort()
        with open(bands_sorted, 'w') as outfile:
            outfile.writelines(lines)
        print("File contents sorted and saved successfully!")
    except FileNotFoundError:
        print("Input file not found!")

# Usage
sort_file_contents('bands.txt', 'bands_sorted')
