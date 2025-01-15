import random

def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])

def get_user_choice():
    while True:
        choice = input("Please enter your choice (rock, paper, or scissors): ").strip().lower()
        if choice in ["rock", "paper", "scissors"]:
            return choice
        print("Invalid input. Try again.")

def determine_winner(user, computer):
    if user == computer:
        return "draw"
    winning_combinations = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    }
    return "win" if winning_combinations[user] == computer else "loss"

def display_result(result):
    if result == "win":
        print("Congratulations, you won!")
    elif result == "loss":
        print("You lost. Better luck next time!")
    else:
        print("It's a draw!")

def main():
    print("Welcome to the Rock, Paper, Scissors game!")
    wins, losses, draws = 0, 0, 0

    while True:
        user_choice = get_user_choice()
        computer_choice = get_computer_choice()

        print(f"\nYour choice: {user_choice}")
        print(f"Computer's choice: {computer_choice}")

        result = determine_winner(user_choice, computer_choice)
        display_result(result)

        if result == "win":
            wins += 1
        elif result == "loss":
            losses += 1
        else:
            draws += 1

        print(f"Current Score -> Wins: {wins}, Losses: {losses}, Draws: {draws}\n")

        play_again = input("Would you like to play another round? (yes/no): ").strip().lower()
        if play_again != "yes":
            print("\nFinal Score:")
            print(f"Wins: {wins}, Losses: {losses}, Draws: {draws}")
            print("Thank you for playing! Goodbye.")
            break

if __name__ == "__main__":
    main()
