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
