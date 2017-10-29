// Задача №1

// Написать функцию-конструктор для объекта-бегуна. Написать статический метод для награждения бегуна. При каждом награждении описание медали добавляется в статическую переменную класса, а id медали сохраняется в массиве medals объекта. При награждении медалью, которой нет в статической переменной, она создается и ей назначается id.

var Runner = function () {
    this.medals = [];
};
Runner.description = [];
Runner.giveMedal = function (obj, medalDescription) {
    if (Runner.description.indexOf(medalDescription) === -1) {
        Runner.description.push(medalDescription);
    }
    var l = Runner.description.indexOf(medalDescription);
    obj.medals.push(l + 1);
};

var runner1 = new Runner;
var runner2 = new Runner;
Runner.giveMedal(runner1, 'Gold, 1000 m');
Runner.giveMedal(runner1, 'Silver, 500 m');
Runner.giveMedal(runner1, 'Bronze, 100 m');
console.log(runner1.medals); // 1,2
Runner.giveMedal(runner2, 'Silver, 500 m');
console.log(runner2.medals); // 2

// Задача №2

// Написать функцию-конструктор Car, создающую объект-автомобиль заданной марки с 4 колесами. Добавить фабричные методы для добавления трёх- и восьмиколесных автомобилей.

var Car = function (brand) {
    this.brand = brand;
    this.wheels = 4;
};
Car.three_wheels = function (brand) {
    var res = new Car(brand);
    res.wheels = 3;
    return res;
};
Car.eight_wheels = function (brand) {
    var res = new Car(brand);
    res.wheels = 8;
    return res;
};
var car1 = new Car("Honda");
console.log(car1);
var car2 = new Car.three_wheels("Hitachi");
console.log(car2);
var car3 = new Car.eight_wheels("Mega-Track");
console.log(car3);

// Задача №3

// Написать функцию-конструктор, которая создает объект-бегуна с полями "имя" и "медали". Написать ещё одну функцию-конструктор, создающую объект-игрока в лотерею с полями "количество купленных билетов", "количество выигранных денег". Добавить игроку метод для выдачи ему денежного приза. Использовать данный метод для выдачи денежного приза бегуну, используя call.

var Runner2 = function (name) {
    this.name = name;
    this.prize = 0;     // медали
};
var Gamer = function (tickets) {
    this.tickets_bought = tickets;    // количество купленных билетов
    this.prize = 0;             // количество выигранных денег
    this.givePrize = function (amount) {
        this.prize = amount;
    };
};

gamer1 = new Gamer(4);
gamer1.givePrize(12);
console.log(gamer1);
runner = new Runner2('Mike');
gamer1.givePrize.call(runner, 150);
console.log(runner);

// Задача №4

// Создать псевдо-массив Arr длинной 5, заполенный произвольными целыми числами от 10 до 99, и методом sort, сортирующим Arr по возрастанию остатков от деления на 10 его элеметов. С помощью одалживания метода sort отсортировать элементы по убыванию. Одалживать метод под тем же именем и на время одалживания сохранить имеющийся метод. После сортировки вернуть sort сохраненный метод.

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

var Arr = {
    0: randomInteger(10, 99),
    1: randomInteger(10, 99),
    2: randomInteger(10, 99),
    3: randomInteger(10, 99),
    4: randomInteger(10, 99),
    length: 5,
    sort: function () {
        return [].sort.call(this, function (a, b) {
            return (a % 10) - (b % 10);
        })
    }
};
console.log("1. Первоначальный массив Arr: ", Arr);
console.log("2. Массив отсортирован по возрастанию остатков от деления на 10 его элеметов: ", Arr.sort());
var arr_sort_func = Arr.sort;   // сохраняем стандартный метод псевдо-массива
Arr.sort = [].sort;         //одалживаем метод sort() у Array.prototype
Arr.sort(function (a, b) {
    return b - a;
});
console.log("3. Массив отсортирован по убыванию элеметов: ", Arr);
Arr.sort = arr_sort_func;  //   возвращаем в sort сохраненный ранее метод

// Задача №5

// Добавить декоратор для метода Math.max, который, в случае, если какие-то из элементов - строки, заменял их на длину этих строк; если какие-то из элементов объекты - возвращает первое найденное числовое свойство или 0.

var decorator = function (f) {
    return function () {
        // alert(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
            if (typeof(arguments[i]) === 'string') {
                arguments[i] = arguments[i].length;
            }
            if (typeof(arguments[i]) === 'object') {
                var firstObjNumber = 0;
                for (var property in arguments[i]) {
                    if (typeof(arguments[i][property]) === 'number') {
                        firstObjNumber = arguments[i][property];
                    }
                    if (firstObjNumber) {
                        break;
                    }
                }
                arguments[i] = firstObjNumber;
            }
        }
        var result = f.apply(this, arguments);
        return result;
    }
};
Math.max = decorator(Math.max);
Math.max(1, 2, 'abc', {a: 2, b: 4}); // 3;