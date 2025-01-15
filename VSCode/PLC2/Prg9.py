class Complex:
    def __init__(self, real, imag): self.real, self.imag = real, imag
    def __add__(self, other): return Complex(self.real + other.real, self.imag + other.imag)
    def __str__(self): return f"{self.real} + {self.imag}i"

n = int(input("Enter n (>= 2): "))
nums = [Complex(*map(float, input(f"Enter real and imag for {i+1}: ").split())) for i in range(n)]
print("Sum:", sum(nums[1:], nums[0]))