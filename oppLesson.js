class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

Person.prototype.greet = function () {
    console.log(`Hello, my ns ${this.name}`);
}

const person = new Person('Max', 29);
person.greet();