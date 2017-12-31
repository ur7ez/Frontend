// Задача №4

// Написать игру "крестики-нолики", режим "играть против компьютера". При старте игры можно задать два уровня "интеллекта" программы: с рандомными ходами, или с ходами, максимизирующими шансы на победу программы. Игрок и программа после каждого раунда меняются: играют то за крестик, то за нолик. При написании кода использовать ES6.
"use strict";
import {heuristic, magicLine, ticArrUpdate} from './heuristic.js';

let Players = class {
    constructor(user, comp, userStarts) {
        this.user = user;
        this.comp = comp;
        this.current = (userStarts) ? user : comp;
    }

    set curPlayer(player) {
        this.current = player;
    }

    swapFig() {
        ([this.user, this.comp] = [this.comp, this.user]);
    }

    swapCurrent() {
        this.current = (this.current === this.comp) ? this.user : this.comp;
    }
};

let userStarts = true; // периодическая смена права первого хода (начинает игрок)
let gamer;

let started = false;
let ticArr = [[], [], []];
let len = ticArr.length;
let leftArr = [];
let passType;
const rowIdPrefix = 'cell_';

let userPick = (event) => {
    if (!started) return;
    let curElem = event.target;
    if (curElem.getAttribute('class') === 'row' && !curElem.firstChild.innerText) {
        document.querySelector('.hint').style.visibility = 'hidden';
        let id = curElem.getAttribute('id').replace(rowIdPrefix, '');
        passDraw(curElem, id, gamer.user, 'blue');
        if (!isGameOver(id, gamer.user)) compPick();
    }
};

let compPick = () => {
    started = false;
    let id, curElem, promise;

    if (passType === 'random') { // случайный ход компьютера
        id = (leftArr.length === 1) ? leftArr[0] : leftArr[randomInteger(0, leftArr.length - 1)];
        promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(id);
            }, 1000);
        });
    } else { // стратегия, максимизирующий шансы на победу
        if (isEmpty(ticArr)) {
            let startingPoint = [
                '11',
                `1${len}`,
                `${len}1`,
                `${len}${len}`,
                `${Math.round(len / 2)}${Math.round(len / 2)}`,
            ];
            id = startingPoint[randomInteger(0, startingPoint.length - 1)];
            promise = new Promise((resolve, reject) => resolve(id));
        } else {
            if (leftArr.length === 1) {
                id = leftArr[0];
                promise = new Promise((resolve, reject) => resolve(id));
            } else {
                promise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        id = heuristic(ticArr, leftArr, gamer);
                        resolve(id);
                    }, 2000);
                });
            }
        }
    }

    promise.then(result => {
            curElem = document.querySelector(`#${rowIdPrefix}${result}`);
            passDraw(curElem, result, gamer.comp, 'red');

            started = true;
            isGameOver(id, gamer.comp);
        },
        error => {
            console.error(error);
        }
    );
};

let passDraw = (elem, id, symb, color) => {
    elem.firstChild.innerText = symb;
    elem.firstChild.style.color = color;
    ticArrUpdate(id, symb, ticArr);
    leftArrUpdate();
    progresUpdate();
};


let randomInteger = (min, max) => Math.round(Math.abs(min - 0.5 + Math.random() * (max - min + 1)));

let isEmpty = (object) => ('length' in object) ? (object.join('') === "") : (JSON.stringify(object) === "{}");

let progresUpdate = (min = 9 - leftArr.length) => {
    let progress = document.querySelector('progress');
    progress.value = (progress.value === (progress.max - 1)) ? progress.max : min;
    progress.innerHTML = `Прогресс ходов текущей партии: ${(progress.value / 9 * 100).toFixed(1)}%`;
};

/**
 * Обновляет наличие пустых клеток на поле.
 * @param emptyMap   - массив координат пустых клеток
 * @param gameMap   - массив состояния поля после хода игрока, по-умолчанию используется основной массив игры
 */
