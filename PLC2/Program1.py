# Read input from the user
n = int(input("Enter the length of the Fibonacci sequence (N): "))

# Generate the Fibonacci sequence
if n <= 0:
    print("Please enter a positive integer.")
elif n == 1:
    print("Fibonacci sequence: [0]")
elif n == 2:
    print("Fibonacci sequence: [0, 1]")
else:
    sequence = [0, 1]
    for _ in range(2, n):
        sequence.append(sequence[-1] + sequence[-2])
    print(f"Fibonacci sequence of length {n}: {sequence}") 