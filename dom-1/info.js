/*
Задача №3

Написать скрипт, подключаемый к странице. При переходе на такую страницу в body будут последовательно добавляться и отображаться сообщения из 'notifications.js'. Цвет фона сообщения зависит от его типа. Сначала появляется первое сообщение, отображается в течение 3 секунд, затем исчезает (удаляется из DOM) и за ним появляется новое и т.д.
*/

var notifications = [
    {
        type: "error",
        message: "TypeError: funckciya is not a function"
    },
    {
        type: "warn",
        message: "Don`t forget turn off the lights"
    },
    {
        type: "info",
        message: "The weather is good"
    },
    {
        type: "warn",
        message: "Attention! This is the very last notification!"
    }
];

var notifyObj = {
    attrId: 'notification',
    colors: {
        'error': '#f8d7da',
        'warn': '#fff3cd',
        'info': '#d1ecf1'
    },
    showElem: function (counter) {
        counter = counter || this.cnt;
        if (this.elementDOM) {
            this.deleteElem();
        }
        if (counter === notifications.length) {
            clearInterval(this.TimeIntervalID);
            this.TimeIntervalID = 0;
            this.cnt = 0;
        } else {
            var body = document.body;
            var colorType = notifications[counter]['type'];

            var newElem = document.createElement("p");
            newElem.innerText = notifications[counter]['message'];
            newElem.setAttribute('class', this.attrId);
            newElem.style.backgroundColor = this.colors[colorType];

            // var parentElem = body.querySelector('body').firstChild.nextSibling;
            var parentElem = body.firstChild;
            body.insertBefore(newElem, parentElem);
            //body.appendChild(newElem);
            this.elementDOM = newElem;
            this.cnt = ++counter;
        }
    },
    deleteElem: function () {
        var elem = this.elementDOM;
        if (elem) {
            elem.parentNode.removeChild(elem);
            this.elementDOM = null;
        }
    },
    elementDOM: null,
    TimeIntervalID: 0,
    cnt: 0
};

notifyObj.TimeIntervalID = setInterval(function () {
    notifyObj.showElem();
}, 3000);
