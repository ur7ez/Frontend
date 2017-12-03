/* https://github.com/Kolyaj/CrossJS/blob/master/source/lang/Function.js#L26 */
(function (Function_prototype) {
    Function_prototype.debounce = function (delay, ctx) {
        var fn = this, timer;
        return function () {
            var args = arguments, that = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(ctx || that, args);
            }, delay);
        };
    };
})(Function.prototype);

/* --------------------------------------------------------------------------- */
function search(e) {
    var searchStr = document.querySelector('.search').value;
    if (!searchStr.trim()) {
        return;
    }
    var url = 'search.php?q=' + encodeURIComponent(searchStr);

    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//        request.setRequestHeader('Cache-Control', 'no-cache');
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status !== 200) {
                console.error(request.status + ': ' + request.statusText);
            } else {
//                    console.log('responseText: ' + request.responseText);
                var hints = request.responseText.split(';');
                var existingElems = document.querySelectorAll('.list li');
                for (var i = 0; i < hints.length; i++) {
                    if (existingElems[i]) {
                        existingElems[i].innerText = hints[i];
                    } else {
                        var newElem = document.createElement("li");
                        newElem.innerText = hints[i];
                        document.querySelector('.list').appendChild(newElem);
                    }
                }
                if (existingElems.length > hints.length) {
                    for (i = existingElems.length; i > hints.length; i--) {
                        existingElems[i - 1].parentNode.removeChild(existingElems[i - 1]);
                    }
                }
            }
        }
    };
}

/* --------------------------------------------------------------------------- */

function loadInfo(e) {
    var elem = e.target;
    if (elem.tagName === 'LI' && e.which === 1) {
        var input = elem.innerText;
        var url = 'search.php';
        var boundary = Math.random().toString().slice(2);
        var body = '--' + boundary + '\r\n' +
            'Content-Disposition: form-data; name="search"\r\n\r\n' +
            input +
            '\r\n' +
            '--' + boundary + '--\r\n';

        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        request.send(body);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status !== 200) {
                    console.error(request.status + ': ' + request.statusText);
                } else {
//                        console.log('responseText: ' + request.responseText);
                    if (request.responseText === '' || !(request.responseText)) {
                        existingElems = document.querySelectorAll('.results *');
                        for (i = 0; i < existingElems.length; i++) {
                            existingElems[i].parentNode.removeChild(existingElems[i]);
                        }
                        return;
                    }
                    var results = JSON.parse(request.responseText);
                    for (var i = 0; i < results.length; i++) {
                        if (document.querySelectorAll('.results h3')[i]) {
                            document.querySelectorAll('.results h3')[i].innerHTML = results[i].header;
                            document.querySelectorAll('.results p')[i].innerHTML = results[i].description;
                        } else {
                            var newElem = document.createElement("h3");
                            newElem.innerHTML = results[i].header;
                            document.querySelector('.results').appendChild(newElem);

                            newElem = document.createElement("p");
                            newElem.innerHTML = results[i].description;
                            document.querySelector('.results').appendChild(newElem);
                        }
                    }
                    var existingElems = document.querySelectorAll('.results h3, .results p');
                    if (existingElems.length > results.length * 2) {
                        for (i = results.length * 2; i < existingElems.length; i++) {
                            existingElems[i].parentNode.removeChild(existingElems[i]);
                        }
                    }
                }
            }
        };
    }
}

/* --------------------------------------------------------------------------- */

document.querySelector('input').addEventListener('input', search.debounce(500));
document.addEventListener('mouseup', loadInfo);