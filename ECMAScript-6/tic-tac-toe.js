// Задача №4

// Написать игру "крестики-нолики", режим "играть против компьютера". При старте игры можно задать два уровня "интеллекта" программы: с рандомными ходами, или с ходами, максимизирующими шансы на победу программы. Игрок и программа после каждого раунда меняются: играют то за крестик, то за нолик. При написании кода использовать ES6.
"use strict";

let started = false;
let ticArr = [[], [], []];
let len = ticArr.length;
let winLength = len;
let leftArr = [];
let userStarts = true; // периодическая смена права первого хода (начинает игрок)
let figureUser = (cross.checked) ? cross.value : zero.value;
let figureComp = (cross.checked) ? zero.value : cross.value;
let passType;
let useLogger = false;
const rowIdPrefix = 'cell_';

let userPick = (event) => {
    if (!started) return;
    let curElem = event.target;
    if (curElem.getAttribute('class') === 'row' && !curElem.firstChild.innerText) {
        document.querySelector('.hint').style.visibility = 'hidden';
        curElem.firstChild.innerText = figureUser;
        curElem.firstChild.style.color = 'blue';
        let id = curElem.getAttribute('id').replace(rowIdPrefix, '');

        ticArrUpdate(id, figureUser);
        leftArrUpdate();
        progresUpdate();
        if (!isGameOver(id, figureUser)) compPick();
    }
};

let compPick = () => {
    started = false;
    let id, curElem;
    if (passType === 'random') { // случайный ход компьютера
        id = (leftArr.length === 1) ? leftArr[0] : leftArr[randomInteger(0, leftArr.length - 1)];
    } else { // стратегия, максимизирующий шансы на победу
        if (isEmpty(ticArr)) {
            let startingPoint = [
                '11',
                '1' + len,
                len + '1',
                '' + len + len,
                '' + Math.round(len / 2) + Math.round(len / 2),
            ];
            id = startingPoint[randomInteger(0, startingPoint.length - 1)];
        } else {
            if (useLogger) console.clear();
            id = (leftArr.length === 1) ? leftArr[0] : heuristic(ticArr, leftArr, figureComp);
        }
    }

    curElem = document.querySelector('#' + rowIdPrefix + id);
    curElem.firstChild.innerText = figureComp;
    curElem.firstChild.style.color = 'red';

    ticArrUpdate(id, figureComp);
    leftArrUpdate();
    progresUpdate();

    started = true;
    isGameOver(id, figureComp);
};

/** ------------------------------------------------------------------------------------------ */

let logger = (arg, styles = [100, 'inherit', 'inherit']) => {
    if (useLogger) {
        console.log('%c' + arg, `font-weight:${styles[0]};color:${styles[1]};background:${styles[2]}`)
    }
};

/** Эвристическая оценка состояния игрового поля (по идее http://www.dokwork.ru/2012/11/tictactoe.html):
 * анализируем ход в каждой из оставшихся пустых клеток поля с помощью функции оценки хода
 *                                      F(m) = G(m) + Q(m),
 * где m - оцениваемый ход, G(m) - оценка пользы от хода для игрока, Q(m) - оценка степени вредительства противнику.
 * В качестве меры хода будем использовать длину собираемой комбинации k и длину нарушаемой комбинации противника k'
 * в каждом из возможных четырех направлений (по вертикали, по горизонтали и в двух диагоналях):
 *                                      F(m) = Σ[G(k) + Q(k')], сумма для 4-х направлений
 * В качестве G и Q были выбраны следующие функции:
 *                                    | G(k) = ∞, k >= W
 *                                    | G(k) = (k + 2)!, k < W
 *                                    | Q(k') = (k' + 2)!, k' ∈ N
 * где W - длина выигрышной комбинации
 *
 * @param field - текущее состояние игрового поля
 * @param emptyCells - не занятые клетки поля (срез)
 * @param figure - фигура текущего игрока
 */
