// Задача №1. Объединение объектов

// Написать функцию, которая на вход будет принимать два объекта и будет возвращать результирующий объект со всеми свойствами входящих объектов. Если есть одинаковые свойства в обоих объектах, то берется значение из второго. Значения всех свойств - примитивы.

function objectCopy(a, b) {
    var aggrObj = {};
    for (var property in a) {
        aggrObj[property] = a[property];
    }
    for (property in b) {
        aggrObj[property] = b[property];
    }
    return aggrObj;
}

var user1 = {
    name: "Mike",
    "full address": "Shevchenko street, b. 32, ap. 911",
    medal: "gold",
    sing: function () {
        alert("We are the champions, my friends!");
    }
};

var user2 = {
    name: "Con",
    address: "Dnipro, P.O. Box 1121, 49017",
    result: 15,
    sing: 47887.75,
    when: new Date()
};

console.log("Задача №1\n", objectCopy(user1, user2));

// Задача №2. Самые старые

// Имеется информация о спортсменах в виде массива объектов с полями "имя" и "возраст" ([{name:"Yan", age: 33}, ...]). Написать функцию, которая вернет имена N самых старых спортсменов.

var sportsmen = [
    {name: "Yan", age: 33.6},
    {name: "Mike", age: 40},
    {name: "Alex", age: 23},
    {name: "Daniel", age: 28},
    {name: "Hugo", age: 44}
];

function topOldest(menlist, limit) {
    menlist.sort(function s(a, b) {
        return b.age - a.age;
    });
    var names = [];
    for (var i = 0; i < limit; i++) {
        names[i] = menlist[i].name;
    }
    return names;
}

console.log("Задача №2:\n", topOldest(sportsmen, 3));

// Задача №3. Награждение

// Есть данные о спортсменах, информация о каждом спортсмене хранится в своей переменной типа "объект". Необходимо написать функцию, которая будет принимать 3 параметра: спортсмена, тип медали (строка) и количество медалей (целое положительное число). При запуске этой функции у спорстмена должно увеличиться количество медалей указанного типа на заданное число. Информация о типе и количестве медалей хранится в свойствах внутреннего объекта medals объекта спортсмена. Следует учесть, что в у спортсмена до запуска функции может не быть медалей заданного типа или не быть медалей вообще. Примерный результирующий вывод в консоль приведен ниже:
/*
>runner.medals
undefined
>give(runner, 'gold', 1);
>runner.medals
{gold:1}
>give(runner, 'gold', 2);
>runner.medals
{gold:3}
*/

function give(sportsman, medal_type, medal_qty) {
    if (!("medals" in sportsman) || (sportsman.medals === undefined)) {
        sportsman.medals = {};
        sportsman.medals[medal_type] = medal_qty;
    } else if (medal_type in sportsman.medals) {
        sportsman.medals[medal_type] += medal_qty;
    } else {
        sportsman.medals[medal_type] = medal_qty;
    }
    return sportsman;
}

var runner = {
    name: "Con",
    age: 43
};
console.log("Задача №3:\n");
console.log(give(runner, 'bronze', 1));
console.log(give(runner, 'gold', 2));
console.log(give(runner, 'bronze', 1));

// Задача №4. Спамер консоли

// Создать объект spammer с двумя методами startSpam и stopSpam. При передаче методу startSpam некой строки он каждую секунду выводит в консоль (console.log) эту строку. При повторном запуске с другой строкой первая строка продолжает выводиться, а новая строка выводится отдельным console.log. Запуск метода stopSpam с параметром в виде строки находит эту строку среди выводимых в консоль и останавливает "спам" этой строки. Примерный результирующий вывод в консоль с расшифровкой по времени приведен ниже:
/*
>spammer.startSpam('first');
first // 00:00:01
first // 00:00:02
>spammer.startSpam('second');
first // 00:00:03
second // 00:00:03
first // 00:00:04
second // 00:00:04
>spammer.stopSpam('first');
second // 00:00:05
second // 00:00:06
*/

