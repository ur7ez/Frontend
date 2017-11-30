// Задача №2

// Написать скрипт, подключаемый к странице. При вводе с клавиатуры скрипт генерирует "модальные" окна для каждой нажатой клавиши. Каждое "модальное" окно имеет фиксированный отступ от предыдущего. Окна имеют кнопку "х" для закрытия окна. При клике на окно оно перекрывает предыдущие. Окно можно перетаскивать за область заголовка.

//     Пример работы скрипта на видео https://youtu.be/aBEymKdTnuw
var clientH = document.documentElement.clientHeight;
var clientW = document.documentElement.clientWidth;
var modalHeight = 0;
var modalWidth = 0;

config = {
    top: 50,
    left: 35,
    xOffset: 0,
    yOffset: 0,
    colsUsed: 0,
    elemZIndex: 5,
    rebuild: function () {
        if (this.yOffset + modalHeight + this.top > clientH || this.xOffset + modalWidth + this.left > clientW) {
            this.yOffset = 0;
            this.colsUsed++;
            this.xOffset = this.colsUsed * 100 + this.left;
        } else {
            this.yOffset += this.top;
            this.xOffset += this.left;
        }
    }
};

function modal(event) {
    clientW = document.documentElement.clientWidth;
    if (config.xOffset + modalWidth > clientW) {
        return;
    }
    createModal(event.key || event.shiftKey);
    if (!modalHeight) {
        modalHeight = document.querySelectorAll('.proto')[1].getBoundingClientRect().height;
        modalWidth = document.querySelectorAll('.proto')[1].getBoundingClientRect().width;
    }
    config.rebuild();
}

function createModal(str) {
    var divProto = document.querySelector(".proto");
    var newElem = divProto.cloneNode(true);
    newElem.setAttribute('class', 'proto');
    newElem.style.top = config.yOffset + 'px';
    newElem.style.left = config.xOffset + 'px';
    newElem.querySelector('b').innerHTML = str;
    document.body.appendChild(newElem);
}

function selModal(event) {
    var curElem = event.target;
    if (curElem.getAttribute('class') === 'header') {
        curElem.parentNode.style.zIndex = config.elemZIndex;
        config.elemZIndex++;
    }

}

function moveModal(e) {
    var ball = e.target;

    if (ball.getAttribute('class') === 'header' && e.which === 1) {
        ball = ball.parentNode;
        var coords = getCoords(ball);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        ball.style.position = 'absolute';
        // переместим в body, чтобы элемент был точно не внутри position:relative
        document.body.appendChild(ball);
        moveAt(e);

        ball.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            // передвинуть элемент под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            ball.style.left = e.pageX - shiftX + 'px';
            ball.style.top = e.pageY - shiftY + 'px';
        }

        // 3. перемещать по экрану
        document.onmousemove = function (e) {
            moveAt(e);
        };

        // 4. отследить окончание переноса
        ball.onmouseup = function () {
            document.onmousemove = null;
            ball.onmouseup = null;
        };

        ball.ondragstart = function () {
            return false;
        };
    }
}

function delModal(e) {
    var elem = e.target;

    if (elem.getAttribute('class') === 'close' && e.which === 1) {
        elem = elem.parentNode.parentNode;
        document.body.removeChild(elem);
    }
}

function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

document.body.addEventListener('keyup', modal);
document.body.addEventListener('click', selModal, true);
document.body.addEventListener('mousedown', moveModal);
document.body.addEventListener('mouseup', delModal);