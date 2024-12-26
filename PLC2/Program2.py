def factorial(n):
    """
    Calculate the factorial of a given number n.
    """
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

def binomial_coefficient(n, r):
    """
    Calculate the binomial coefficient C(n, r).
    """
    if r > n:
        return 0
    return factorial(n) // (factorial(r) * factorial(n - r))

# Example usage
if __name__ == "__main__":
    print("Factorial and Binomial Coefficient Calculator")
    
    # Get user input for factorial
    num = int(input("Enter a number to calculate its factorial: "))
    print(f"Factorial of {num}: {factorial(num)}")
    
    # Get user input for binomial coefficient
    n = int(input("\nEnter n for binomial coefficient: "))
    r = int(input("Enter r for binomial coefficient: "))
    print(f"Binomial Coefficient C({n}, {r}): {binomial_coefficient(n, r)}")