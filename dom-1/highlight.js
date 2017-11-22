/*
Задача №2

Написать скрипт, подключаемый к странице. При переходе на такую страницу с параметрами адресной строки, например, с page.html?id=2&color=fdd на странице скриптом находился блок с классом "highlight" и с data-id равным 2, и фоновый цвет этого блока становился "#FDD".
*/

function getParams(param) {
    var params = param.search;
    a = {};

    // if (typeof URL === 'undefined') {
        params = params.substr(1).split('&');
        for (var j = 0; j < params.length; j++) {
            var tmpVal = params[j].split('=');
            a[tmpVal[0]] = tmpVal[1];
        }
    // } else {
    //     params = (new URL(param)).searchParams;
    //     for (var key of params.keys()) {
    //         a[key] = params.get(key);
    //     }
    // }
    return a;
}

if (location.search) {
    params = getParams(document.location);
    var id = params["id"];
    var color = params["color"];   //.toUpperCase();

    color = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color) ? '#' + color : color;

    var highlight = document.querySelectorAll('.highlight');
    for (var i = 0; i < highlight.length; i++) {
        if (highlight[i].dataset['id'] === id) {
            highlight[i].style.backgroundColor = color;
            break;
        }
    }
}