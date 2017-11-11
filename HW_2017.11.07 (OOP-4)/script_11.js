// Задача №1

// Создать объект pet со свойствами name и age и методами walk и sleep. Создать классы Cat и Dog с собственными свойствами furType и tailLength и с методами bark и meow соответственно. Использовать прототипное наследование.

var pet = {
    name: "Doggy",
    age: 10,
    walk: function () {
        console.log('I am walking...');
    },
    sleep: function () {
        console.log('I am sleeping...');
    }
};

function Cat(furType, tailLength) {
    this.furType = furType;
    this.tailLength = tailLength;
}

Cat.prototype = pet;
Cat.prototype.meow = function () {
    alert('Mmmeeeooow ...');
};

function Dog(furType, tailLength) {
    this.furType = furType;
    this.tailLength = tailLength;
}

Dog.prototype = pet;
Dog.prototype.bark = function () {
    alert('Wwooff - Wwooff !!!');
};

// проверка:
var myCat = new Cat('гладко-шерстный', 20);
// myCat.name = "catty";
console.log('myCat: ');
console.dir(myCat);
console.log('name: ' + myCat.name + '; age: ' + myCat.age);
myCat.walk();
myCat.sleep();
myCat.meow();

var myDog = new Dog('длинно-шерстный', 15);
console.log('myDog: ');
console.dir(myDog);
console.log('name: ' + myDog.name + '; age: ' + myDog.age);
myDog.walk();
myDog.sleep();
myDog.bark();

// Задача №2

// Дана функция-конструктор цыпленка. Перепишите конструктор для добавления методов в прототипном стиле.

var Chicken = function (name, sex) {
    this.name = name;
    this.getSex = function () {
        return sex;
    };
};
myChicken = new Chicken("Tsypa", 'male');

if (myChicken.getSex() === "male") {
    Chicken.prototype.crow = function () {
        alert("Cock-A-Doodle-Doo!");
    };
} else {
    Chicken.prototype.produceEgg = function () {
        var egg = {type: null};
        return egg;
    };
}
// проверка:
if ("crow" in myChicken) {
    myChicken.crow();
} else {
    myChicken.produceEgg();
}
