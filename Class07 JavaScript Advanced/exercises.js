function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.getFullName = function () {
        console.log(`${firstName} ${lastName}`);
    }
}

function Student(firstName, lastName, age, academyName, studentId) {
    Object.setPrototypeOf(this, new Person(firstName, lastName, age));
    this.academyName = academyName;
    this, studentId = studentId;
    this.study = function () {
        console.log(`The student ${firstName} is studying in the ${academyName}`);
    }
}

let newStudent = new Student('Anes', 'Demisoski', 21, 'SEDC');
newStudent.study();
console.log(newStudent);

Person.prototype.getAcademyName = function (student) {
    return student.academyName;
}

function DesignStudent(firstName, lastName, age, isStudentOfTheMonth) {
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, "SEDC", 1));
    this.isStudentOfTheMonth = isStudentOfTheMonth;
    this.attendAdobeExam = function () {
        console.log(`The student ${firstName} is doing an adobe exam`)
    }
}

let designedStudent = new DesignStudent('Anes', 'Demisoski', 1, 21, true);
designedStudent.attendAdobeExam()
console.log(designedStudent);

function CodeStudent(firstName, lastName, age, studentId, hasIndividualProject, hasGroupProject) {
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, 'WebDevelopement', studentId));
    this.hasIndividualProject = hasIndividualProject;
    this.hasGroupProject = hasGroupProject;
    this.doProject = function () {
        if (this.hasIndividualProject) {
            console.log(`The student ${firstName} ${lastName} is working on individual project`);
        } else if (this.hasGroupProject) {
            console.log(`The student ${firstName} ${lastName} is working on a group project`);
        } else {
            console.log('Not working');
        }
    }
}

let codeStudent = new CodeStudent('Krenar', 'Hazari', 24, 2, true, false);
codeStudent.doProject();
console.log(codeStudent);

function NetworkStudent(firstName, lastName, age, academyPart) {
    Object.setPrototypeOf(this, new Student(firstName, lastName, age));
    this.academyPart = academyPart;
    this.attendCiscoExam = function () {
        console.log(`The student ${firstName} is doing a cisco exam`);
    }
}

let networkStudent = new NetworkStudent('Darin', 'Miladinovski', 33, 1)
networkStudent.attendCiscoExam();
console.log(networkStudent);