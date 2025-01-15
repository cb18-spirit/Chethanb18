import random

question_bank = [
    ("What is the capital of India?", "New Delhi", ["Mumbai", "Bengaluru", "Chennai"]),
    ("Who is known as the Father of the Nation in India?", "Mahatma Gandhi", ["Jawaharlal Nehru", "Subhash Chandra Bose", "Sardar Patel"]),
    ("Which is the national animal of India?", "Tiger", ["Lion", "Elephant", "Peacock"]),
    ("In which year did India gain independence?", "1947", ["1950", "1935", "1965"]),
    ("Which is the longest river in India?", "Ganga", ["Yamuna", "Brahmaputra", "Godavari"]),
    ("Who was the first Prime Minister of India?", "Jawaharlal Nehru", ["Indira Gandhi", "Rajendra Prasad", "B. R. Ambedkar"]),
    ("Which is the national bird of India?", "Peacock", ["Crow", "Sparrow", "Eagle"]),
    ("Where is the Taj Mahal located?", "Agra", ["Delhi", "Jaipur", "Mumbai"]),
    ("What is the currency of India?", "Indian Rupee", ["Dollar", "Euro", "Yen"]),
    ("Which festival is known as the festival of lights in India?", "Diwali", ["Holi", "Eid", "Pongal"])
]

def generate_quiz(num_quizzes=5, num_questions=5):
    for quiz_num in range(1, num_quizzes + 1):
        print(f"\n--- Quiz {quiz_num} ---\n")
        quiz_questions = random.sample(question_bank, num_questions)
        
        for i, (question, correct, wrong_options) in enumerate(quiz_questions, start=1):
            options = wrong_options + [correct]
            random.shuffle(options)
            
            print(f"Q{i}. {question}")
            for idx, option in enumerate(options, start=1):
                print(f"   {idx}. {option}")
            print(f"Correct Answer: {correct}\n")

if __name__ == "__main__":
    generate_quiz()
