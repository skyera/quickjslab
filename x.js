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

function sum() {
    var result = 0,
        i = 0,
        len = arguments.length;

    while (i < len) {
        result += arguments[i];
        i++;
    }
    return result;
}

print(sum(1,2));
print(sum.length);

// Function don't have signature 
function sayMessage(message) {
    print(message);
}
sayMessage("Hello");

function sayMessage() {
    print("Default message");
}

sayMessage("Hello");

function sayMessage(message) {
    if (arguments.length === 0) {
        print("Default message");
    } else {
        print(message);
    }
}

sayMessage("Hello");
sayMessage();

// object method
// this: calling object
var person = {
    name: "John",
    sayName: function() {
        print(this.name);
    }
};
person.sayName();

function sayNameForAll() {
    print(this.name);
}

sayNameForAll();

var person1 = { 
    name: "John",
    sayName: sayNameForAll
};
person1.sayName();

var person2 = { 
    name: "Ross",
    sayName: sayNameForAll
};
person2.sayName();

globalThis.name = "Mike";
sayNameForAll();

// call
function sayNameForAll(label) {
    print(label + ":" + this.name);
}

var person1 = { 
    name: "John"
};
var person2 = { 
    name: "Ross"
};
globalThis.name = "Mike";

sayNameForAll.call(globalThis, "globalThis");
sayNameForAll.call(person1, "person1");
sayNameForAll.call(person2, "person2");

// apply
sayNameForAll.apply(globalThis, ["globalThis"]);
sayNameForAll.apply(person1, ["person1"]);
sayNameForAll.apply(person2, ["person2"]);

// bind
var sayNameForAll = sayNameForAll.bind(globalThis);
sayNameForAll("globalThis");
sayNameForAll = sayNameForAll.bind(person1);
sayNameForAll("person1");
sayNameForAll = sayNameForAll.bind(person2);
sayNameForAll("person2");

// detect property
print("name" in person1);
print(person1.hasOwnProperty("toString"));

// remove property
delete person1.name;
print("name" in person1);

var object = {
    name: "John",
    toString: function() {
        return this.name;
    }
}
// enumerate property
for (var key in object) {
    print("Name: " + key + ", Value: " + object[key]);
}

var properties = Object.keys(object);
var i, len;

for (i = 0, len = properties.length; i < len; i++) {
    print("Name: " + properties[i] + ", Value: " + object[properties[i]]);
}

var person1 = {
    name: "John"
};

print("propertyIsEnumerable");
print("name" in person1);
print(person1.propertyIsEnumerable("name"));

var properties = Object.keys(person1);
print("length" in properties);
print(properties.propertyIsEnumerable("length"));

// getter, settter
var person1 = {
    _name: "John",
    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value;
    }
};
print(person1.name);
person1.name = "Mike";
print(person1.name);

// property: configurable, enumerable
var person1 = {
    name: "John"
};

Object.defineProperty(person1, "name", {
    configurable: false,
    enumerable: false
});
console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));

var properties = Object.keys(person1);
console.log(properties.length);

delete person1.name;
console.log("name" in person1);
console.log(person1.name);

var person1 = {};
Object.defineProperty(person1, "name", {
    value: "John",
    configurable: true,
    enumerable: true,
    writable: true
});
console.log(person1.name);

var person1 = {};
Object.defineProperty(person1, "name", {
    value: "John",
});
console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));

delete person1.name;
console.log("name" in person1);
console.log(person1.name);

person1.name = "Mike";
console.log(person1.name);

// accessor property
var person1 = {
    _name: "John",
};

Object.defineProperty(person1, "name", {
    get: function() {
        return this._name;
    },
    set: function(value) {
        this._name = value;
    },
    configurable: true,
    enumerable: true
});
console.log(person1.name);
person1.name = "Mike";
console.log(person1.name);

//
var person1 = {
    _name: "John"
};

Object.defineProperty(person1, "name", {
    get: function() {
        console.log("reading name");
        return this._name;
    }
});
console.log(person1.name);
console.log(person1.propertyIsEnumerable("name"));
delete person1.name;
console.log("name" in person1);
person1.name = "Mike";
console.log(person1.name);

