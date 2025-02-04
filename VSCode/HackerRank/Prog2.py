def alternate_case(string):
  result = ""
  for i, char in enumerate(string):
    if i % 2 == 0:
      result += char.upper() 
    else:
      result += char.lower() 
  return result

input_string = "hello world"
output_string = alternate_case(input_string)
print(output_string)  