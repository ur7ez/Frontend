// Основы ECMAScript 6
"use strict";

// Задача №1
// Есть объект, имеющий два произвольных свойства. Написать код, меняющий значения свойств местами. Использовать деструктуризацию.

let someObj = {
    item1: "cap",
    item2: "t-shirt"
};
// вариант 1:
([someObj.item2, someObj.item1] = Object.values(someObj));

// вариант 2:
let {item2: item1, item1: item2} = someObj;
someObj = {item1, item2};

// Задача №2
// Написать стрелочную функцию - аналог Object.assign | Object.assign(target, src1, src2...)

let myObjectAssign = (target, ...rest) => {
    for (let val in rest) {
        for (let prop in rest[val]) {
            target[prop] = rest[val][prop];
        }
    }
    return target;
};
let user = {name: "Вася"};
let visitor = {isAdmin: false, visits: true};
let admin = {isAdmin: true};

// user <- visitor <- admin
myObjectAssign(user, visitor, admin);

// Задача №3
// Написать функцию для вывода содержимого корзины. Функция принимает два параметра: цену за единицу товара и количество товаров, и возвращает её в виде строки "В корзине 2 товара на сумму 3 грн." или "В корзине нет товаров". Использовать значение по умолчанию и строковые шаблоны.

function showBusket(price = undefined, quantity = 0) {
    let goodsSpelling = 'товаров';
    if (quantity > 0) {
        let lastDigit = +quantity.toString().substr(-1, 1);
        let lastDecimal = +quantity.toString().substr(-2, 2);
        if (lastDigit === 1 && lastDecimal !== 11) {
            goodsSpelling = 'товар';
        }
        if (lastDigit >= 2 && lastDigit <= 4 && (lastDecimal < 10 || lastDecimal > 21)) {
            goodsSpelling = 'товара';
        }
    }

    return (!quantity || !price) ? `В корзине нет товаров` : `В корзине ${quantity} ${goodsSpelling} на сумму ${(price * quantity).toFixed(2)} грн.`;
}

console.log(showBusket(3, 2));
console.log(showBusket());