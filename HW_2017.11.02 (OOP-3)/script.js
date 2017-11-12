// source: https://br3t.github.io/fstk/lesson/javascript_7/index.html

// Задача №1

// Описать класс Tank, удовлетворяющий следующим требованиям:

//     у tank есть вход для его добавления воды из водопровода и два выхода для перелива воды в другие емкости
// при создании tank задается его ёмкость (л) и скорость наполнения водой при подключении к водопроводу (л/с)
// есть возможность подключать/отключать tank от водопровода
// есть возможность подлючать/отключать потребителей к первому и второму выходам tank
// нельзя подключить потребителя к выходу, если к нему уже подключен другой потребитель
// при подключении потребителя нужно указывать его скорость потребления воды (л/с)
// каждую секунду tank обновляет информацию о себе в консоли в виде ". . . 80%", где первые три символа, разделенных пробелами, обозначают подключение к водопроводу, к первому и ко второму выходам соответственно ("." - не подключено, "@" - поключено), примерный лог может иметь вид:

//     . . . 80%
// // подключили tank к водопроводу, что долить воды
// @ . . 81%
// @ . . 82%
// @ . . 83%
// // подключили потребителя к первому входу tank
// @ @ . 84.5%
// @ @ . 85%
// @ @ . 85.5%
// // подключили потребителя ко второму входу tank
// @ @ @ 85.75%
// @ @ @ 86%
// @ @ @ 86.25%
// // отключили tank от водопровода
// . @ @ 85.5%
// . @ @ 84.75%
// . @ @ 84%

// при обновлении информации tank предварительно очищает консоль с помощью console.clear()
// tank нельзя наполнить больше, чем на 100%, и нельзя опустошить ниже 0%
// Реализовать внешний и внутренний интерфейсы.

function Tank(_capacity, _waterFillingRate) {
    var capacity = _capacity;  // ёмкость (л)
    var waterFillingRate = _waterFillingRate;  // скорость наполнения водой при подключении к водопроводу (л/с)
    var tankCurFill = 0;  // текущая заполненность tank (л)
    var output1_curFil;  // текущая заполненность потребителя1 (л)
    var output2_curFil;  // текущая заполненность потребителя2 (л)
    var isPlumbed = false;  // статус подключения к водопроводу (вход)
    var output1 = null;  // инфо о подключенном пользователе к выходу1
    var output2 = null;  // инфо о подключенном пользователе к выходу2

    this.timeInt = 1000;
    var info = '. . .';
    var log_info = '';

    this.togglePlumbState = function () {
        isPlumbed = !isPlumbed;
        if (isPlumbed) {
            log_info = (tankCurFill) ? "подключили tank к водопроводу, чтобы долить воды" : "подключили tank к водопроводу, чтобы наполнить водой";
        } else {
            log_info = "отключили tank от водопровода";
        }
    };

    //при подключении потребителя нужно указывать его скорость потребления воды (л/с)
    this.toOutput = function (userWaterFillingRate, outputNumber) {
        if (output1 === null && (outputNumber === undefined || outputNumber === 1)) {
            output1 = userWaterFillingRate;
            log_info = 'подключили потребителя к первому входу tank';
        } else {
            if (output2 === null) {
                output2 = userWaterFillingRate;
                log_info = 'подключили потребителя ко второму входу tank';
            }
        }
    };
    this.fromOutput = function (outputNumber) {
        if (output1 && (outputNumber === undefined || outputNumber === 1)) {
            output1 = null;
            log_info = 'отключили потребителя от первого входа tank';
        } else {
            output2 = null;
            log_info = 'отключили потребителя от второго входа tank';
        }
    };

    this.setInfo = function () {
        var tankCurFill_tmp = tankCurFill;
        if (isPlumbed && tankCurFill_tmp < capacity) {
            tankCurFill_tmp = Math.min(tankCurFill_tmp + waterFillingRate * this.timeInt / 1000, capacity);
        }
        if (tankCurFill_tmp !== 0) {
            output1_curFil = (output1) ? Math.min(tankCurFill_tmp, output1 * this.timeInt / 1000) : 0;
            tankCurFill_tmp -= output1_curFil;
            output2_curFil = (output2) ? Math.min(tankCurFill_tmp, output2 * this.timeInt / 1000) : 0;
            tankCurFill_tmp -= output2_curFil;
            tankCurFill = tankCurFill_tmp;
        }

        info = (isPlumbed) ? '@' : '.';
        info += ' ' + ((output1) ? '@' : '.');
        info += ' ' + ((output2) ? '@' : '.');
        info += ' ' + (tankCurFill / capacity * 100).toFixed(2) + "%";
        console.clear();
        console.log(info, ' //', log_info);
    };

    this.stopInfo = function () {
        clearInterval(TimeIntervalID);
        TimeIntervalID = undefined;
        console.clear();
    };
    var TimeIntervalID = setInterval(function (a) {
        a.setInfo();
    }, this.timeInt, this);
}

