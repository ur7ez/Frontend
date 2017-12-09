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
                console.log('request.responseText: ', request.responseText)
                var hints = JSON.parse(request.responseText);
                if (!hints.length) return;

                // deleting current hint list:
                var existingElems = document.querySelectorAll('.list li');
                for (i = 0; i < existingElems.length; i++) {
                    existingElems[i].parentNode.removeChild(existingElems[i]);
                }
                for (var i = 0; i < hints.length; i++) {
                    var newElem = document.createElement("li");
                    newElem.innerText = hints[i];
                    document.querySelector('.list').appendChild(newElem);
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
                    // deleting current description paragraphs:
                    var existingElems = document.querySelectorAll('.results *');
                    for (i = 0; i < existingElems.length; i++) {
                        existingElems[i].parentNode.removeChild(existingElems[i]);
                    }
                    // parse and render loaded data
                    var results = JSON.parse(request.responseText);
                    for (var i = 0; i < results.length; i++) {
                        var newElem = document.createElement("h3");
                        newElem.innerHTML = results[i].header;
                        document.querySelector('.results').appendChild(newElem);

                        newElem = document.createElement("p");
                        newElem.innerHTML = results[i].description;
                        document.querySelector('.results').appendChild(newElem);
                    }
                }
            }
        };
    }
}

/* --------------------------------------------------------------------------- */

document.querySelector('input').addEventListener('input', search.debounce(500));
document.addEventListener('mouseup', loadInfo);