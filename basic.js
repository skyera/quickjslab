import * as os from "os";
import * as std from "std";

import { add, multiply } from "./math.js";

console.log("Hello, QuickJS!");
let name = 'Alice';
console.log(`Hello, ${name}!`);

let age = 20;
console.log(`Hello, ${name}! You are ${age} years old.`);

const add = (a, b) => a + b;
console.log("sum:", add(1, 2));

// Array methods
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
console.log("doubled:", doubled);

// os.setTimeout(() => {
//     console.log("This runs after 2 seconds!");
// }, 2000);

// let count = 0;
// let intervalId = setInterval(() => {
//     count++;
//     console.log(`Tick ${count}`);
//     if (count == 3) {
//         clearInterval(intervalId);
//         console.log("Stopped after 3 ticks.");
//     }
// }, 1000);

// file
let file = std.open("output.txt", "w");
file.puts("Hello, QuickJS!\n");
file.puts("This is a test.\n");
file.close();
console.log("File written successfully.");

file = std.open("output.txt", "r");
let content = file.readAsString();
file.close();
console.log("File content:", content);

console.log("Add:", add(1, 2));
console.log("Multiply:", multiply(2, 3));

let person = {
    name: "John",
    age: 30,
    hobbies: ["reading", "writing", "playing"],
    address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345"
    },
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
};

// json
let jsonString = JSON.stringify(person, null, 2);
console.log("JSON string:\n" + jsonString);

let parsedPerson = JSON.parse(jsonString);
console.log("Parsed person:", parsedPerson.hobbies);

console.log(person.greet());
person.age += 1;
console.log("Updated age:", person.age);


console.log("os platform:", os.platform);
let cwd = os.getcwd();
console.log("Current working directory:", cwd);

try {
    let home = std.getenv("HOME");
    console.log(home);
} catch (e) {
    console.log(e);
}

//let [status, output] = os.exec(["ls", "-l"]);
//console.log("Status:", status);
//console.log("Output:", output);

// Error handling
try {
    let result = undefinedvariable + 10;
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("Execution completed.");
}

let person2= {
    name: "John",
    age: 30,
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
};
console.log(person2.greet());

// array
let fruits = ["apple", "banana", "cherry"];
fruits.push("orange");

console.log("Fruits:", fruits.join(", "));
console.log("Mapped: ", fruits.map(fruit => fruit.toUpperCase()));
console.log(    
    "Filtered: ", fruits.filter(fruit => fruit.length > 5)
);

// factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

for (let i = 1; i <= 5; i++) {
    console.log(`Factorial of ${i}! = ${factorial(i)}`);
}

// Promise
function delay(ms) {
    return new Promise(resolve => {
        console.log(`waiting ${ms} ms...`);
        resolve();
    });
}

delay(1000).then(() => console.log("Done waiting"));

// str
let text = "quickjs is fast";
console.log("Capitalized:", text.replace(/\b\w/g, c => c.toUpperCase()));
console.log("Split:", text.split(" "));
console.log("Includes 'fast':", text.includes("fast"));

// command args
console.log("Script args:", scriptArgs);

function countLines(filename) {
    let file = std.open(filename, "r");
    if (!file) {
        console.log("File not found:", filename);
        return;
    }

    let content = file.readAsString();
    file.close();
    let lines = content.split("\n").length;
    console.log(`Lines in ${filename}: ${lines}`);
}

countLines(scriptArgs[1]);

// performance test
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

let start = Date.now();
let result = fibonacci(35);
let end = Date.now();
console.log(`Fibonacci(40) = ${result} (took ${end - start} ms)`);

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }

    haveBirthday() {
        this.age++;
        return `Happy birthday, ${this.name}! You are now ${this.age} years old.`;
    }
}

let person3 = new Person("Alice", 25);
console.log(person3.greet());
console.log(person3.haveBirthday());

// dir
let [files, err] = os.readdir(".");
if (err === 0) {
    console.log("Files in current directory:");
    files.forEach(file => console.log(" - ", file));
} else {
    console.log("Error reading directory:", err);
}

// OOP with prototype
function Car(make, model) {
    this.make = make;
    this.model = model;
}

Car.prototype.describe = function() {
    return `This is a ${this.make} ${this.model}.`;
};

let myCar = new Car("Toyota", "Camry");
console.log(myCar.describe());

function fibIterative(n) {
    let a = 0, b = 1;
    if (n <= 1) return n;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
console.log("Iterative Fibonacci(40):", fibIterative(40));

// string reverse
function reverse1(str) {
    return str.split("").reverse().join("");
}

function reverse2(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

let text1 = "QuickJS";
console.log("Reverse 1:", reverse1(text1));
console.log("Reverse 2:", reverse2(text1));

// palindrome
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return str === str.split("").reverse().join("");
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));

// closure
function counter() {
    let count = 0;
    return {
        increment: () => count++,
        decrement: () => count--,
        getCount: () => count
    };
}

let myCounter = counter();
console.log(myCounter.getCount());
myCounter.increment();
console.log(myCounter.getCount());
myCounter.decrement();
console.log(myCounter.getCount());
