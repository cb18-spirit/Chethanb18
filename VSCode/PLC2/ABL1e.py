with open("source.txt", "w") as source_file:
    source_file.write("Hello, this is a sample file.\n")
    source_file.write("It contains multiple lines of text.\n")
    source_file.write("Python is great for file handling!\n")

with open("source.txt", "r") as source_file, open("destination.txt", "w") as dest_file:
    content = source_file.read()
    dest_file.write(content)

with open("source.txt", "r") as source_file:
    lines = source_file.readlines()
    num_lines = len(lines)
    num_chars = sum(len(line) for line in lines)

print(f"Number of lines: {num_lines}")
print(f"Number of characters: {num_chars}")
