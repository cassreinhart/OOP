//objects review

//POJO "plain old javascript object"
let o1 = {}; //create object w/object literal (curly braces)
let o2 = new Object(); //does the same as above (new keyword)

o1.name = "Whiskey";
o1["name"] = "Whiskey"; //same thing as above

const color = 'teal';

const obj = {};
obj.color = '#3723FF'; //will name the key literally 'color'
obj[color] = '#3723FF'; //will evaluate what is inside of the brackets and name accordingly, makes key 'teal'
//typically use this for variables we want to use to access something in an object
obj[1 + 4 - 2 * 8] = '#3723FF'; //will evaluate to -11 and set the key to -11

//to get keys
Object.keys(o1); //get arr of keys for o1
Object.values(o1); //get arr of values for o1
Object.entries(o1); //get arr of key/val pairs

for (let [k, v] of Object.entries(obj)) { //loop over entries w/destructured key/value
    console.log(k, v);
}

obj[-11]; //this will turn the key name to a string and return the value
obj['-11']; //this will still return the same value


//methods (functions as keys)
o1.sayHi = function() { return "Hi!"};
o1.sayHi(); //"Hi!"

//for example, the Math object has many methods you can call (Math.max, Math.PI, etc)

// const add = (x, y) => x + y;
// const mult = (x, y) => x * y;
// const square = x => x * x;
// const power = (x, y) => x ** y;

// const myMath = {};
//add properties as below:
// myMath.add = add;
// myMath.mult = mult;

// myMath.add(3, 4); //7

//alternatively:
// const myMath = {add, mult, square, power};

//lastly: 
const myMath = {
    add: function(x, y) {
        return x + y
    },
    mult: (x, y) => {
        return x * y;
    },
    square: x => {
        return x * x;
    },
    power: (x, y) => {
        x ** y;
    }
}


//this and methods

function getHypotenuse(a, b) {
    return Math.sqrt(a ** 2 + b ** 2);
}
function getArea(a, b) {
    return a * b / 2;
}

//need to store side lengths of triangle
let side1= 4;
let side2 = 3;
const side3 = getHypotenuse(side1, side2);

const area = getArea(side1, side2);//there could also be many more functions we are dealing with!
side1 = 9; //this is messy to constantly keep track of values
side2 = 12;
getHypotenuse(9, 12);

//instead, create an object which has a & b as values on the object as well as properties that are methods within it
let triangle = {
    a: 3,
    b: 4,
    printThis(){ //you can also write the method like this, but CANNOT use the arrow function if we are using the this keyword!
        console.log(this);//this is an object, this object right here...
    }
    getArea: function() { //method
        return (this.a * this.b) / 2; //this represents the object itself (aka triangle.a or triangle.b)
    },
    getHypotenuse: function() { //method
        return Math.sqrt(this.a ** 2 + this.b ** 2); //instead of passing in arguments, we look them up on the object
    }
};

triangle.a = 9;// you can change the value like this!


//constructor functions and new

//make a function that makes triangles, which will have their own a, b and their own methods.
//cleaner easier way: using classes

function RightTriangle(a, b) { //typically capitalize the first letter of constructor functions to indicate a constructor fn
    this.a = a; //this refers to the object we are creating
    this.b = b;
    this.getHypotenuse = function() { 
        return Math.sqrt(this.a ** 2 + this.b ** 2); 
    } //similar to what we have, but it is a FUNCTION!
} //goal: make a repeatable pattern, call this with new and input values, it makes a new object that follows this exact pattern

RightTriangle(3, 4); //no return value, just made a triangle

//new keyword used with stuff like Set() (a function) to create a new set/map, which we can use with constructor functions as well!
const t1 = new RightTriangle(3, 4) //this will set a: 3, b: 4!
const t2 = new RightTriangle(9, 12);

t1.getHypotenuse()//5
t2.getHypotenuse()//15

//compare constructor functions to creating sets!
const s1 = new Set('hello');
const s2 = new Set('123');
s1 //{'h', 'e', 'l', 'o'}
s1.has('h')//true


//prototype intro
//one possible negative for our constructor fn has to do with the methods
//methods on sets are included on the __proto__ property name which references the prototype of the object 
//for ex, the methods on MDN are called Array.prototype.methodName
Set.prototype; //this will list methods that are predefined!
[].__proto__ === Array.prototype; //true 
//above is the actual prototype object on the right.
//on the left is a property on an array that references the prototype object
//prototypes store functionality!

Array.prototype.push = function(val) { //"changing" push method by accessing the array prototype object, which contains all array methods and overwriting the push method
    console.log(`SO YOU WANT TO ADD${val}??`);
    console.log("SORRY, DON'T FEEL LIKE IT!");
}

const nums = [1, 2, 3];
nums.push(9); //SO YOU WANT TO ADD 9?? SORRY, DON'T FEEL LIKE IT!

//this is generally not advisable, except for polyfills!
//anytime theres a newer js method not implemented across all browsers, there is a polyfill section in MDN (string.includes())
//it has code to check if there is no method supported, it defines it for you!

