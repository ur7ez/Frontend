// Основы ECMAScript 6
"use strict";

// Задача №1
// Есть объект, имеющий два произвольных свойства. Написать код, меняющий значения свойств местами. Использовать деструктуризацию.

let someObj = {
    item1: "cap",
    item2: "t-shirt"
};
([someObj.item2, someObj.item1] = Object.values(someObj));

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
    return (!quantity || !price) ? `В корзине нет товаров` : `В корзине ${quantity} товара на сумму ${price} грн.`;
}

console.log(showBusket(3, 2));
console.log(showBusket());