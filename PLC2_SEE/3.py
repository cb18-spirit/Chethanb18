with open(r"C:\Users\18che\Code_Projects\Chethanb18\PLC2_SEE\sample.txt", "r") as file: 
    content = file.read()  # Reads entire file as a string 
    lines = file.readlines()  # Reads file into a list of lines

print(content)
print(lines)