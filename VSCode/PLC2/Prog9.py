class Complex:
    def __init__(self, real, imag):
        self.real = real
        self.imag = imag

    def __add__(self, other):
        return Complex(self.real + other.real, self.imag + other.imag)

    def __str__(self):
        return f"{self.real} + {self.imag}i"

def add_n_complex_numbers(n):
    total = Complex(0, 0)
    for i in range(n):
        real = float(input(f"Enter real part of complex number {i+1}: "))
        imag = float(input(f"Enter imaginary part of complex number {i+1}: "))
        total += Complex(real, imag)
    return total

# Usage
n = int(input("Enter the number of complex numbers to add: "))
if n >= 2:
    result = add_n_complex_numbers(n)
    print("Sum of complex numbers:", result)
else:
    print("Please enter at least 2 complex numbers.")
