import {myVP} from './VPlayer.js';

/**
 * добавление в плейлист / удаление из плейлиста контента для просмотра видео
 * @param event
 */
function togglePL(event) {
    let curElem = event.target, id, vType;
    if (curElem.getAttribute('class') === 'add-to-PL') {   // добавление в Плейлист
        id = curElem.getAttribute('id').substr(3);
        vType = curElem.dataset.vtype;
        let template = document.querySelector('template');
        let c = document.createElement('div');
        c.innerHTML = template.innerHTML;
        c.setAttribute('class', template.dataset.class);
        c.dataset.vtype = vType;
        let src = curElem.dataset.src;
        if (src) c.dataset.src = src;
        let new_el = document.querySelector('.v-playlist').appendChild(c.cloneNode(true));
        if (src) {
            let img_src = document.querySelector(`#vl_${id} ~IMG`).src;
            new_el.querySelector('IMG').setAttribute('src', img_src);
        } else {
            new_el.querySelector('IMG').setAttribute('src', `img/${id}_snapshot.jpg`);
        }
        new_el.setAttribute('id', `pl_${id}`);
        document.querySelector(`#pl_${id} .card-title`).innerText =
            document.querySelector(`#vl_${id} ~ .video-preview__title`).innerText;

        curElem.setAttribute('class', 'del-from-PL');
        curElem.setAttribute('title', 'удалить видео из Плейлиста');
        event.stopPropagation();
        myVP.queueAddTo(id, vType);
        clearTails();
        return;
    }
    if (curElem.getAttribute('class') === 'del-from-PL') {   // удаление из плейлиста
        if (curElem.parentNode.getAttribute('class') === 'v-element') {  // удаляем из плейлиста в библиотеке
            id = `pl_${curElem.getAttribute('id').substr(3)}`;
            curElem.setAttribute('class', 'add-to-PL');
            curElem.setAttribute('title', 'добавить видео в Плейлист');
        } else {  // удаляем из плейлиста в самом плейлисте
            id = curElem.parentNode.getAttribute('id');
            document.querySelector(`#vl_${id.substr(3)}`).setAttribute('class', 'add-to-PL');
            document.querySelector(`#vl_${id.substr(3)}`).setAttribute('title', 'добавить видео в Плейлист');
        }
        document.querySelector(`#${id}`).remove();
        myVP.queueDelFrom(id.substr(3));
        clearTails();
    }
}

/**
 * очистка плейлиста
 * @param event
 */
function clearPL(event) {
    if (confirm('Очистка плейлиста также приведет к очистке очереди видеоплеера. Продолжить?') === false) return;
    let allElem = document.querySelectorAll('.vplist'), id;
    if (allElem.length !== 0) {
        for (let elem of allElem) {
            id = elem.getAttribute('id').substr(3);
            document.querySelector(`#vl_${id}`).setAttribute('class', 'add-to-PL');
            document.querySelector(`#vl_${id}`).setAttribute('title', 'добавить видео в Плейлист');
            elem.remove();
        }
        myVP.queueEmpty();
        clearTails();
    }
}

/**
 * приводим состояние кнопок в соответствие, если в плейлисте нет ни одного элемента
 */
function clearTails() {
    if (document.querySelectorAll('.vplist').length === 0) {
        document.querySelector('#play-pause-playlist').setAttribute("disabled", "");
        document.querySelector('#pl-menu-bar').classList.add("d-none");
        document.querySelector('#playlist-menu_id').classList.add("d-none");
        document.querySelector('#playlist_id').classList.add("d-none");
    } else {
        document.querySelector('#play-pause-playlist').removeAttribute('disabled');
        document.querySelector('#pl-menu-bar').classList.remove("d-none");
        document.querySelector('#playlist-menu_id').classList.remove("d-none");
        document.querySelector('#playlist_id').classList.remove("d-none");
    }
}

/**
 * запуск воспроизведения по двойному клику на элементе плейлиста
 * @param event
 */
function toggleVP(event) {
    let curElem = event.target;
    // добавление в Видеоплеер для незагруженного трека или пауза / воспроизведение для уже загруженного трека
    if (curElem.classList.contains('play-on-dblclick')) {
        let id = curElem.parentNode.id.substr(3);
        myVP.togglePlayPause(id, curElem.getAttribute('src'));
    }
}