let heuristic = (field, emptyCells, figure) => {
    let curMap;
    let curEmpty = emptyCells.slice();   //собственная копия массива незанятых клеток
    // перемешаем массив пустых клеток для разнообразия ходов
    curEmpty.sort((a, b) => {
        return Math.random() - 0.5;
    });
    let _scoresArr = [];   // вспомагательный массив оценок F(m) для каждого пустого поля из среза emptyCells
    let maxScore = 0;
    let resultId = curEmpty[0];

    for (let i = 0; i < curEmpty.length; i++) {
        curMap = copy(field);   //снимок текущего состояния игрового поля
        ticArrUpdate(curEmpty[i], figure, curMap);

        let move = [curEmpty[i][0] - 1, curEmpty[i][1] - 1];

        if (magicLine(move, figure, curMap)) {
            return curEmpty[i];
        }

        logger(`Шаг № ${i}. Анализ координаты: ${move[0]}:${move[1]}`, [700, 'blue', 'yellow']);
        logger(`Игровое поле field: ${JSON.stringify(curMap)}`);
        let curScore = score(move, figure, curMap);
        logger(`Текущая интегральная оценка F(m): ${curScore}`, [700, 'pink', 'white']);
        _scoresArr[i] = [curEmpty[i], curScore];

        if (curScore === Number.MAX_VALUE) {
            return curEmpty[i];
        }
        if (curScore > maxScore) {
            maxScore = curScore;
            resultId = curEmpty[i];
        }
    }
    return resultId;
};

/**
 * Оценка полезности хода по 4-м направлениям (результат функции F(m))
 * @param position - координаты предполагаемого хода
 * @param player - фигура игрока
 * @param field - анализируемое (виртуальное) состояние поля игры с учетом предполагаемого хода
 */
let score = (position, player, field) => {
    let res = 0;
    let lines = [
        [0, -1], /** Строка */
        [-1, 0], /** Столбец */
        [-1, -1], /** Диагональ \ */
        [-1, 1]  /** Диагональ / */
    ];
    let linesD = ['Строка', 'Столбец', 'Диагональ \\', 'Диагональ /'];
    let _score;
    /* Оценка длины ряда для игрока */
    for (let line in lines) {
        _score = FieldScanner.scoreLine(lines[line], field, winLength, position, player);
        logger(`Объект оценок для игрока (${linesD[line]}): ${JSON.stringify(_score)}`);
        if (_score.investigated < winLength) {
            continue;
        }
        if (_score.inrow >= winLength) {
            res = Number.MAX_VALUE;
            return res;
        }
        res += G(_score.inrow) + _score.count;
    }
    logger(`Оценка для игрока G(k): ${res}`);
    /* Оценка длины ряда для противника */
    player = (player === figureComp) ? figureUser : figureComp;
    for (let line in lines) {
        _score = FieldScanner.scoreLine(lines[line], field, winLength, position, player);
        logger(`Объект оценок для противника (${linesD[line]}): ${JSON.stringify(_score)}`);
        if (_score.investigated < winLength) {
            continue;
        }
        res += Q(_score.inrow) + _score.count;
    }
    return res;
};

/** Оценка пользы от хода для игрока */
let G = (k) => f(k + 2);

/** Оценка степени вредительства противнику */
let Q = (k) => f(k + 2);

/** Факториал k */
let f = (k) => {
    if (k < 0) {
        throw new Error('Illegal argument passed: ' + k);
    }
    if (k === 1) {
        return k;
    } else {
        return k * f(k - 1);
    }
};

/** ------------------------------------------------------------------------------------------ */

let randomInteger = (min, max) => Math.round(Math.abs(min - 0.5 + Math.random() * (max - min + 1)));

let copy = (jsonLikeObject) => JSON.parse(JSON.stringify(jsonLikeObject));

let isEmpty = (object) => ('length' in object) ? (object.join('') === "") : (JSON.stringify(object) === "{}");

let progresUpdate = (min = 9 - leftArr.length) => {
    let progress = document.querySelector('progress');
    progress.value = (progress.value === (progress.max - 1)) ? progress.max : min;
    progress.innerHTML = ((progress.value / 9 * 100).toFixed(1)) + '%';
};

/**
 * Обновляет массив текущего состояния клеток на поле. Если передается "подставной" массив,
 * нужно позаботится о приведении его к состоянию основного массива игры (ticArr)
 * @param pos   - координаты позиции игрока
 * @param figure    - фигура игрока, сделавшего ход
 * @param gameMap   - массив для обновления состояния поля после хода игрока (накопительно)
 */
let ticArrUpdate = (pos, figure, gameMap = ticArr) => {
    gameMap[pos[0] - 1][pos[1] - 1] = figure;
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
                    emptyMap.push('' + (i + 1) + (key + 1));
                }
            }
        }
    }
};

