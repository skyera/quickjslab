// JavaScript Exercise 1 - Basics
// Run with: ./qjs ex1.js

import * as std from "std";
import * as os from "os";

print("=== JavaScript Exercise 1 ===\n");

// 1. Variables and Data Types
print("--- 1. Variables ---");
let name = "JavaScript Learner";
const version = "ES2024";
let score = 95.5;
let isActive = true;
console.log(`Name: ${name}, Version: ${version}`);
console.log(`Score: ${score}, Active: ${isActive}`);

// 2. String Operations
print("\n--- 2. Strings ---");
let text = "  QuickJS is lightweight and fast!  ";
console.log("Original:", text.trim());
console.log("Uppercase:", text.toUpperCase().trim());
console.log("Length:", text.length);
console.log("Includes 'fast':", text.includes("fast"));

// 3. Array Operations
print("\n--- 3. Arrays ---");
let numbers = [10, 25, 3, 47, 8, 99, 42];
console.log("Original:", numbers.join(", "));

// Sort ascending
let sorted = [...numbers].sort((a, b) => a - b);
console.log("Sorted:", sorted.join(", "));

// Filter and map
let evens = numbers.filter(n => n % 2 === 0);
let doubled = numbers.map(n => n * 2);
console.log("Evens:", evens.join(", "));
console.log("Doubled:", doubled.join(", "));

// Reduce (sum)
let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);
console.log("Average:", (sum / numbers.length).toFixed(2));

// 4. Objects
print("\n--- 4. Objects ---");
let book = {
    title: "The QuickJS Way",
    author: "Tech Writer",
    pages: 256,
    chapters: ["Intro", "Basics", "Advanced", "Projects"],
    getInfo() {
        return `${this.title} by ${this.author}`;
    }
};
console.log(book.getInfo());
console.log("Chapters:", book.chapters.join(" > "));

// Object destructuring
let { title, author } = book;
console.log(`Destructured: ${title} / ${author}`);

// 5. Functions
print("\n--- 5. Functions ---");

// Arrow function
const square = (n) => n * n;
console.log("Square of 7:", square(7));

// Higher-order function
function applyTwice(fn, x) {
    return fn(fn(x));
}
console.log("Apply twice (x+1, start=0):", applyTwice(x => x + 1, 0));

// 6. Closures
print("\n--- 6. Closures ---");
function createMultiplier(factor) {
    return (number) => number * factor;
}
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);
console.log("Triple of 5:", triple(5));
console.log("10x of 5:", tenTimes(5));

// 7. Classes
print("\n--- 7. Classes ---");
class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }
    speak() {
        return `${this.name} says: ${this.sound}!`;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "Woof");
    }
    fetch(item) {
        return `${this.name} fetches the ${item}!`;
    }
}

let dog = new Dog("Buddy");
console.log(dog.speak());
console.log(dog.fetch("ball"));

// 8. Iterators and Generators
print("\n--- 8. Generators ---");
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

let total = 0;
for (let n of range(1, 100)) {
    total += n;
}
console.log("Sum 1-100:", total);

// 9. Error Handling
print("\n--- 9. Error Handling ---");
function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero!");
    return a / b;
}

try {
    console.log("10 / 2 =", divide(10, 2));
    console.log("10 / 0 =", divide(10, 0));
} catch (e) {
    console.log("Error:", e.message);
} finally {
    console.log("Division attempt complete.");
}

// 10. Challenges!
print("\n--- 10. Challenges ---");

// Challenge 1: Palindrome checker
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return str === str.split("").reverse().join("");
}
console.log("'racecar' is palindrome:", isPalindrome("racecar"));
console.log("'hello' is palindrome:", isPalindrome("hello"));

// Challenge 2: FizzBuzz
print("\nFizzBuzz 1-20:");
for (let i = 1; i <= 20; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    console.log(out || i);
}

// Challenge 3: Find primes up to N
function findPrimes(max) {
    let primes = [];
    for (let n = 2; n <= max; n++) {
        let isPrime = true;
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) { isPrime = false; break; }
        }
        if (isPrime) primes.push(n);
    }
    return primes;
}
console.log("\nPrimes up to 50:", findPrimes(50).join(", "));

// Challenge 4: Count word frequency
function wordFreq(text) {
    let words = text.toLowerCase().split(/\s+/);
    let freq = {};
    for (let w of words) {
        freq[w] = (freq[w] || 0) + 1;
    }
    return freq;
}
let sentence = "the quick brown fox jumps over the lazy dog the fox";
let freq = wordFreq(sentence);
console.log("\nWord frequency:", freq);

// Challenge 5: Debounce-style counter
function createDebounce() {
    let timer = null;
    let count = 0;
    return {
        trigger() {
            count++;
            console.log(`Triggered! (${count} total)`);
        },
        getCount() { return count; }
    };
}
const db = createDebounce();
db.trigger();
db.trigger();
db.trigger();
console.log("Total triggers:", db.getCount());

// Challenge 6: Recursive deep clone (simplified)
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
let original = { a: 1, b: { c: 2, d: [1, 2, 3] } };
let cloned = deepClone(original);
cloned.b.d.push(4);
console.log("\nOriginal:", JSON.stringify(original));
console.log("Cloned:", JSON.stringify(cloned));

// std - operation
let filename = "output.txt";
let file = std.open(filename, "w");
file.puts("Hello, QuickJS!");
file.close();
console.log("File written to:", filename);

std.printf("Number: %d\n", 42);

print("\n=== Exercise Complete! ===");