function toggleVP_click(event) {
    let curElem = event.target;
    if (curElem.className === 'vplayer') {
        toggle_PlayPause(!document.querySelector('#vp-play-pause').checked);
    }
}

/**
 * воспроизведение / пауза для всего плейлиста
 */
function togglePL_PlayPause(event) {
    if (event.target.id === 'play-pause-playlist') {
        toggle_PlayPause(event.target.checked);
    }
}

function toggle_PlayPause(state) {
    let isNotPlaying = state;

    if (isNotPlaying) {// плейлист на паузе или не запускали еще
        myVP.resumePB();
    } else {// плейлист играет - ставим на паузу
        myVP.pausePB();
    }
    return !isNotPlaying;
}

/**
 * обработчик кнопки "#toggle-play-type": переключение типа воспроизведения в режиме всего плейлиста
 */
function togglePL_play_type() {
    setTimeout(() => {
        myVP.pbConseq = document.querySelector('#pl-conseq-play input').checked;
    }, 10);
}

/**
 * обработчик событий "пауза", "воспроизведение" для видео-контейнера "video.vplayer".
 * Синхронизирует состояние кнопки "#toggle-play-type" для плейлиста
 */
function videoSyncWithPL(event) {
    if (event.type !== 'timeupdate') myVP.logger('video status: ', event.type);
    switch (event.type) {
        case 'play':  //Синхронизирует состояние кнопки "#toggle-play-type" для плейлиста
            togglePLState(true);
            break;
        case 'pause':
            togglePLState(false);
            break;
        case 'loadeddata':
            togglePLState(true);
            break;
        case 'timeupdate':
            vpProgressUpdate();
            break;
        case 'ended':  //обработчик завершения воспроизведения текущего видео трека
            myVP.playFromQueue();
    }
}

/**
 * установка статуса воспроизведения плейлиста (остановлен / воспроизводится)
 */
function togglePLState(isInPlayBack) {
    if (typeof isInPlayBack === 'undefined') {
        document.querySelector('#play-pause-playlist').checked = !document.querySelector('#play-pause-playlist').checked;
        document.querySelector('#vp-play-pause').checked = !document.querySelector('#vp-play-pause').checked;
    } else {
        document.querySelector('#play-pause-playlist').checked = (isInPlayBack);
        document.querySelector('#vp-play-pause').checked = (isInPlayBack);
    }

    document.querySelector('#play-pause-playlist').parentNode.title = (document.querySelector('#play-pause-playlist').checked) ? 'Остановить воспроизведение плейлиста' : 'Воспроизвести плейлист';
    document.querySelector('#vp-play-pause').parentNode.title = (document.querySelector('#vp-play-pause').checked) ? 'Пауза' : 'Воспроизведение';
}

function vpControlsClick(event) {
    let curElem = event.target;
    if (curElem.id === 'vp-play-pause') {
        toggle_PlayPause(curElem.checked);
        return;
    }
    if (curElem.classList.contains('vp-stop')) {
        myVP.stopPB();
        return;
    }
    if (curElem.classList.contains('vp-next')) {
        myVP.playIDFromQueue(true);
        return;
    }
    if (curElem.classList.contains('vp-prev')) {
        myVP.playIDFromQueue(false);
        return;
    }
    if (curElem.classList.contains('vp-volume')) {
        let vol = myVP.toggleMute(!document.querySelector('#vp-volume-mute').checked);
        let volumeSlider = document.querySelector('.vp-volume-slider-handle');
        volumeSlider.valueAsNumber = vol * 100;
        if (document.querySelector('#vp-volume-mute').checked !== (vol === 0)) setMuteBtnTitle(curElem);
    }
}

function setMuteBtnTitle(muteBtnDOMelem) {
    let curTitle = muteBtnDOMelem.title;
    muteBtnDOMelem.title = muteBtnDOMelem.dataset.title;
    muteBtnDOMelem.dataset.title = curTitle;
}

function vpProgressUpdate() {
    let VPWidth = getComputedWidth('.vp-progress-bar-container');
    let VPHandleWidth = getComputedWidth('.vp-progress-bar-handle') / 2;
    let vp_currentElapsedTime = document.querySelector('video.vplayer').currentTime / document.querySelector('video.vplayer').duration;
    document.querySelector('.vp-progress-bar').style.width = `${vp_currentElapsedTime * VPWidth}px`;
    document.querySelector('.vp-progress-bar-handle').style.left = `${Math.max(0, vp_currentElapsedTime * VPWidth - VPHandleWidth)}px`;
}

