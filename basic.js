import * as os from "os";
import * as std from "std";

import { add, multiply } from "./math.js";

let name = "Alice";
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
    }
};

let jsonString = JSON.stringify(person, null, 2);console.log("JSON string:\n" + jsonString);

let parsedPerson = JSON.parse(jsonString);
console.log("Parsed person:", parsedPerson.hobbies);

console.log("os platform:", os.platform);
let cwd = os.getcwd();
console.log("Current working directory:", cwd);

try {
    let home = std.getenv("HOME");
    console.log(home);
} catch (e) {
    console.log(e);
}

let [status, output] = os.exec(["ls", "-l"]);
console.log("Status:", status);
console.log("Output:", output);
