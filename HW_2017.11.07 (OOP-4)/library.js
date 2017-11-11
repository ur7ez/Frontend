// Задача №3

// Написать библиотеку library.js, которая добавляет методы:

// для массивов:
//      even(callback) - вызывает callback для всех четных элементов массива
//      odd(callback) - вызывает callback для всех нечетных элементов массива
//      shuffle - возвращает перемешаный массив
// для строк:
//      intrim - удаляет пробелы в начале и конце строки, удаляет повторяющиеся пробелы в середине строки
//      reverse - переворачивает строку наоборот
//      isPalindrome - проверяет, является ли строка палиндромом. Использует reverse внутри себя

var arr = [1, 2, 3, 4];

var str = ' d sdsdk o ok  kas   pkas p  ';

Array.prototype.even = function (callback) {
    for (var i = 1; i < this.length; i += 2) {
        callback(this[i], i, this);
    }
};

Array.prototype.odd = function (callback) {
    for (var i = 0; i < this.length; i += 2) {
        callback(this[i], i, this);
    }
};

Array.prototype.shuffle = function () {
    var h, rnd;
    for (var i = this.length - 1; i > 0; i--) {
        rnd = Math.round(-0.5 + Math.random() * i);
        h = this[i];
        this[i] = this[rnd];
        this[rnd] = h;
    }
    return this;
};

String.prototype.intrim = function () {
    // удаляет пробелы в начале и конце строки, удаляет повторяющиеся пробелы в середине строки
    var s = this.trim();
    return s.replace(/([\s+]{1,})/g, ' ');
};


String.prototype.reverse = function () {
    //переворачивает строку наоборот
    return str.split('').reverse().join('');
};

String.prototype.isPalindrome = function () {
    //проверяет, является ли строка палиндромом. Использует reverse внутри себя
    return (this.reverse() === '' + this);
};

/*
arr.even(function () {
    var params = [].join.call(arguments, ' : ');
    console.log(params);
});
*/

/*
arr.odd(function () {
    console.log(arguments[0]);
});
*/

// arr.shuffle();
// str.intrim();
// str.reverse();
// str.isPalindrome();