let leftArrUpdate = (emptyMap = leftArr, gameMap = ticArr) => {
    if (emptyMap.length === 1) {
        emptyMap.splice(0, Number.MAX_VALUE);
    } else {
        if (emptyMap.length !== 0) {
            emptyMap.splice(0, Number.MAX_VALUE);
        }
        for (let i = 0; i < len; i++) {
            for (let key = 0; key < len; key++) {
                if (!gameMap[i][key]) {
                    emptyMap.push(`${i + 1}${key + 1}`);
                }
            }
        }
    }
};

let isGameOver = (pos, symb) => {
    let winner = magicLine(pos, symb, ticArr);
    if (leftArr[0] === undefined || winner) {    // Game is Over !
        // обновляем статус победителя в новом или ранее созданном DIV-элементе
        updateWinner(winner, symb);

        // меняем фигуры игроков для (по)следующей игры (также в меню)
        (zero.checked) ? cross.checked = true : zero.checked = true;

        toggleGame(document.querySelector('#playBtn'));
        return true;
    }
    if (gamer.comp === symb) document.querySelector('.hint').style.visibility = 'visible';
    gamer.swapCurrent();
    return false;
};

let updateWinner = (winLine, symb) => {
    let winnerStatus = 'Ничья !';
    if (winLine) {
        markWonLine(winLine);
        if (gamer.user === symb) {
            winnerStatus = 'Победил пользователь !';
            let scoreElem = document.getElementById('userScore');
            scoreElem.innerText++;
        } else {
            winnerStatus = 'Победил компьютер !';
            let scoreElem = document.getElementById('compScore');
            scoreElem.innerText++;
        }
    }
    // если DIV уже создан - просто меняем текст
    if (document.querySelector('#winnerInfo')) {
        document.querySelector('#winnerInfo').innerText = winnerStatus;
        document.querySelector('#winnerInfo').style.display = '';
    } else {
        let statusDiv = document.createElement('div');
        statusDiv.innerText = winnerStatus;
        statusDiv.setAttribute('class', 'winnerInfo');
        statusDiv.setAttribute('id', 'winnerInfo');
        document.body.insertBefore(statusDiv, document.querySelector('.progress'));
    }
};

let btnGame = (event) => toggleGame(event.target);

let toggleGame = (domElement) => {
    let scope = document.querySelectorAll('input');

    if (started) { // игра завершена
        for (let i = 0; i < scope.length; i++) {
            scope[i].removeAttribute('disabled');
        }
        domElement.innerText = 'Играть снова';
        domElement.style = '';
        leftArr = [];
        userStarts = !userStarts;
        started = false;
    } else {   // игра стартовала
        for (let i = 0; i < scope.length; i++) {
            scope[i].setAttribute('disabled', 'disabled');
        }
        progresUpdate(0);
        // clear battle field:
        scope = document.querySelectorAll('.row');
        for (let i = 0; i < scope.length; i++) {
            scope[i].firstChild.innerText = '';
            scope[i].style.backgroundColor = '';
        }
        domElement.innerText = 'Завершить игру';
        domElement.style.color = 'red';
        ticArr = [[], [], []];
        passType = (random_pass.checked) ? 'random' : 'smart';

        if (document.querySelector('#winnerInfo')) {
            document.querySelector('#winnerInfo').style.display = 'none';
        }
        gamer = new Players(
            (cross.checked) ? cross.value : zero.value,
            (cross.checked) ? zero.value : cross.value,
            userStarts);
        if (!userStarts) {
            leftArrUpdate();
            compPick();
        } else {
            document.querySelector('.hint').style.visibility = 'visible';
        }
        started = true;
    }
};

let markWonLine = (markArr) => {
    // markArr - массив вида [wonId, [coord1], [coord2]], где
    // wonId - ссылка на выиграшную позицию в массиве (из двух)
    // coord1, coord2 - координаты ячеек в линии для левой/правой диагоналий или столбца / строки,
    let wonId = markArr[0];
    for (let i = 0; i < len; i++) {
        let curElem = document.querySelector(`#${rowIdPrefix}${markArr[wonId][i]}`);
        curElem.style.backgroundColor = 'purple';
    }
};

document.querySelector('.game').addEventListener('click', userPick);
document.querySelector('#playBtn').addEventListener('click', btnGame);