// define multiple properties
var person1 = {};
Object.defineProperties(person1, {
    _name: {
        value: "John",
        configurable: true,
        enumerable: true,
        writable: true
    },
    name : {
        get: function() {
            console.log("reading name");
            return this._name;
        },
        set: function(value) {
            console.log("writing name");
            this._name = value;
        },
        configurable: true,
        enumerable: true
    }
});
console.log(person1.name);

// fetch property attribute
var person1 = {
    name: "John"
};

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.enumerable);
console.log(descriptor.writable);
console.log(descriptor.configurable);
console.log(descriptor.value);

// prevent object modification
var person1 = {
    name: "John"
};

console.log(Object.isExtensible(person1));
Object.preventExtensions(person1);
console.log(Object.isExtensible(person1));

person1.sayName = function() {
    print(this.name);
};
console.log("sayName" in person1);
delete person1.sayName;
console.log("sayName" in person1);

// seal object
var person1 = {
    name: "John"
};
console.log(Object.isExtensible(person1));
console.log(Object.isSealed(person1));
Object.seal(person1);
console.log(Object.isSealed(person1));
console.log(Object.isExtensible(person1));

person1.sayName = function() {
    print(this.name);
};
console.log("sayName" in person1);

person1.name = "Mike";
console.log(person1.name);

delete person1.name;
console.log("name" in person1);
console.log(person1.name);

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log("name descriptor");
console.log(descriptor.enumerable);
console.log(descriptor.writable);
console.log(descriptor.configurable);
console.log(descriptor.value);

// freeze object
var person1 = {
    name: "John"
};
console.log(Object.isExtensible(person1));
console.log(Object.isFrozen(person1));
Object.freeze(person1);
console.log(Object.isFrozen(person1));
console.log(Object.isExtensible(person1));

person1.sayName = function() {
    print(this.name);
};
console.log("sayName" in person1);

person1.name = "Mike";
console.log(person1.name);

delete person1.name;
console.log("name" in person1);
console.log(person1.name);

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log("name descriptor");
console.log(descriptor.enumerable);
console.log(descriptor.writable);
console.log(descriptor.configurable);
console.log(descriptor.value);

//constructor
function Person(name) {
    this.name = name;
    this.sayName = function() {
        print(this.name);
    };
}
print("\n\nConstructor");
var person1 = new Person("John");
console.log(person1 instanceof Person);
console.log(person1.constructor === Person);

print(person1.name);
person1.sayName();

function Person(name) {
    Object.defineProperty(this, "name", {
        get: function() {
            return name;
        },
        set: function(value) {
            name = value;
        },
        configurable: true,
        enumerable: true
    });
    this.sayName = function() {
        print(this.name);
    };
}

var person1 = new Person("John");
console.log(person1.name);
person1.name = "Mike";
person1.sayName();

// prototypes
print("\nPrototypes");
var book = {
    title: "The Book",
    author: "John Doe",
    toString: function() {
        return this.title + " by " + this.author;
    }
}
print("title" in book);
print(book.hasOwnProperty("title"));
print("hasOwnProperty" in book);
print(book.hasOwnProperty("hasOwnProperty"));
print(Object.prototype.hasOwnProperty("hasOwnProperty"));

var object = {};
var prototype = Object.getPrototypeOf(object);
console.log(prototype === Object.prototype);

print(Object.prototype.isPrototypeOf(object));
console.log(object.toString());

object.toString = function() {
    return "[object Custome]";
};
console.log(object.toString());

delete object.toString;
console.log(object.toString());

delete object.toString;
console.log(object.toString());

//
function PersonX(name) {
    this.name = name;
}

PersonX.prototype.sayName = function() {
    print(this.name);
};

var person1 = new PersonX("John");
person1.sayName();

var person2 = new PersonX("Ross");
person2.sayName();

PersonX.prototype.favorites = [];
person1.favorites.push("A");
person2.favorites.push("B");
print(person1.favorites);
print(person2.favorites);

print(person1.constructor === PersonX);

PersonX.prototype = {
    constructor: PersonX,
    sayName: function() {
        print(this.name);
    },
    toString: function() {
        return "[PersonX " + this.name + "]";
    }
};
var person1 = new PersonX("John");
person1.sayName();
print(person1.toString());
print(person1.constructor === PersonX);
