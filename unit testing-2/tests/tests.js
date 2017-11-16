// Написать тесты, используя QUnit для каждой функции: leadZero, sum, formatDate, formatDateAgo (не менее 5 тестов на каждую). Использовать ok, equal, strictEqual, notOk.

QUnit.module("Dashboard");

for (var i = 0; i < testPack.length; i++) {
    var funcName = testPack[i].name;

    QUnit.test(funcName, (function (curTest) {
            return function (assert) {
                var mock = curTest.mock || null;
                // console.log(curTest.name, mock);
                if (mock) {
                    eval(mock);
                }
                for (var j = 0; j < curTest.tests.length; j++) {
                    var result = curTest.func.apply(null, curTest.tests[j][0]);
                    var expected = curTest.tests[j][1];
                    //var randTest = Math.round(0.5 + Math.random() * 4);
                    var randTest = 1;
                    switch (randTest) {
                        case 1:
                            assert.ok(
                                result == expected,
                                curTest.name + '(' + curTest.tests[j][0] + ') is ' + result
                                + ', expected: ' + expected + ' -' + ' OK');
                            break;
                        case 2:
                            assert.equal(
                                result,
                                expected,
                                curTest.name + '(' + curTest.tests[j][0] + ') equals to ' + expected + ' - Equal');
                            break;
                        case 3:
                            assert.strictEqual(
                                result,
                                expected,
                                curTest.name + '(' + curTest.tests[j][0] + ') strictly equals to ' +
                                result + ', expected: ' + expected + ' - strictEqual');
                            break;
                        case 4:
                            assert.notOk(
                                result !== expected,
                                curTest.name + '(' + curTest.tests[j][0] + ')' + ' = ' + result
                                + ', is not ' + expected + ' - notOK');
                            break;
                    }
                }
            }
        })(testPack[i])
    );
}
