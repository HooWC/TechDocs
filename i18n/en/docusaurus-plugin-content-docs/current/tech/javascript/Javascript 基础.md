---
id: js-base
slug: /js-base
title: Basic Learning
date: 2024-11-04
authors: Hoo
tags: [javascript]
keywords: [javascript]
---

:::success Previous article reminder

JavaScript is a widely used programming language, especially for web development. It is one of the core technologies of front-end development and, together with HTML and CSS, forms the basis of modern web pages. Here are some basic knowledge of JavaScript, including language features, syntax, and common usage.

:::

------

## Basic learning

```javascript
console.log('You are ${age} years old')

.toFixed(2) // Keep the last two digits

document.getElementById("p1").textContent = "Hoo" #Assign a value to <p>

document.getElementById("p1").onclick = function(){
	username = document.getElementById("myText").value; # input
	document.getElementById("myH1").textContent = `Hello ${username}`; # H1
}

window.prompt("...")
Number(age) #Convert int
String(age) #Convert string
Boolean() #Convert
```

```javascript
increaseBtn.onclick = function(){
	count++;
	countLabel.textContent = count;
}
```

```javascript
Math.round(4.4) #Rounding #4
Math.ceil(4.2) #Rounding up #5
Math.floor(4.7) #Rounding down #4
Math.trunc(4.7) #Return the integer part #4
Math.sign(4) #Return whether it is negative, empty or positive #1 #-1
Math.pow(8,2); #Return the value of x raised to the power of y #64
Math.sqrt(64); #Return the square root of x #8
Math.abs(-4.7); #Return the absolute (positive) value of x
Math.min(0, 150, 30, 20, -8, -200); 
Math.max(0, 150, 30, 20, -8, -200);
Math.random();
Math.random() * 10; # 0 - 10
```

```javascript
<input type="checkbox" id="mycheckBox"/>
// Check if it is clicked
if(mychackBox.checked){}

username = "Hoo"
username.charAt(0) # Extract the first word
username.indexOf("o") # Find the first index of o
username.lastIndexOf("o") # Find the last index of o
username.length
username.trim()
username.startsWith(" ") # Check if the first word is a space
username.endsWith(" ")
username.includes(" ")

let phoneNumber = "123-456-7890"
phoneNumber.replaceAll("-","/") #123/456/7890

phoneNumber.padStart(15,"0") Automatically add 15 0s in front
phoneNumber.padEnd(15,"0") Automatically add 15 0s in the back

const fullname = "Bro Code";
let firstName = fullName.slice(0, 3); #Bro 
let lastName = fullName.slice(4, 8); #Code 
let lastChar = fullName.slice(-2); #Finally #de
let firstName = fullName.slice(0, fullname.indexOf(" ")); #Bro

// email
const email = "Hoo@gmail.com"
let username = email.slice(0,email.indexOf("@")); #Hoo
let username = email.slice(email.indexOf("@") + 1); #gmail.com

.toUpperCase()
.toLowerCase()

let fruits = ["apple","orange","banana"];
fruits[2] = "AAA"
fruits.indexOf("Mango") #-1 No

username.join("-")
.join(" ")

sum()

const values = [];

values.push(value);
```



### Password Garbled

```javascript
function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols){
	
	const lovercaseChars = "abcdefghijklmnopqrstuvwxyz";
	const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVZXYZ";
	const numberChars = "0123456789";
	const symbolChars = "!@#$%^&*()_+-=";
	
	let allowedChars = "";
	let password = "";
	
	allowedChars += includeLowercase ? lovercaseChars : "";
	allowedChars += includeUppercase ? uppercaseChars : "";
	allowedChars += includeNumbers ? numberChars : "";
	allowedChars += includeSymbols ? symbolChars : "";
	
	if(length <= 0){
		return `(passworrd length must be at least 1)`;
	}
	if(allowedChars.length === 0){
		return `(At least 1 set of character needs to be selected)`;
	}
	
	for(let i = 0; i < length; i++){
		const randomIndex = Math.floor(Math.random() * allowedChars.length);
		password += allowedChars[randomIndex];
	}
	
	return password;
}

const passwordLength = 12;
const includeLowercase = true;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;

const password = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
```



### Foreach

```javascript
let numbers = [1,2,3,4,5];
numbers.forEach(display);

function display(element){
	console.log(element)
}
```



### Map

```javascript
const numbers = [1,2,3,4,5];
const squ = numbers.map(upperCase);

function upperCase(element){
	return element.toUpperCase();
}
```



### Filter

```javascript
let numbers = [1,2,3,4,5];
let evenNums = numbers.filter(isEven);

function isEven(element){
	return element % 2 === 0;
}
```

```javascript
let numbers = [15,16,17,18,19,20];
let evenNums = numbers.filter(isEven);

function isEven(element){
	return element >= 18;
}
```



### Reduce

```javascript
# reduce() Methods return only one value: the accumulated result of the function.
const numbers = [175, 50, 25];
document.getElementById("demo").innerHTML = numbers.reduce(myFunc);

function myFunc(total, num) {
  return total - num;
}
```



### Reverse

```javascript
// Create an Array
const fruits = ["Banana", "Orange", "Apple", "Mango"];

// Reverse the Array
const fruits2 = fruits.reverse();
```



### Sort

```javascript
# Sorting
const fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.sort();
```



### Shift

```javascript
# shift() Remove the first item of an array:
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift();
```



### Some

```javascript
# Array.some() method checks if any element in the array passes a test (given as a function).
const ages = [3, 10, 18, 20];
ages.some(checkAdult);

function checkAdult(age) {
  return age > 18;
}

# true
```



### Splice

```javascript
# splice() Methods can add or remove array elements.

// Create an Array
const fruits = ["Banana", "Orange", "Apple", "Mango"];

// At position 2, add "Lemon" and "Kiwi"
fruits.splice(2, 0, "Lemon", "Kiwi");

# Banana,Orange,Lemon,Kiwi,Apple,Mango
```

```javascript
// Create an Array
const fruits = ["Banana", "Orange", "Apple", "Mango"];

// At position 2, remove 2 elements
fruits.splice(2, 2);

# Banana,Orange
```



### Arrow Functions

```javascript
const hello = (name) => console.log(`Hello ${name}`);

hello("Bro");
```



### Objects

```javascript
const person1 = {
	firstName: "Hoo",
	lastName: "WC",
	age: 24,
	sayHello: function(){
		console.log(`Hi ${this.firstName}`)
	}
}

console.log(person1.firstName);
```

```javascript
function Car(make, model, year, color){
	this.make = make,
	this.model = model,
	this.year = year,
	this.color = color
}

const car1 = new Car("Ford", "Mustang", 2024, "red")

console.log(car1.make)
```



### Class

```javascript
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  
  age() {
    const date = new Date();
    return date.getFullYear() - this.year;
  }
}

const myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML =
"My car is " + myCar.age() + " years old.";
```

### async

```javascript
async function myDisplay(){
    const w = await walk();
}

async function myDisplay() {
  let myPromise = new Promise(function(resolve) {
    resolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();
```

```javascript
async function myDisplay() {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve("I love You !!");}, 3000);
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();
```



### isNaN

```javascript
if (isNaN(prev) || isNaN(current)) return
```

