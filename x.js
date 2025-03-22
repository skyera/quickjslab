console.log(typeof "Hello");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof null);
console.log(typeof undefined);

var name = "John";
var lowercaseName = name.toLowerCase();
print(lowercaseName);

var firstLetter = name.charAt(0);
print(firstLetter);

var middleOfName = name.substring(2, 4);
print(middleOfName);

var count = 10;
var fixedCount = count.toFixed(2);
print(fixedCount);
var hexCount = count.toString(16);
print(hexCount);

var flag = true;
var flagString = flag.toString();
print(flagString);

var object1 = new Object();
var object2 = object1;
object1.myCustomProperty = "Awesome";
print(object2.myCustomProperty);

var book = {
    name: "The Principle of Object-Oriented JavaScript",
    author: "Nicholas C. Zakas",
    year: 2014
};
print(book.name);
print(book.author);
print(book.year);

var book = {
    "name": "The Principle of Object-Oriented JavaScript",
    "author": "Nicholas C. Zakas",
    "year": 2014
};
print(book.name);
print(book.author);
print(book.year);

var book = new Object();
book.name = "The Principle of Object-Oriented JavaScript";
book.year = 2014;
book.author = "Nicholas C. Zakas";
print(book.name);
print(book.author);
print(book.year);

var colors = ["red", "green", "blue"];
print(colors.length);
print(colors[0]);
print(colors[1]);
print(colors[2]);

var colors = new Array("red", "green", "blue");
print(colors.length);
print(colors[0]);
print(colors[1]);
print(colors[2]);

var array = [];
array.push(12345);
array.push("Code");
print(array);

var array = new Array();
array["push"](12345);
array["push"]("Code");
print(array);

function reflect() {
    return value;
}

console.log(typeof reflect);

var items = [];
var object = {};
console.log(items instanceof Array);
console.log(object instanceof Object);
console.log(reflect instanceof Function);
console.log(Array.isArray(items));

var name = "John";
name.last = "Doe";
console.log(name.last);

console.log(name instanceof String);
console.log(name instanceof Object);

var result = add(1, 2);
print(result);
function add(num1, num2) {
    return num1 + num2;
}

var add1 = function (num1, num2) {
    return num1 + num2;
};
var result = add1(1, 2);
print(result);

// function as value
function sayHi() {
    console.log("Hi");
}

sayHi();
var sayHi2 = sayHi;
sayHi2();

var numbers = [1, 5, 8, 4, 7, 10, 2, 6];
numbers.sort(function(first, second) {
    return second - first;    
});
console.log(numbers);

numbers.sort();
console.log(numbers);
