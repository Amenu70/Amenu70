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
        this.questions = questions;
        this.students = students;
    }
    scoreStudentBySid(sId) {
        let student = students.find(student => student.studentId == sId);
        return (student.answers.filter(a => {
            let currentQuestion = questions.find(q => q.qid == a.qid)
            return currentQuestion.checkAnswer(a.answer)
        }).length);
    }
    getAverageScore() {
        return students.map(s => this.scoreStudentBySid(s.studentId)).reduce((sum, current) => sum + current, 0) / students.length;
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
console.log(scoreforStudent10);

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); 

let average = quiz.getAverageScore();
console.log(average);