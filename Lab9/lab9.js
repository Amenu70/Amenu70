class Student {
    constructor(studentId) {
        this.studentId = studentId;
        this.answers = [];
    }

    addAnswer(question) {
        this.answers.push(question);
    }
}

class Question {
    constructor(qid, answer) {
        this.qid = qid;
        this.answer = answer;
    }

    checkAnswer(answer) {
        return this.answer === answer;
    }
}

class Quiz {
    constructor(questions, students) {
        this.questions = new Map();
        this.students = students;

        for (const question of questions) {
            this.questions.set(question.qid, question.answer);
        }
    }

    scoreStudentBySid(sid) {
        const student = this.students.find((s) => s.studentId === sid);
        if (!student) {
            console.log("Student not found!");
            return;
        }

        let score = 0;
        for (const answer of student.answers) {
            const questionId = answer.qid;
            const studentAnswer = answer.answer;

            if (this.questions.has(questionId)) {
                const correctAnswer = this.questions.get(questionId);
                if (correctAnswer === studentAnswer) {
                    score++;
                }
            }
        }

        return score;
    }

    getAverageScore() {
        let totalScore = 0;
        for (const student of this.students) {
            const score = this.scoreStudentBySid(student.studentId);
            totalScore += score;
        }

        return this.students.length > 0 ? totalScore / this.students.length : 0;
    }
}

// Usage example
const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));

const students = [student1, student2];
const questions = [
    new Question(1, 'b'),
    new Question(2, 'a'),
    new Question(3, 'b')
];

const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); // Expected Result: 3

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); // Expected Result: 2

let average = quiz.getAverageScore();
console.log(average);