var MyTank = new Tank(100, 1);
MyTank.togglePlumbState();
MyTank.toOutput(.5, 2);
MyTank.toOutput(0.25);
MyTank.togglePlumbState();
MyTank.fromOutput();
MyTank.fromOutput();
MyTank.stopInfo();

//     Задача №2

// Написать функцию-конструктор Runner с приватным свойством medals, хранящим информацию о медалях. Создать геттер-сеттер, который, при запуске с одним параметром - типом медали - будет возвращать количество медалей данного типа. При запуске с двумя параметрами - типом и количеством - будет увеличивать количество медалей указанного типа на заданную величину.

var Runner = function () {
    var medals = {};
    this.forMedals = function () {
        switch (arguments.length) {
            case 1:  // возвращаем кол-во медалей переданного в аргументе типа
                if (arguments[0] in medals) {
                    return medals[arguments[0]];
                } else {
                    return 'Медаль "' + arguments[0] + '" не найдена';
                }
                break;
            case 2:  // увеличивать количество медалей указанного типа на заданную величину
                if (arguments[0] in medals) {
                    medals[arguments[0]] += arguments[1];
                } else {
                    medals[arguments[0]] = arguments[1];
                }
                break;
            case 0:   // ничего не делаем, возвращаем условный false (можно было кинуть исключение с сообщением)
                return false;
        }
    }
};

runner1 = new Runner();
runner1.forMedals('Gold', 1);
runner1.forMedals('Gold');
runner1.forMedals('Silver', 2);
runner1.forMedals('Silver');

//     Задача №3

// В библиотеке хранятся книги и журналы.
// * создайте классы Book и Magazine с необходимыми свойствами (не менее 5 для каждого класса)
// * создайте родительский класс, от которого функционально наследуют Book и Magazine. Перепишите старые классы с учетом наследования. При проектировании классов заложите возможность в будущем добавить класс Newspaper для хранения информации о газетах. В родительский класс добавьте защищенное свойство доступности издания и методы работы с этим свойством.

function Library(title, issueYear, description, stockAmount) {
    this.title = title;
    this.issueYear = issueYear;
    this.descript = description;

    var isAvailable;
    var inStock = stockAmount || 0;
    var giveAwayRegister = [];

    this.checkAvail = function () {
        return isAvailable + " (" + inStock + ")";
    };

    var forStock = function (stockAmount) {
        // пополнение библио фонда новыми экземплярами
        inStock += stockAmount;
        isAvailable = (inStock > 0);
    };

    this.giveAway = function (readerID) {
        //выдача экземпляра в пользование читателю
        var id = giveAwayRegister.indexOf(readerID);
        if (inStock > 0 && id === -1) {
            giveAwayRegister.push(readerID);
            forStock(-1);
            return true;
        } else {
            return false;
        }
    };

    this.giveBack = function (readerID) {
        //возврат экземпляра от читателя
        var id = giveAwayRegister.indexOf(readerID);
        if (id !== -1) {
            giveAwayRegister.splice(id, 1);
            forStock(1);
            return true;
        } else {
            return false;
        }
    };
    this.toStock = function (amount) {
        //пополнение библио фонда новым экземпляром
        if (amount > 0) {
            forStock(amount);
            return true;
        } else {
            return false;
        }
    };
}

function Books(title, issueYear, description, stockAmount, author, ISBN, category, publisher, edition) {
    Library.apply(this, arguments);
    this.author = author;
    this.ISBN = ISBN;
    this.category = category;
    this.edition = edition;
    this.publisher = publisher;

}

function Magazines(title, issueYear, description, stockAmount, issueMonth, subscribeIndex) {
    Library.apply(this, arguments);
    this.issueMonth = issueMonth;
    this.subscribeIndex = subscribeIndex;

}

var book1 = new Books(
    'JavaScript, jQuery. Исчерпывающее руководство', 2014, '', 2,
    'Дэвид МакФарланд', 9781491947074,
    'Языки программирования', "O'REILLY", 3
);
var mag1 = new Magazines(
    'Дом, сад и огород', 2017, 'some content', 5,
    11, 74142
);

//  примеры запуска:
book1.giveAway(1212);
book1.giveAway(1295);
book1.toStock(1);
mag1.giveAway(1295);
console.log('Книга ' + book1.title + ' доступна? ', book1.checkAvail());
console.log('Журнал ' + mag1.title + ' доступен? ', mag1.checkAvail());
book1.giveBack(1295);
console.log('Книга ' + book1.title + ' доступна? ', book1.checkAvail());