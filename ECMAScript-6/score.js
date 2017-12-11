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