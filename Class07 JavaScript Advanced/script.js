// function Vehicle(id, name, batchNo, price) {
//     this.id = id;
//     this.name = name;
//     this.batchNo = batchNo;
//     this.price = price;
//     this.company = 'move.inc';

//     this.printVehice = function () {
//         console.log(`${this.id}.${this.name}, ${this.batchNo}, ${this.price}`)
//     }
// }

// let vehicle = new Vehicle(10, 'Lada', '123AX0', 1222);
// let wheeledVehicle = Object.create(new Vehicle(12, 'Yugo', '25B', 500));
// console.log(wheeledVehicle);
// console.log(vehicle);

// wheeledVehicle.drive = function () { console.log('WROOOM!'); }
// let car = Object.create(wheeledVehicle);
// car.fuelTank = 32;

// car.drive();
// console.log(car);


// let wheeledVehicle2 = {};
// wheeledVehicle2.__proto__ = new Vehicle(12, 'Koral 45', '25A', 600);
// console.log(wheeledVehicle2);
// wheeledVehicle.name = 'Maruti';

// console.log(wheeledVehicle.__proto__.name);
// console.log(wheeledVehicle.name);

// function Vehicle(id, name, batchNo, price) {
//     this.id = id;
//     this.name = name;
//     this.batchNo = batchNo;
//     this.price = price;
//     this.company = 'move.inc';

//     this.printVehice = function () {
//         console.log(`${this.id}.${this.name}, ${this.batchNo}, ${this.price}`)
//     }
// }

// function WheeledVehlice(wheels, name) {
//     this.wheels = wheels;
//     this.name = name;
//     this.drive = function () {
//         console.log(`Driving on ${this.wheels} wheels`);
//     }
// }

// WheeledVehlice.prototype = Object.create(new Vehicle());

// let car = new WheeledVehlice(4, 'Yugo');
// car.price = 200;
// car.id = 2;
// car.batchNo = '123AX';

// car.printVehice();
// console.log(car);

// WheeledVehlice.prototype.stop = function () {
//     console.log(`The vehicle ${this.name} stopped.`);
// }

// car.stop();
// car.__proto__.stop();


function Vehicle(id, name, batchNo, price) {
    this.id = id;
    this.name = name;
    this.batchNo = batchNo;
    this.price = price;
    this.company = 'move.inc';

    this.printVehice = function () {
        console.log(`${this.id}.${this.name}, ${this.batchNo}, ${this.price}`)
    }
}

function WheeledVehlice(id, name, batch, price, wheels) {
    // this.__proto__ = new Vehicle(id, name, batch, price);
    Object.setPrototypeOf(this, new Vehicle(id, name, batch, price));
    this.wheels = wheels
    this.drive = function () {
        console.log(`Driving on ${this.wheels} wheels`);
    }
}

let someWheeledVehicle = new WheeledVehlice(1, 'Yugo', 'b23', 700, 4);
console.log(someWheeledVehicle);
console.log(someWheeledVehicle.name);
someWheeledVehicle.drive();
someWheeledVehicle.printVehice()

// How it works:
// 1. new WheeledVehicle
// 2. WheeledVehicle constructor funcions is called
// 3. setPrototypeOf a new Vehicle object is created
// 4. the values are passed to the new Vehicle() constructor function
// 5. Vehicle constructor function is called
// 6. Vehicle object is built from Vehicle constructor function
// 7. The returned vehicle object is set as prototype of the current object that is created
// 8. The current object (WheeledVehicle) is created
// 9. WheeledVehicle object is returned from the new WheeledVehicle and stored in our Vehicle object

function Car(id, name, price, batch, doors, fuelCapacity) {
    Object.setPrototypeOf(this, new WheeledVehlice(id, name, price, batch, 4));

    this.doors = doors;
    this.fuelCapacity = fuelCapacity;
    this.drift = function () {
        console.log(`The ${this.name} is drifting!`);
    }
}

let someCar = new Car(99, 'BMW', 120_000, 'a1', 4, 100);
console.log(someCar);

function FloatingVehicles(id, name, batch, price, hasEngine, seats) {
    Object.setPrototypeOf(this, new Vehicle(id, name, batch, price));
    this.hasEngine = hasEngine;
    this.seats = seats;
    this.honk = function () {
        console.log('Honk!');
    }
}

function Kajce(id, name, batch, price, hasEngine, hasPlatno) {
    Object.setPrototypeOf(this, new FloatingVehicles(id, name, batch, price));
    // some code
    this.hasPlatno = false;
}