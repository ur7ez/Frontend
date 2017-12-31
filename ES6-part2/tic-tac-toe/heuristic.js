"use strict";

class Score {
    constructor(investigated, count, inrow) {
        this.investigated = investigated;  // всего клеток исследовано
        this.count = count;  // количество "своих" клеток в линии
        this.inrow = inrow;  // количество "своих" клеток идущих подряд
    }
}

class FieldScanner {
    /**
     * Считает количество занятых клеток в линии, в которой находится клетка хода, в
     * дипазоне x2 выйгрышной длины. Клетка хода учитывается. Подсчет ведется до ближайшей
     * клетки противника или границы поля.
     *
     * @param line - идентификатор исследуемой линии.
     * @param field - игровое поле.
     * @param winLength - длина выигрышной комбинации.
     * @param move - клетка хода.
     * @param player - игрок, сделавший ход.
     */
    static scoreLine(line, field, winLength, move, player) {
        let res1 = FieldScanner.scoreHalfLine(field, winLength, move, player, line[0], line[1]);
        let res2 = FieldScanner.scoreHalfLine(field, winLength, move, player, -line[0], -line[1]);

        /* Количество своих клеток */
        res1.count = res1.count + res2.count - 1;

        /* Полное количество исследованных клеток */
        res1.investigated = res1.investigated + res2.investigated - 1;

        /* Количество своих клеток идущих подряд */
        res1.inrow = res1.inrow + res2.inrow - 1;

        return res1;
    }

    /**
     * Считает количество занятых клеток в линии, в которой находится клетка хода, в
     * дипазоне выйгрышной длины. Клетка хода учитывается в каждом допустимом направлении.
     *
     * @param field - игровое поле.
     * @param winLength - длина выигрышной комбинации.
     * @param move - клетка хода.
     * @param player - игрок, сделавший ход.
     * @param rowInc - инкремент строк.
     * @param colInc - инкремент столбцов.
     * @return Score
     * объект, содержащий информацию о том, сколько всего клеток исследовано,
     *         количестве "своих" клеток в исследуемой линии и количество "своих" клеток,
     *         идущих подряд.
     */
    static scoreHalfLine(field, winLength, move, player, rowInc, colInc) {
        let r = move[0] + rowInc;
        let c = move[1] + colInc;
        let res = new Score();
        /* Берем в расчет начальную клетку */
        res.count = 1;
        res.inrow = 1;
        res.investigated = 1;
        /* Ключ указывающий на то, что "свои" клетки идут подряд */
        let inRow = true;
        /*
         * Пока индексы в пределах поля, не встречена чужая клетка и длина иследуемого
         * ряда не превышает winLength...
         */
        while ((res.investigated < winLength)
        && (r >= 0) && (r < field.length)
        && (c >= 0) && (c < field.length)
        && (field[r][c] === player || field[r][c] === undefined || field[r][c] === null)) {
            if (field[r][c] === player) {
                res.count++;
                if (inRow) res.inrow++;
            } else {
                inRow = false;
            }
            res.investigated++;
            r += rowInc;
            c += colInc;
        }
        return res;
    }
}

/** ------------------------------------------------------------------------------------------ */

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
 * @param figure - объект параметров игроков
 */
export let heuristic = (field, emptyCells, figure) => {
    let curMap;
    let curPlayer = figure.current;
    let curEmpty = emptyCells.slice();   //собственная копия массива незанятых клеток
    // перемешиваем массив пустых клеток для разнообразия ходов
    curEmpty.sort((a, b) => {
        return Math.random() - 0.5;
    });

    let _scoresArr = [];   // вспомагательный массив оценок F(m) для каждого пустого поля из среза emptyCells
    let maxScore = 0;
    let resultId = curEmpty[0];
    console.clear();

    for (let i = 0; i < curEmpty.length; i++) {
        curMap = copy(field);   //снимок текущего состояния игрового поля
        ticArrUpdate(curEmpty[i], curPlayer, curMap);

        let move = [curEmpty[i][0] - 1, curEmpty[i][1] - 1];

        if (magicLine(move, curPlayer, curMap)) {
            return curEmpty[i];
        }

        // logger('/------------------------------------------------------/');
        logger(`Шаг № ${i}. Анализ координаты: ${move[0] + 1}:${move[1] + 1}`, [700, 'blue', 'yellow']);
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

/** ------------------------------------------------------------------------------------------ */

/**
 * Оценка полезности хода по 4-м направлениям (результат функции F(m))
 * @param position - координаты предполагаемого хода
 * @param player - объект параметров игроков
 * @param field - анализируемое (виртуальное) состояние поля игры с учетом предполагаемого хода
 */
let score = (position, player, field) => {
    let res = 0;
    let winLength = field.length;
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
        _score = FieldScanner.scoreLine(lines[line], field, winLength, position, player.current);
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
    let player2 = (player.current === player.comp) ? player.user : player.comp;
    for (let line in lines) {
        _score = FieldScanner.scoreLine(lines[line], field, winLength, position, player2);
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
        throw new Error(`Illegal argument passed: ${k}`);
    }
    if (k === 1) {
        return k;
    } else {
        return k * f(k - 1);
    }
};

/**
 * Ищет выигрышную комбинацию в снимке игрового поля (текущем или "подставном").
 * @param pos   - координата последнего хода игрока. Пока не использую
 * @param symb  - фигура игрока ('X' или 'O')
 * @param arr   - массив состояния игрового поля, как правило - основной массив игры ticArr
 * @return array || boolean
 * Возвращает координаты выиграшной линии, или false - если такой нет в текущем снимке игрового поля.
 */
export let magicLine = (pos, symb, arr) => {
    let wonLine = [, [], []];
    /** Проверяем диагонали */
    let toright = true, toleft = true, len = arr.length;
    for (let i = 0; i < len; i++) {
        toright &= (arr[i][i] === symb);
        toleft &= (arr[len - i - 1][i] === symb);
        wonLine[1][i] = `${i + 1}${i + 1}`;
        wonLine[2][i] = `${len - i}${i + 1}`;
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
            wonLine[1][row] = `${col + 1}${row + 1}`;
            wonLine[2][row] = `${row + 1}${col + 1}`;
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

/**
 * Обновляет массив текущего состояния клеток на поле. Если передается "подставной" массив,
 * нужно позаботится о приведении его к состоянию основного массива игры (ticArr)
 * @param pos   - координаты позиции игрока
 * @param figure    - фигура игрока, сделавшего ход
 * @param gameMap   - массив для обновления состояния поля после хода игрока (накопительно)
 */
export let ticArrUpdate = (pos, figure, gameMap) => {
    gameMap[pos[0] - 1][pos[1] - 1] = figure;
};

let copy = (jsonLikeObject) => JSON.parse(JSON.stringify(jsonLikeObject));

let logger = (arg, styles = [100, 'inherit', 'inherit'], useLogger = false) => {
    if (useLogger) {
        console.log(`%c${arg}`, `font-weight:${styles[0]};color:${styles[1]};background:${styles[2]}`);
    }
};