/**
 * onMouseDown Event over VP progress-bar handle
 * @param event
 */
function vpProgressBarHandle(event) {
    let curElem = event.target;
    if (curElem.getAttribute('class') === 'vp-progress-bar-handle' && event.which === 1) {
        moveHandle(event, getComputedWidth('.vp-progress-bar-container') - getComputedWidth('.vp-progress-bar-handle'));
    }
}

function moveHandle(event, maxLeftCoord) {
    let handle = event.target;
    let moveTarget = document.querySelector('.vplayer');
    handle.style.display = 'initial';

    // перемещать по экрану
    moveTarget.onmousemove = function (e) {
        handle.style.left = Math.min(maxLeftCoord, Math.max(0, parseFloat(handle.style.left) + e.movementX)) + 'px';
    };

    // отследить окончание переноса
    document.body.onmouseup = function () {
        moveTarget.onmousemove = null;
        document.body.onmouseup = null;
        handle.style.display = '';
        myVP.setTimePlayBackPosition(parseFloat(handle.style.left) / maxLeftCoord, true);
    };

    document.ondragstart = function () {
        return false;
    };
}

function vpProgressPosSet(event) {
    if (event.target.classList.contains('vp-progress-bar-handle')) return;
    myVP.setTimePlayBackPosition(event.offsetX / getComputedWidth('.vp-progress-bar-container'), true);
}

function getComputedWidth(selector) {
    let computed = getComputedStyle(document.querySelector(selector));
    return parseFloat(computed.width);
}

function vpVolumeUpdate(event) {
    let curVol = event.target.valueAsNumber;
    myVP.setVolume(curVol / 100);
    myVP.toggleMute(curVol === 0);
    if (document.querySelector('#vp-volume-mute').checked !== (curVol === 0)) setMuteBtnTitle(document.querySelector('.vp-volume'));
    document.querySelector('#vp-volume-mute').checked = (curVol === 0);
    // console.log('volume upd: ', curVol);
}

// ----------------------------- general Events --------------------------------
// добавление / удаление в плейлисте:
document.querySelector('.vlib').addEventListener('click', togglePL, true);
document.querySelector('.v-playlist').addEventListener('click', togglePL, true);

// старт / пауза воспроизведения по двойному клику на элементе плейлиста:
document.querySelector('.v-playlist').addEventListener('dblclick', toggleVP, true);
document.querySelector('video.vplayer').addEventListener('click', toggleVP_click, true);

// кнопка очистки плейлиста:
document.querySelector('.clear-pl').addEventListener('click', clearPL, true);
// кнопка "воспроизведение / пауза" для плейлиста:
document.querySelector('.togglePP').addEventListener('click', togglePL_PlayPause, true);
// кнопка переключения типа воспроизведения (последовательное / случайное) для плейлиста:
document.querySelector('#toggle-play-type').addEventListener('click', togglePL_play_type, true);

// Ивенты для отслеживания статуса видеоплеера:
document.querySelector('video.vplayer').addEventListener('ended', videoSyncWithPL, true); // завершено воспроизведение
document.querySelector('video.vplayer').addEventListener('pause', videoSyncWithPL, true); // на паузе
document.querySelector('video.vplayer').addEventListener('play', videoSyncWithPL, true); // воспроизводится
document.querySelector('video.vplayer').addEventListener('timeupdate', videoSyncWithPL, true); // изменение текущего времени видео
document.querySelector('video.vplayer').addEventListener('loadeddata', videoSyncWithPL, true); // загружен 1й кадр видео
// воспроизведение

// ----------------------------- Video player controls' Events --------------------------------
document.querySelector('.vp-controls').addEventListener('click', vpControlsClick, true);
document.querySelector('.vp-progress-bar').addEventListener('mousedown', vpProgressBarHandle, true);
document.querySelector('.vp-progress-bar-container').addEventListener('click', vpProgressPosSet, true);
document.querySelector('.vp-volume-slider-handle').addEventListener('change', vpVolumeUpdate, true);