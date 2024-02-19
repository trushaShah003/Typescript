// --------------------Section 2------------------

// **************** CORE TYPES *******************

// -***numbers*** , strings and  boolean simply write ": <type>" after the variable.

// -***array*** , write ": string[]" for array of string
// 	": (string | number)[]" for an array that can contain numbers or strings
// 	": any[]" for an array of any type of data

// -***objects***,
// 	you can add " : object" identifier
// 	or you can also define an object of types like " : { name: string , age:number }"

// -*** TUPLE ***
// 	tuple can be understood as a specific array. if we want an array that as specific values at specific place we can define a tuple
// for that, we can add type specifier as ": [<type>, <type>]"
// eg. for a tuple like role: [2, 'hello'] type would be ": [number , string]"

// -*** ENUM ***
// 	enum is a new type introduced in typescript. It is used to label certain values to a label name.
// for eg. if we have a property of role where we have to identify a value to the role like " role: [ 0 , 'admin'] "
// and we ave multiple roles like these we can instead use an enum.

// enum Role* {ADMIN, USER, AUTHOR};**

// *It is a convention to write new data types with the first letter as upper case
// **many people specify values in enum in all caps but it is not necessory

// Here, Role will assign admin with value 0, user with value 1 and author with value 2
// this values are default values - by default it starts with the 0
// if we want we can specify custom values by adding " = <value> " at the end of label
// values of enum can be numbers or strings or both at the same time

// -***ANY***
// 	ths type simply ignores every advancement of typescript and work the code as if it would work in vanilla JS

// --------------------------------------------------------------------------------------------------------------------------

// ********** OTHER TYPES **********

// -***UNION***
// 	this type works like a or statement but for types
// for eg.  - ": number | string " would mean that the variable can either store numbers or strings
// you can add however many | as needed

// -***LITERAL***
// 	this is an exception in union or any other types where we can specify literal values
// for eg. - instead of ": string" we can ": 'as-text' | 'as-number' "
// 		this will only accept these two values that we specified

// -***TYPE-ALIAS***
// 	this helps us make a custom type
// ---syntax:  "  type <Name*> = <custom_type>  "
// *It is a convention to write new data types with the first letter as upper case

// ---eg. : "  type Combineable = number | string  " so now we can use Combineable insted of number|string
// 		or we can use the literal type and define it as a new custom type as well

// -***VOID***
// 	this type is defined when a function does not return anything (does not have a return statement or a null return)
// ---- Here, the typeof this function will return undefined but its type is not undefined(which is alsoa type in typescript)
// ---- you CANNOT use undefined type for functions that does not have a return statement , BUT you can use it for function having a null return statement
// ---- this is because undefined can only be applied to variable or function that returns something-- that it can count in undefined

// -***FUNCTION***
// 	this is a function type and can be used in multiple ways
// ---syntax: " : Function " -- this means any function can be assigned
// 	   " : () => <type> " -- this means functions with no arguments and that returns the <type> of output will be acceptable
// 	   " : (<name1> : <type1>, <name2> : <type2>) => <type3> "
// 			-- this means that a function with 2 arguments both of <type1> and <type2> that returns a value of <type3> is acceptable

// -***CALLBACK_FUNCTION***
// 	a call back function ype will have the same syntax as the function type but it will be nested in the function
// ---syntax-eg : "  : (n1:number, n2: number, cb: (result: number) => void )  "

// -***UNKNOWN***
// 	this migth seem similar to any type but it is not. It DOES allows to add any type of data to the variable
// ---BUT when we assign this unknown type variable to any other variable having a specific type then it will flash warning error . and we will have to check wether the unknown varible has now that specific data type or not

// -***NEVER***
// 	it simple implies that that variable/function never returns anything
// 	it does not make much of a difference then the void type but it is easy to understand the code
// 	it can be used for function that throws an error
// 		this type of function is not a simple no return value function because not only does it not return anything but it also terminates the whole execution when throwing an error

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------- Section - 6 : Advanced Types ----------------------

// -***INTERSECTION***
// 		intersection type '&' is opposite of union type. It takes all the different types mentioned .
// 	for eg. -  ***for OBJECTS***
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

// now this can also be achieved by interface , but
// using type for this sort of example can also do this

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

///////////////////////////////////////////////////////////////////////////
//////////   TYPE GUARDS   //////////////

// we can use different type guards in multiple ways for multiple types
// 1) using typeof

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// 2) using in --specifically for objects

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

// 3) using instanceof -- specifically for classes

printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

/////////////////////////////////////////////////////////////////////////
//////////////// TYPE CASTING ///////////////////////

// type casting can be used when we want to assign a type to an element which generally does not get recognized by typescript
//type casting can be done in two ways (it has two syntax)

// 1)
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// 2)
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// also it is not necessary in the second syntax to add ! at the end --- as it is established by the type casting that the this element does indeed exists

const userInputElement = document.getElementById("user-input");

if (userInputElement) {
  //we can also type cast here
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

///////////////////////////////////////////////////////////////////////////////////////
//////////////// DISCRIMINATED UNIONS ////////////////////////////

// while using the type gaurds using 'in' method can lead to bugs in the future
// and in the example below we have interfaces for which we cannot use the instanceof method
// in such cases discriminated union can be usefull
// here we assign a special type property to each instance that we can later use for type guarding

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

///////////////////////////////////////////////////////////////////////////////////////
////////// INDEX PROPERTIES  ///////////////

// if we want to be able to implement a functionality which in turn can work differently for different elements we can use index property

// exapmle

//here we want to be able to display error according to which input element has the invalid value
interface ErrorContainer {
  // { email: 'Not a valid email', username: 'Must start with a character!' }

  // this syntax allows us to add any property with the types defined in this syntax
  //we can also add generic properties above rigth now, but ofcourse it has to be same as the syntax

  [
    prop: string /*here the property can be of any type that can be interpreted as a string even if it is not a string itself */
  ]: string /*but the value must be a string */;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

/////////////////////////////////////////////////////////////////////////
/////// FUNCTION OVERLOADING /////////////

// function overloading can be used to specify a output type when we have multiple possible scenarios

function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: string, b: number): string;
function add2(a: number, b: string): string;
function add2(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add2("Max", " Schwarz");

// without function overloading typescript will render an error while compiling the next line -- even if we know that the result will be of type string
result.split(" ");

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////       SECTION - 7      ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

///////// GENERIC TYPES  ///////////////

// generic types are those who in itself is a type but it also needs to have a type that will of the output or the value of its instances

// for ex.-- Array is a class in the JS
// but in typescript we cannot just use the normal syntax Array has in JS
// const name: Array = []
// because Array in typescript is a generic type

const names: Array<string> = []; // same as writing -- string[]
// names[0].split(' ');
//heere it specifies that this array need to have string values

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});
// here it defines that the value this promise returns will be of type number

promise.then((data) => {
  // data.split(' ');
});

/////////////////////////////////////////////////////////////////////////////////
///// GENERIC FUNCTIONS /////

//lets understand the need of generic function wiith the examle

// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
// console.log(mergedObj);

// if we have a functon like above it is going to work just fine until...
// console.log(mergedObj.age);
//this will not work for the case above because although typescript does identify the instance as an object , -- it does not specifically understand that it has the age property or not

// for such cases we can use generic types instead of object

// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
// console.log(mergedObj);

// here we can call for the age property of the instance because now instead of an unknown object the result of the function will be of type T&U -- which can be anything

// note that the generic types T and U are made up by us that will auto identify by the value we input in the function

////////////////////////////////////////////////////////////////////
/// CONSTRAINTS ///

// in the example above we can add arguments of any types with that implementation
//which is not good because we then have to apple object.assign which will not work for any arguments other then an object

// for this we can apply contraints to the types--- so that we can flexibly add any argument but also ensure that whatever argument that we pass must be of type object

function mergeC<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObjC = mergeC({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObjC);

//////////////////////
/// ANOTHER EXAMPLE OF A GENERIC FUNCTION

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

///////////////////////////////////////////////////////////////////////////////////////
////// KEYOF CONSTRAINT //////

// the keyof constraint simply means that it must be a property of the pointed object

// EXAMPLE

// here using keyof will ensure that whatever value we pass into the function must be a property of the object that we passed earlier

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

/////////////////////////////////////////////////////////////////////////
/// GENERIC CLASSES ///

// just like functions we can also apply geenric type to a class
// this will ensure that the performance is as accurate as it can be -- because we have specified addition info while creating the class

//EXAMPLE

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// here using generic types can make the class flexible yet assertive

//PROBLEM

// we can not use primitive types like objects or arrays as easily here as non - primitive datat types
// using them might lead us to bugs or silent errors

// that is why it is advised to specify all non-primitive types at front and to not use any primitive types for the same

//how not to use :-
// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

////////////////////////////////////////////////////////////////////
////  Decoraters  //////