let figureSelect = (event) => {
    let curElem = event.target;
    if (curElem.tagName === 'INPUT') {
        if (figureUser !== curElem.getAttribute('value')) {
            figureComp = figureUser;
            figureUser = curElem.getAttribute('value');
        }
    }
};

let isGameOver = (pos, symb) => {
    let winner = magicLine(pos, symb);
    if (leftArr[0] === undefined || winner) {    // Game is Over !
        // обновляем статус победителя в новом или ранее созданном DIV-элементе
        updateWinner(winner, symb);

        // меняем фигуры игроков для (по)следующей игры (также в меню)
        [figureUser, figureComp] = [figureComp, figureUser];
        (zero.checked) ? cross.checked = true : zero.checked = true;

        toggleGame(document.querySelector('#playBtn'));
        return true;
    }
    if (figureComp === symb) document.querySelector('.hint').style.visibility = 'visible';
    return false;
};

let updateWinner = (winLine, symb) => {
    let winnerStatus = 'Ничья !';
    if (winLine) {
        markWonLine(winLine);
        winnerStatus = (figureUser === symb) ? 'Победил пользователь !' : 'Победил компьютер !';
    }
    // если DIV уже создан - просто меняем текст
    if (document.querySelector('.winnerInfo')) {
        document.querySelector('.winnerInfo').innerText = winnerStatus;
        document.querySelector('.winnerInfo').style.display = '';
    } else {
        let statusDiv = document.createElement('div');
        statusDiv.innerText = winnerStatus;
        statusDiv.setAttribute('class', 'winnerInfo');
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

        if (document.querySelector('.winnerInfo')) {
            document.querySelector('.winnerInfo').style.display = 'none';
        }
        if (!userStarts) {
            leftArrUpdate();
            compPick();
        } else {
            document.querySelector('.hint').style.visibility = 'visible';
        }
        started = true;
    }
};

/**
 * Ищет выигрышную комбинацию в снимке игрового поля (текущем или "подставном").
 * @param pos   - координата последнего хода игрока. Пока не использую
 * @param symb  - фигура игрока ('X' или 'O')
 * @param arr   - массив состояния игрового поля, по умолчанию - основной массив игры ticArr
 * @return array || boolean
 * Возвращает координаты выиграшной линии, или false - если такой нет в текущем снимке игрового поля.
 */
let magicLine = (pos, symb, arr = ticArr) => {
    let wonLine = [, [], []];
    /** Проверяем диагонали */
    let toright = true, toleft = true;
    for (let i = 0; i < len; i++) {
        toright &= (arr[i][i] === symb);
        toleft &= (arr[len - i - 1][i] === symb);
        wonLine[1][i] = '' + (i + 1) + (i + 1);
        wonLine[2][i] = '' + (len - i) + (i + 1);
    }
    if (toright || toleft) {
        wonLine[0] = (toright) ? 1 : 2;
        return wonLine;
    }
    /** Проверяем горизонтальные и вертикальные линии */
    let cols, rows;
    for (let col = 0; col < len; col++) {
        cols = rows = true;
        for (let row = 0; row < len; row++) {
            rows &= (arr[col][row] === symb);
            cols &= (arr[row][col] === symb);
            wonLine[1][row] = '' + (col + 1) + (row + 1);
            wonLine[2][row] = '' + (row + 1) + (col + 1);
        }
        // Это условие после каждой проверки колонки и столбца
        // позволяет остановить дальнейшее выполнение, без проверки
        // всех остальных столбцов и строк.
        if (cols || rows) {
            wonLine[0] = (cols) ? 2 : 1;
            return wonLine;
        }
    }
    return false;
};

let markWonLine = (markArr) => {
    // markArr - массив вида [wonId, [coord1], [coord2]], где
    // wonId - ссылка на выиграшную позицию в массиве (из двух)
    // coord1, coord2 - координаты ячеек в линии для левой/правой диагоналий или столбца / строки,
    let wonId = markArr[0];
    for (let i = 0; i < len; i++) {
        let curElem = document.querySelector('#' + rowIdPrefix + markArr[wonId][i]);
        curElem.style.backgroundColor = 'purple';
    }
};

document.querySelector('.game').addEventListener('click', userPick);
document.querySelector('.figures').addEventListener('click', figureSelect);
document.querySelector('#playBtn').addEventListener('click', btnGame);