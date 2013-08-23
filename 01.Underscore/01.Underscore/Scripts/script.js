/// <reference path="underscore.min.js" />
function Student(firstName, lastName, age, marks) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.age = age,
    this.marks = marks;
    var l = this.marks.length;

    this.avgMarks = function () {
        var avg = 0;
        for (var i = 0; i < l; i++) {
            avg += parseFloat(this.marks[i]);
        }
        return parseFloat(avg/l);
    }

    this.ToString = function () {
        return this.firstName + " " + this.lastName + ", " + this.age + ", " + this.avgMarks() + ";";
    }
}

var students = [
    new Student("James", "Miller", 19, [6, 5, 5]),
    new Student("James", "Barry", 21, [4, 5, 4]),
    new Student("Christopher","Anderson", 21,[5, 4, 4]),
    new Student("Kenneth", "Thomas", 17, [4, 3, 5]),
    new Student("Kimberly", "Parker", 23, [6, 5, 6]),
    new Student("Michelle", "Evans", 22, [4, 6, 4]),
    new Student("Phillip", "Evans", 17, [4, 4, 4]),
    new Student("Betty", "Moore", 24, [5, 5, 4])];

function Animal(species, name, legs) {
    this.species = species,
    this.name = name,
    this.legs = legs

    this.ToString = function () {
        return this.species + ", " + this.name + ", " + this.legs + ";\n";
    }
}

var animals = [
    new Animal("Lion", "Leo", 4),
    new Animal("Spider", "Speedy", 8),
    new Animal("Spider", "Crowly", 8),
    new Animal("Centipede", "Gad Mrysna (dirty bastard)", 100),
    new Animal("Spider", "Crowly", 8),
    new Animal("Lion", "Jack", 4),
    new Animal("Crab", "Crap", 6)];

function Author(name, books) {
    this.name = name,
    this.books = books

    this.ToString = function () {
        return this.name + ", " + this.books + ";\n";
    }
}

var authors = [
    new Author("Jackman", 4),
    new Author("Dawer", 8),
    new Author("Brown", 19),
    new Author("Craw", 9)
    ];

(function () {

    var print = "01.\n";

    _.each(students, function (item) {
        if (item.firstName < item.lastName) {
            print += item.firstName + " " + item.lastName + "\n";
        }
    });

    print += "\n02.\n";

    _.each(students, function (item) {
        if (item.age < 25 && item.age > 17) {
            print += item.firstName + " " + item.lastName + "\n";
        }
    });

    print += "\n03.\n";
     
    print += _.chain(students).sortBy(function (students) { return students.avgMarks(); }).last().value().ToString() + "\n";

    print += "\n04.\n";

    var group = _.chain(animals).groupBy('species')
        .sortBy(function (group) { return group[0].legs })
        .each(function (group) {
            _.each(group, function (animal) { print += animal.ToString() })
        });

    print += "\n05.\n";

    var totalLegs = 0;
    _.each(animals, function (item) { totalLegs += item.legs });
    print += totalLegs + " legs total.";

    print += "\n\n06.\n";

    print += _.chain(authors).sortBy(function (authors) { return authors.books }).last().value().ToString();
    
    print += "\n07.\n";

    var groupFirstName = _.chain(students).groupBy('firstName')
                            .sortBy(function (groupFirstName) { return groupFirstName.length });
                                   
    print += groupFirstName.last().first().value().firstName + " - most common first name.\n";

    var groupLastName = _.chain(students).groupBy('lastName')
                            .sortBy(function (groupLastName) { return groupLastName.length });

    print += groupLastName.last().first().value().lastName + " - most common last name.";
   
document.getElementById("output").innerHTML = print;
}());