var spammer = {
    startSpam: function(anyStr) {
        if (this.spam.spam_list.indexOf(anyStr) === -1) {
            this.spam.spam_list.push(anyStr);
        }
        if (this.spam.spam_list.length === 1 || this.spam.TimeIntervalID === 0) {
            this.spam.TimeIntervalID = setInterval(function go() {
                var log_info = '';
                // var date = new Date();
                // log_info = " //" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                console.log(spammer.spam.spam_list.join('\n'), log_info);
            }, 1000);
        }
    },
    stopSpam: function(anyStr) {
        if (anyStr === undefined || anyStr === '') {
            // stop All the spam stings
            clearInterval(this.spam.TimeIntervalID);
            this.spam.TimeIntervalID = 0;
        } else {
            var isInSpamList = this.spam.spam_list.indexOf(anyStr);
            if (isInSpamList !== -1) {
                this.spam.spam_list.splice(isInSpamList, 1);
                if (this.spam.spam_list.length === 0) {
                    clearInterval(this.spam.TimeIntervalID);
                    this.spam.TimeIntervalID = 0;
                }
            }
        }
    },
    spam: { spam_list: [], TimeIntervalID: 0 }
};

spammer.startSpam('first');
spammer.startSpam('second');
spammer.stopSpam('first');
spammer.stopSpam();


// Задача №5. Улучшатор текста

// Написать функцию, которая на вход будет принимать тектовую строку и будет возвращать "улучшенный" текст: буквы должны комбинировать регистр в произвольном порядке, а после каждого слова должен быть один из смайлов: :) ;) (: :p :D :-*. Строка на входе содержит только буквы русского алфавита и некоторые знаки препинания (. , ? ! ;). Примерный результирующий вывод в консоль приведен ниже:
//>beautify("Всем привет, как дела?");
//ВСеМ(: пРивЕт:D, КаК;) ДеЛа(:?

function beautify(someText) {
    var tmpText = '';
    var smiles = [':)', ';)', '(:', ':p', ':D', ':-*'];
    var s_smiles = smiles.length;
    var delimiter = ['.', ',', '?', '!', ';', ' '];
    var child_delimeters_cnt = false;
    for (var i = 0; i < someText.length; i++) {
        if (delimiter.indexOf(someText[i]) !== -1 && !child_delimeters_cnt) {
            tmpText += smiles[Math.max(0, (Math.random() * s_smiles).toFixed() - 1)] + someText[i];
            child_delimeters_cnt = true;
        } else {
            tmpText += (Math.random() <= 0.5) ? someText[i].toUpperCase() : someText[i].toLowerCase();
            child_delimeters_cnt = false;
        }
    }
    return tmpText;
}

beautify("Всем привет, как дела?");

// Задача №6. Только брутфорс

// Имеется зашифрованный пароль (например, "YTFiMmMz") и известна функция шифрования btoa. Извесно, что пароль имеет длину от 1 до 6 символов и состоит из цифр и букв a, b, c и не начинается с нуля. Написать функцию, которая с помощью последовательного перебора найдет пароль. Функцию btoa() считаем "необратимой", т.е. использовать atob() нельзя.

var password = "YTFiMmMz";

function bruteForce(psswrd) {
    var maxlen = 6, max_iter = 0;
    var keys = '1234567890abc';
    var encodedVariant;
    var success = false;

    var keys_lng = keys.length;
    for (var i = 1; i <= maxlen; i++) {
        max_iter += Math.pow(keys_lng, i);
    }
    i = 0;
    do {
        i++;
        encodedVariant = i.toString(keys_lng);
        if (btoa(encodedVariant) === psswrd) {
            success = true;
        }
    } while (i <= max_iter && !success);
    console.log("Решение найдено на шаге: " + i);
    return (success) ? encodedVariant : false;
}

console.log(bruteForce(password));
