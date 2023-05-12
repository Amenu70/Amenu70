// Question 1
const student = {
    firstName: "",
    lastName: "",
    grades: [],
    inputNewGrade: function (newGrade) {
        this.grades.push(newGrade);
    },
    computeAverageGrade: function () {
        if (this.grades.length === 0) {
            return 0;
        }
        const sum = this.grades.reduce((acc, curr) => acc + curr);
        return sum / this.grades.length;
    }
};

function createStudent(firstName, lastName) {
    const newStudent = Object.create(student);
    newStudent.firstName = firstName;
    newStudent.lastName = lastName;
    return newStudent;
}

const students = [
    createStudent("John", "Doe"),
    createStudent("Jane", "Smith"),
    createStudent("Bob", "Johnson")
];

let totalAverageGrade = 0;
for (const student of students) {
    totalAverageGrade += student.computeAverageGrade();
}
const overallAverageGrade = totalAverageGrade / students.length;
console.log(overallAverageGrade);


// Question 2

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = [];

    this.inputNewGrade = function (newGrade) {
        this.grades.push(newGrade);
    };

    this.computeAverageGrade = function () {
        if (this.grades.length === 0) {
            return 0;
        }
        const sum = this.grades.reduce((acc, curr) => acc + curr);
        return sum / this.grades.length;
    };
}
const studentsWithConstructor = [
    new Student("John", "Doe"),
    new Student("Jane", "Smith"),
    new Student("Bob", "Johnson")
];

let totalAverage = 0;
for (const student of studentsWithConstructor) {
    totalAverage += student.computeAverageGrade();
}
const overallAverage = totalAverage/ students.length;
console.log(overallAverage);

//Question 3

Array.prototype.sort = function () {
    return this.slice().sort(function (a, b) {
        return a - b;
    });
};


