def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def display_conversion(celsius, fahrenheit):
    print(f"\n{celsius:.2f}°C is equal to {fahrenheit:.2f}°F")

def main():
    print("Welcome to the Celsius to Fahrenheit Converter!")
    while True:
        try:
            celsius = float(input("\nEnter temperature in Celsius: "))
            fahrenheit = celsius_to_fahrenheit(celsius)
            display_conversion(celsius, fahrenheit)
        except ValueError:
            print("Invalid input. Please enter a valid numeric value.")

        repeat = input("Would you like to convert another temperature? (yes/no): ").strip().lower()
        if repeat != "yes":
            print("Thank you for using the converter. Goodbye!")
            break

if __name__ == "__main__":
    main()
