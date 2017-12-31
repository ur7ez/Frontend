import {Cookies} from "./Cookies.js";

let ajax = (url) => {
    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        // request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.send();

        let ctx = request;
        request.onload = () => {
            if (ctx.status === 200) {
                resolve(ctx.responseText);
            } else {
                reject(ctx.responseText);
            }
        };
        request.onerror = () => {
            reject(new Error("Connection error"));
        };
    });
};

let getWxData = () => {
    let cookiePrefix = 'wxWidget_outer';
    let idStamp = document.querySelector('#ur7ez');
    if (!idStamp) {
        doWidget({die: true});
        return;
    }
    let wgCity = getParameterByName('q', idStamp.src);
    let wgLng = getParameterByName('lang', idStamp.src);
    let wgColor = toColor(getParameterByName('color', idStamp.src));
    let wgJSON;

    // source for CSS from hosting site
    let srcURL = hostingURL(idStamp.src);

    // строка запроса на сервер:
    let wgURL = "https://api.apixu.com/v1/current.json";

    let params = {key: '0a2e760f561341c585703421171412', q: wgCity, lang: wgLng};
    for (let param in params) {
        wgURL += ~wgURL.indexOf('?') ? '&' : '?';
        wgURL += `${param}=${encodeURIComponent(params[param])}`;
    }

    // Проверяем был ли уже аналогичный запрос (куки хранится в течение последних 10 минут)
    let cached = Cookies.get(`${cookiePrefix}&${wgCity}&${wgLng}`);
    if (cached) {
        wgJSON = JSON.parse(cached);
        console.log('result is from browser cookie cache');
        doWidget({srcURL, wgColor, wgCity, wgJSON});
        return;
    }

    let wxWidget = ajax(wgURL);

    wxWidget.then(result => {
        wgJSON = JSON.parse(result);
        // Кэшируем результаты погоды на клиенте
        let storeTime = 1 / (24 * 6);  // время кэширования - 10 минут, рассчитываем как доля суток (параметр функции кэширования - в сутках)
        Cookies.set(`${cookiePrefix}&${wgCity}&${wgLng}`, JSON.stringify(wgJSON), storeTime, location.href);

        console.log('result is from API-request:');
        doWidget({srcURL, wgColor, wgCity, wgJSON});
    }, error => {
        let err = JSON.parse(error);
        console.error(err.error.code, err.error.message);
        doWidget({die: true, dieStatus: err.error.message});
    });
};

/**
 *
 * @param params | object
 *              .srcURL - source for CSS from hosting site
 *              .wgColor - фоновый цвет виджета
 *              .wgCity - город виджета
 *              .wgJSON - объект погодных данных
 *              .die = false - 'true' to go off
 */
let doWidget = ({srcURL, wgColor, wgCity, wgJSON, die = false, dieStatus = "Неверный формат элемента для информера"} = {}) => {
    // console.log(wgJSON);

    let widget = document.getElementById('wx-widget');
    if (die) {
        widget.innerText = dieStatus;
        widget.style.color = 'red';
        return;
    }
    // добавляем внешний CSS
    let lnk = document.createElement('link');
    document.body.appendChild(lnk);
    lnk.outerHTML = `<link rel="stylesheet" href="${srcURL}/widget-gen/css/wg-style.css">`;  // wgJSON['url']

    let wgCity_local = document.querySelector('#wx-widget').dataset['citylocal'];
    // формируем контейнер, оформление и наполнение виджета
    widget.outerHTML = '<div class="widget" id="wx-widget"><div id="wgCityHead"><span></span></div><div class="wgImg"><img id="wx-widget-image" src=""></div><div class="wgTemp"><nobr><span id="wgTemp"><span class="tsp">&nbsp;</span>°C</span></nobr></div></div>';
    let wxCondx = wgJSON.current.condition;
    let wgTemp = wgJSON.current.temp_c;
    wgTemp = (wgTemp > 0) ? `+${wgTemp}` : wgTemp;

    document.querySelector('.widget').style.backgroundColor = wgColor;
    document.querySelector('#wgCityHead span').innerText = wgCity_local;

    // добавляем и стилизуем иконку погоды:
    let wgElem = document.querySelector('#wx-widget-image');
    let imgUrl = wxCondx.icon;  // рисунок берем от провайдера информера
    wgElem.setAttribute('src', imgUrl);
    wgElem.setAttribute('alt', `current weather for ${wgCity}`);
    wgElem.setAttribute('title', `${wxCondx.text} (${wgCity_local}, ${wgJSON.location.country})`);
    document.querySelector('#wgTemp').firstChild.textContent = wgTemp;
};

/**
 * do URI parsing - get 'name' paramenter value if exists
 * @param name
 * @param url
 * @return null || string
 */
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function toColor(strColor) {
    return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(`#${strColor}`)) ? `#${strColor}` : strColor;
}

let hostingURL = (str) => {
    let url = document.createElement('a');
    url.href = str;
    return url.origin;
};

window.onload = function () {
    getWxData();
};