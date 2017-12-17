import {Cookies} from "./Cookies.js";

let ajax = (url) => {
    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.send();

        let ctx = request;
        request.onload = () => {
            if (ctx.status === 200) {
                resolve(ctx.responseText);
            } else {
                let error = new Error(ctx.statusText);
                error.code = ctx.status;
                reject(error);
            }
        };
        request.onerror = () => {
            reject(new Error("Connection error"));
        };
    });
};

let getWxData = () => {
    let idStamp = document.querySelector('#ur7ez');
    if (!idStamp) {
        doWidget(true);
        return;
    }
    wgCity = getParameterByName('q', idStamp.src);
    let wgLng = getParameterByName('lang', idStamp.src);
    let wgURL = 'wxWidget.php?q=' + wgCity + '&lang=' + wgLng;  // строка запроса на сервер
    wgColor = toColor(getParameterByName('color', idStamp.src));

    // Проверяем был ли уже аналогичный запрос (куки хранится в течение последних 10 минут)
    let cached = Cookies.get(cookiePrefix + '&' + wgCity + '&' + wgLng);
    if (cached) {
        wgJSON = JSON.parse(cached);
        console.log('result is from browser cookie cache');
        doWidget();
        return;
    }

    let wxWidget = ajax(wgURL);

    wxWidget.then(result => {
        wgJSON = JSON.parse(result);
        // Кэшируем результаты погоды на клиенте на 10 минут
        //wgJSON['url'] = wgURL;
        Cookies.set(cookiePrefix + '&' + wgCity + '&' + wgLng, JSON.stringify(wgJSON), 1 / (24 * 6), location.href);

        console.log('result is from API-request:');
        doWidget();
    }, error => {
        console.error(error);
    });
};

let doWidget = (die = false) => {
    // console.log(wgJSON);

    let widget = document.getElementById('wx-widget');
    if (die) {
        widget.innerText = "Неверный формат элемента для информера";
        widget.style.color = 'red';
        return;
    }

    let wgCity_local = document.querySelector('#wx-widget').dataset['citylocal'];
    // формируем контейнер, оформление и наполнение виджета
    widget.outerHTML = '<div class="widget" id="wx-widget"><div id="wgCityHead"><span></span></div><div class="wgImg"><img id="wx-widget-image" src=""></div><div class="wgTemp"><nobr><span id="wgTemp"><span class="tsp">&nbsp;</span>°C</span></nobr></div></div>';
    let wxCondx = wgJSON["current"]["condition"];
    let wgTemp = wgJSON["current"]["temp_c"];
    wgTemp = (wgTemp > 0) ? '+' + wgTemp : wgTemp;

    document.querySelector('.widget').style.backgroundColor = wgColor;
    document.querySelector('#wgCityHead span').innerText = wgCity_local;

    // добавляем и стилизуем иконку погоды:
    let wgElem = document.querySelector('#wx-widget-image');
    wgElem.setAttribute('src', 'wx_condx/' + wxCondx["icon"].match(/(.+\/64x64\/)(.+)/)[2]);
    wgElem.setAttribute('alt', 'current weather for ' + wgCity);
    wgElem.setAttribute('title', wxCondx["text"] + ' (' + wgCity_local + ')');
    document.querySelector('#wgTemp').firstChild.textContent = wgTemp;

    // добавляем внешний CSS
    let lnk = document.createElement('link');
    document.body.appendChild(lnk);
    lnk.outerHTML = '<link rel="stylesheet" href="' + wgJSON['url'] + 'css/wg-style.css">';
};

/**
 * do URI parsing - get 'name' paramenter value if exists
 * @param name
 * @param url
 * @return null || string
 */
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function toColor(strColor) {
    return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + strColor)) ? '#' + strColor : strColor;
}

let wgJSON, wgCity, wgColor;
let cookiePrefix = 'wxWidget_outer';

window.onload = function () {
    getWxData();
};