// Задача №1
// Имеется код:
// Почему при вызове с другим параметром значение имени пользователя не изменилось? Как исправить код?

//параметр newFirtsName не определена внутри LE функции и не существует в LE объекта, который ее вызывает (объект 'user'), поэтому будет использоваться значение из Scope объекта 'user' - LE объекта 'window'
//поскольку параметр ф-ции совпадает с именем переменной в объекте Scope, то для корректной работы нужно
//явно определить "конфликтующую" переменную внутри LE функции и передать значение параметра.

//Вариант 1:
var user = {};
var newFirstName = "boris";
var newFirstName2 = "basil";

function setNewName(newFirtsName) {
    var newFirstName = newFirtsName;
    var capitalizedName = newFirstName[0].toUpperCase() +
        newFirstName.substr(1);
    var prettyfiedName = "-=" + capitalizedName + "=-";
    this.name = prettyfiedName;
}

user.setNewName = setNewName;
user.setNewName(newFirstName); // user.name = "-=Boris=-", OK
user.setNewName(newFirstName2); // user.name = "-=Boris=-", ???
console.log(user.name);

//Вариант 2:
/*
var user = {};
var newFirstName = "boris";
var newFirstName2 = "basil";

function setNewName(x) {
    var capitalizedName = x[0].toUpperCase() +
        x.substr(1);
    var prettyfiedName = "-=" + capitalizedName + "=-";
    this.name = prettyfiedName;
}

user.setNewName = setNewName;
user.setNewName(newFirstName); // user.name = "-=Boris=-", OK
user.setNewName(newFirstName2); // user.name = "-=Boris=-", ???
console.log(user.name);
*/

// Задача №2
// Написать функцию-конструктор, все созданные объекты которой равны между собой.

var someObj = {};
var Clone = function () {
    return someObj;
};
var clone1 = new Clone;
var clone2 = new Clone;
console.log(clone1 == clone2); // true

// Задача №3. Спам 2.0

// Написать функцию-конструктор, которая принимает один параметр - время в миллисекундах, и записывает в свойства возвращаемого объекта-спамера. У объекта также есть метод startSpam, которому передается строка для спама. После вызова метода спамер с указанным временным промежутком спамит в консоль.

function Spammer(spamInterval) {
    var spammer = {
        startSpam: function (anyStr) {
            if (this.spam.spam_list.indexOf(anyStr) === -1) {
                this.spam.spam_list.push(anyStr);
            }
            if (this.spam.spam_list.length === 1 || this.spam.TimeIntervalID === undefined) {
                this.spam.TimeIntervalID = setInterval(function go(t) {
                    var log_info = '';
                    // var date = new Date();
                    // log_info = " //" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    console.log(t, log_info);
                }, this.spamInt, this.spam.spam_list.join('\n'));
            }
        },
        stopSpam: function (anyStr) {
            if (anyStr === undefined || anyStr === '') {
                // stop All the spam stings
                clearInterval(this.spam.TimeIntervalID);
                this.spam.TimeIntervalID = undefined;
            } else {
                var isInSpamList = this.spam.spam_list.indexOf(anyStr);
                if (isInSpamList !== -1) {
                    this.spam.spam_list.splice(isInSpamList, 1);
                    if (this.spam.spam_list.length === 0) {
                        clearInterval(this.spam.TimeIntervalID);
                        this.spam.TimeIntervalID = undefined;
                    }
                }
            }
        },
        spam: {spam_list: [], TimeIntervalID: undefined}
    };

    if (!isNaN(parseFloat(spamInterval))) {
        spammer.spamInt = spamInterval;
        return spammer;
    }
}

var spammer1 = new Spammer(1000);
spammer1.startSpam('first');
var spammer2 = new Spammer(2000);
spammer2.startSpam('second');
spammer1.stopSpam();
spammer2.stopSpam();

// Задача №4

// Написать функцию-конструктор, которая принимает три параметра: тип домашнего животного, кличку (строки) и год рождения (целое). У созданного объекта:
//  нельзя изменить тип и год рождения
//  год рождения не отображается при переборе через for-in
//  свойство info отображает строку вида "ТИП КЛИЧКА: ВОЗРАСТ лет"

var Pet = function (petType, nickName, birthYear) {
    var mdate = new Date();
    var Pet = {};
    Object.defineProperty(Pet, "type", {
        value: petType,
        configurable: false,
        writable: false,
        enumerable: true
    });
    Pet.name = nickName;
    Object.defineProperty(Pet, "birthYear", {
        value: birthYear,
        configurable: false,
        writable: false,
        enumerable: false
    });
    Object.defineProperty(Pet, "info", {
        get: function () {
            return this.type + " " + this.name + ": " + (mdate.getFullYear() - this.birthYear) + " years";
        }
    });
    return Pet;
};

var myPet = new Pet("cat", "Barsik", 2015);
for (var key in myPet) {
    console.log(key);
} // type, name
myPet.type = "dog";
myPet.name = "Murzik";
myPet.birthYear = 2017;
console.log(myPet.info); // "cat Murzik: 2 years"

// Задача №5

// Написать функцию-конструктор, которая принимает параметр год и записывает его в свойство объекта. У созданного объекта:
//   при работе как со строкой выводится дополнительная информация, високосный год или нет
//   при работе как с числом выводится только значение года
var Years = function (year) {
    var Years = {};
    Years.year = year;
    Years.toString = function () {
        var leapYear = "не ";
        //определяем високосный ли год:
        if (!(year % 4) && ((year % 100) || !(year % 400))) {
            leapYear = "";
        }
        return this.year + ", " + leapYear + "високосный";
    };
    Years.valueOf = function () {
        return this.year;
    };
    return Years;
};
var year = new Years(2017);
alert(year); // "2017, не високосный"
// 2017 - year // 0
