class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
        self.total = sum(marks)
        self.percentage = self.total / len(marks)

    def display_score_card(self):
        print(f"Student Name: {self.name}")
        print("Marks in subjects:", self.marks)
        print(f"Total Marks: {self.total}")
        print(f"Percentage: {self.percentage:.2f}%")

# Usage
name = input("Enter student name: ")
marks = [int(input(f"Enter marks for subject {i+1}: ")) for i in range(3)]
student = Student(name, marks)
student.display_score_card()