//make the methods so they are the same (not the same function being created with every single object!)
RightTriangle.prototype.getArea = function () {
    return (this.a * this.b) / 2; 
}
tri1.getArea()//6
//this is exactly why we use classes! they allow us to get this same functionality w/o having to define a function and separately adding methods to prototype, it's annoying to have data separately from the functionality
//below, we will group this all together WITHOUT prototype!


//Class Intro
class Triangle { //this creates a class (no parens here! use capital letter to clarify that it is the class we are creating an obj from!) 
 greet(){ //method greet
    console.log('Hello from triangle!!!');
 }
 display(){ //these methods are added to Triangle.prototype to share the method among all the triangles!!
    console.log(`Triangle with sides of ${this.a} and ${this.b}`) //this keyword will refer to the specific instance of triangle
 }
}

const firstTri = new Triangle();//instantiate new triangles (use parens)
firstTri.a = 3;
firstTri.b = 4;
const secondTri = new Triangle(); //a different triangle with the same method!
secondTri.a = 9; 
secondTri.b = 12;//there's a better way to define these!!! See below!


//Adding Constructors
//Common things to do: validate data & assign properties
//how can we write code that will accept input values and add them to the instance -- use CONSTRUCTORS!!! (assigning properties)
class Triangle {
    constructor(a, b, c) { //usually goes at top! this will run as soon as a new instance is created!
        this.a = a; //to assign a to the specific object (new triangle we are making), we set it equal to this.a
        this.b = b; //these values are set as specific properties of the instance
        this.c = c;
    }
    getArea() {
        const { a, b, c} = this;
        const s = ( a + b + c ) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    display() {
        console.log(`I am a triangle with sides ${this.a}, ${this.b}, and ${this.c}.`); //make sure to use this keyword!!!
    }
}

const t3 = new Triangle(5, 6, 7);//now these parameters should be accessible by our code!
t3; //Triangle {a: 5, b: 6, c: 7} //the values are now set as properties to the Triangle Object!

//Validate data
//for ex, checking to make sure the nums passed in are actually valid nums (not negative, not strings, not a boolean)
class Triangle { //same thing with validation!!!
    constructor(a, b, c) {
        for (let side of [a,b,c]){
            if (!Number.isFinite(side) || side <= 0){ //isFinite checks if it is a number, this works for negative numbers as well, so we added the right of the or statement as well
                // return 'NaN' //you don't actually want to return on a constructor, if we try this it will stop execution of the constructor, but will still make a new tri
                throw new Error('SIDES MUST BE POSITIVE NUMBERS');
            } //you can refactor this to include b and c as well... using a loop and side as the argument for if statement
        }
        
        this.a = a; 
        this.b = b; 
        this.c = c;
    }
    getArea() {
        const { a, b, c} = this; //destructuring to prevent repetition of this.a, this.b, this.c so we can instead just type a, b, or c
        const s = ( a + b + c ) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    greet() {
        console.log("HELLO FROM TRIANGLE!!");
    }
    display() {
        return (`I am a triangle with sides ${this.a}, ${this.b}, and ${this.c}.`); //make sure to use this keyword!!!
    }
    isBig() { //returns boolean
        return this.agetArea() > 50;//you must call this.getArea() to access the method within the object
    }
}

//summary
//we saw constructors. when you make a class, we add a constructor we never call it ourself, instead, when we instantiate an object from the class (make a triangle), 
//the constructor is already called and whatever values we pass in are passed into the constructor fn.
//we have access to the values, we can do things like validate them, and MOST IMPORTANTLY: add the values as properties on the instantiated object (this, which refers to the specific instance!)


//adding Methods
//something is called method when it is a fn as a property on an object, and more specifically when we add methods to classes, we refer to them as instance methods
//access the instance using keyword this
t1.getArea(); //6
//above is a method!
//you can also call a method on a method, see lines 232-234


//Extends keyword helps get rid of duplicated methods
//Inheritance & Super
class RightTriangle extends Triangle { //every RightTriangle also has access to methods from Triangle
    constructor(a, b, c) { //get rid of all additional constructor code (repeated code)
        (a ** a + b ** b !== c){ //additional validation to check for right triangle (Pythagoras)
            throw new Error ("invalid Hypotenuse for right triangle");
        }
        super(a, b, c); //this keyword calls the constructor of the "super" class, in this case, the Triangle constructor
        this.hypot = c; //common to add on new properties when you extend a class
        //above adds a specific property specifying c as the hypotenuse of the right tri
        //you have to call super before referencing this to add additional properties!
    }//make sure to pass in constructor arguments so Triangle does not throw an error!
    display() { //this is found first when we call myRightTriangle.display() so this display will run instead of the Triangle display method
        return 'Right ' + super.display();//explicit way to say call display from superclass (Triangle) with some mods (less repetition than line 262)
        return (`Right triangle with sides ${this.a}, ${this.b}, and ${this.c}.`); //make sure to use this keyword!!!
    }//overwriting a Triangle method
} //RightTriangle is a "subclass" of the "superclass", Triangle!