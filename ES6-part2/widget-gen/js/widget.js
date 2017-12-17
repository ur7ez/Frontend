import {Cookies} from "./Cookies.js";

let ajax = (url) => {
    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        // request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // request.setRequestHeader('Expires', '' + Date.now() + 10 * 60 * 1000);
        // request.setRequestHeader('Cache-Control', 'max-age=' + 10 * 60);

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

let getWxData = (event) => {
    let wgURL = "https://api.apixu.com/v1/current.json";
    let APIkey = '0a2e760f561341c585703421171412';
    wgCity = document.querySelector('#city').value;
    wgLng = document.querySelector('#lang').value;

    // Проверяем был ли уже аналогичный запрос (куки хранится в течение последних 10 минут)
    let cached = Cookies.get(cookiePrefix + '&' + wgCity + '&' + wgLng);
    if (cached) {
        wgJSON = JSON.parse(cached);
        document.querySelector('#wg-json').innerText = doWidget();
        console.log('result is from browser cookie cache');
        return;
    }
    // формируем строку запроса на сервер
    let params = {key: APIkey, q: wgCity, lang: wgLng};
    for (let param in params) {
        wgURL += ~wgURL.indexOf('?') ? '&' : '?';
        wgURL += param + '=' + encodeURIComponent(params[param]);
    }
    let wxWidget = ajax(wgURL);

    wxWidget.then(result => {
        wgJSON = JSON.parse(result);

        // Кэшируем результаты погоды на клиенте на 10 минут
        // wgJSON['url'] = wgURL;
        Cookies.set(cookiePrefix + '&' + wgCity + '&' + wgLng, JSON.stringify(wgJSON), 1 / (24 * 6), location.href);
        // заполняем темплейт виджета
        document.querySelector('#wg-json').innerText = doWidget();
        console.log('result is from API-request');
    }, error => {
        console.error(error);
    });
};

let doWidget = () => {
    // console.log(JSON.stringify(wgJSON));

    // формируем оформление виджета
    let wgColor = document.querySelector('INPUT[type="radio"]:checked').value;
    let wxCondx = wgJSON["current"]["condition"];
    let wgCity_local = document.querySelector('#city').selectedOptions[0].textContent;
    let wgTemp = wgJSON["current"]["temp_c"];
    wgTemp = (wgTemp > 0) ? '+' + wgTemp : wgTemp;

    document.querySelector('.widget').style.backgroundColor = toColor(wgColor);
    document.querySelector('.widget').style.display = '';
    document.querySelector('#wgCityHead span').innerText = wgCity_local;
    let wgElem = document.querySelector('#wx-widget-image');
    // wgElem.setAttribute('src', 'wx_condx/' + wxCondx["icon"].match(/(.+\/64x64\/)(.+)/)[2]);
    wgElem.setAttribute('src', wxCondx["icon"]);
    wgElem.setAttribute('alt', 'current weather for ' + wgCity);
    wgElem.setAttribute('title', wxCondx["text"] + ' (' + wgCity_local + ')');
    document.querySelector('#wgTemp').firstChild.textContent = wgTemp;

    // собственно код для вставки на сторонней HTML-странице:
    let informerDomHTML = '<div id="wx-widget" data-citylocal="' + wgCity_local
        + '"><script src="' + hostingURL + '/js/widget2.js?q='
        + wgCity + '&lang=' + wgLng + '&color=' + wgColor +
        '" type="module" id="ur7ez"></script></div>';
    return informerDomHTML.trim();
};

function toColor(strColor) {
    return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + strColor)) ? '#' + strColor : strColor;
}

let wgJSON, wgCity, wgLng;
let cookiePrefix = 'wxWidget';
let hostingURL = 'https://ur7ez.000webhostapp.com/widget-gen';
document.querySelector('.widgetBtn').addEventListener('click', getWxData);