angular.module('mySelect', [])
    .controller('optionsController', ['$scope', function ($scope) {
        $scope.players = [
            {
                id: 1,
                name: 'ПЕЛЕ',
                country: 'Бразилия',
                champ_years: '1958, 1962, 1966, 1970',
                matches_goals: '14/12'
            }, {
                id: 2,
                name: 'Диего МАРАДОНА',
                country: 'Аргентина',
                champ_years: '1982, 1986, 1990, 1994',
                matches_goals: '21/8'
            }, {
                id: 3,
                name: 'Франц БЕККЕНБАУЭР',
                country: 'ФРГ',
                champ_years: '1966, 1970, 1974',
                matches_goals: '18/5'
            }, {
                id: 4,
                name: 'РОНАЛДО',
                country: 'Бразилия',
                champ_years: '1994, 1998, 2002, 2006',
                matches_goals: '19/15'
            }, {
                id: 5,
                name: 'Зинедин ЗИДАН',
                country: 'Франция',
                champ_years: '1998, 2002, 2006',
                matches_goals: '12/5'
            }, {
                id: 6,
                name: 'Йохан КРОЙФФ',
                country: 'Голландия',
                champ_years: '1974',
                matches_goals: '7/3'
            }, {
                id: 7,
                name: 'Лотар МАТТЕУС',
                country: 'ФРГ/Германия',
                champ_years: '1982, 1986, 1990, 1994, 1998',
                matches_goals: '25/6'
            }, {
                id: 8,
                name: 'Герд МЮЛЛЕР',
                country: 'ФРГ',
                champ_years: '1970, 1974',
                matches_goals: '13/14'
            }, {
                id: 9,
                name: 'ГАРРИНЧА',
                country: 'Бразилия',
                champ_years: '1958, 1962, 1966',
                matches_goals: '12/5'
            }, {
                id: 10,
                name: 'Мишель ПЛАТИНИ',
                country: 'Франция',
                champ_years: '1978, 1982, 1986',
                matches_goals: '14/5'
            }, {
                id: 11,
                name: 'ЭЙСЕБИО',
                country: 'Португалия',
                champ_years: '1966', matches_goals:
                    '6/9'
            }, {
                id: 12,
                name: 'Паоло МАЛЬДИНИ',
                country: 'Италия',
                champ_years: '1990, 1994, 1998, 2002',
                matches_goals: '23/0'
            }, {
                id: 13,
                name: 'ЖАИРЗИНЬЮ',
                country: 'Бразилия',
                champ_years: '1966, 1970, 1974',
                matches_goals: '16/9'
            }, {
                id: 14,
                name: 'Бобби ЧАРЛЬТОН',
                country: 'Англия',
                champ_years: '1962, 1966, 1970',
                matches_goals: '14/4'
            }, {
                id: 15,
                name: 'ХАВИ',
                country: 'Испания',
                champ_years: '2002, 2006, 2010',
                matches_goals: '14/0'
            }, {
                id: 16,
                name: 'РОМАРИО',
                country: 'Бразилия',
                champ_years: '1990, 1994',
                matches_goals: '8/5'
            }, {
                id: 17,
                name: 'Жюст ФОНТЕН',
                country: 'Франция',
                champ_years: '1958',
                matches_goals: '6/13'
            }, {
                id: 18,
                name: 'Паоло РОССИ',
                country: 'Италия',
                champ_years: '1978, 1982, 1986',
                matches_goals: '14/9'
            }, {
                id: 19,
                name: 'Дино ДЗОФФ',
                country: 'Италия',
                champ_years: '1970, 1974, 1978, 1982',
                matches_goals: '17/-17'
            }, {
                id: 20,
                name: 'Бобби МУР',
                country: 'Англия',
                champ_years: '1962, 1966, 1970',
                matches_goals: '14/0'
            }, {
                id: 21,
                name: 'Ференц ПУШКАШ',
                country: 'Венгрия',
                champ_years: '1954, 1962',
                matches_goals: '6/4'
            }, {
                id: 22,
                name: 'ЗИКО',
                country: 'Бразилия',
                champ_years: '1978, 1982, 1986',
                matches_goals: '14/5'
            }, {
                id: 23,
                name: 'РОНАЛДИНЬЮ',
                country: 'Бразилия',
                champ_years: '2002, 2006',
                matches_goals: '10/2'
            }, {
                id: 24,
                name: 'Роберто БАДЖО',
                country: 'Италия',
                champ_years: '1990, 1994, 1998',
                matches_goals: '16/9'
            }, {
                id: 25,
                name: 'КАФУ',
                country: 'Бразилия',
                champ_years: '1994, 1998, 2002, 2006',
                matches_goals: '20/0'
            }, {
                id: 26,
                name: 'Фабио КАННАВАРО',
                country: 'Италия',
                champ_years: '1998, 2002, 2006, 2010',
                matches_goals: '18/0'
            }, {
                id: 27,
                name: 'РИВАЛДО',
                country: 'Бразилия',
                champ_years: '1998, 2002',
                matches_goals: '14/8'
            }, {
                id: 28,
                name: 'Марио ЗАГАЛЛО',
                country: 'Бразилия',
                champ_years: '1958, 1962',
                matches_goals: '12/2'
            }, {
                id: 29,
                name: 'Йохан НЕСКЕНС',
                country: 'Голландия',
                champ_years: '1974, 1978',
                matches_goals: '12/5'
            }, {
                id: 30,
                name: 'Лев ЯШИН',
                country: 'СССР',
                champ_years: '1958, 1962, 1966',
                matches_goals: '13/18'
            }, {
                id: 31,
                name: 'Марио КЕМПЕС',
                country: 'Аргентина',
                champ_years: '1974, 1978, 1982',
                matches_goals: '18/8'
            }, {
                id: 32,
                name: 'Роберто РИВЕЛИНО',
                country: 'Бразилия',
                champ_years: '1970, 1974, 1978',
                matches_goals: '15/6'
            }, {
                id: 33,
                name: 'КРИШТИАНУ РОНАЛДУ',
                country: 'Португалия',
                champ_years: '2006, 2010',
                matches_goals: '10/2'
            }, {
                id: 34,
                name: 'КАРЛОС АЛБЕРТУ',
                country: 'Бразилия',
                champ_years: '1970',
                matches_goals: '7/1'
            }, {
                id: 35,
                name: 'РОБЕРТО КАРЛОС',
                country: 'Бразилия',
                champ_years: '1998, 2002, 2006',
                matches_goals: '17/1'
            }, {
                id: 36,
                name: 'Роже МИЛЛА',
                country: 'Камерун',
                champ_years: '1982, 1990, 1994',
                matches_goals: '10/5'
            }, {
                id: 37,
                name: 'Пауль БРАЙТНЕР',
                country: 'ФРГ',
                champ_years: '1974, 1982',
                matches_goals: '14/4'
            }, {
                id: 38,
                name: 'Лилиан ТЮРАМ',
                country: 'Франция',
                champ_years: '1998, 2002, 2006',
                matches_goals: '16/2'
            }, {
                id: 39,
                name: 'Карл-Хайнц РУММЕНИГГЕ',
                country: 'ФРГ',
                champ_years: '1978, 1982, 1986',
                matches_goals: '19/9'
            }, {
                id: 40,
                name: 'Джузеппе МЕАЦЦА',
                country: 'Италия',
                champ_years: '1934, 1938',
                matches_goals: '9/3'
            }, {
                id: 41,
                name: 'Гордон БЭНКС',
                country: 'Англия',
                champ_years: '1966, 1970',
                matches_goals: '9/-4'
            }, {
                id: 42,
                name: 'Оливер КАН',
                country: 'Германия',
                champ_years: '1994, 1998, 2002, 2006',
                matches_goals: '8/-4'
            }, {
                id: 43,
                name: 'Збигнев БОНЕК',
                country: 'Польша',
                champ_years: '1978, 1982, 1986',
                matches_goals: '16/6'
            }, {
                id: 44,
                name: 'Джанлуиджи БУФФОН',
                country: 'Италия',
                champ_years: '1998, 2002, 2006, 2010',
                matches_goals: '12/-8'
            }, {
                id: 45,
                name: 'Даниэль ПАССАРЕЛЛА',
                country: 'Аргентина',
                champ_years: '1978, 1982, 1986',
                matches_goals: '12/3'
            }, {
                id: 46,
                name: 'Франко БАРЕЗИ',
                country: 'Италия',
                champ_years: '1982, 1990, 1994',
                matches_goals: '10/0'
            }, {
                id: 47,
                name: 'Гари ЛИНЕКЕР',
                country: 'Англия',
                champ_years: '1986, 1990',
                matches_goals: '12/10'
            }, {
                id: 48,
                name: 'Джалма САНТОС',
                country: 'Бразилия',
                champ_years: '1954, 1958, 1962, 1966',
                matches_goals: '12/1'
            }, {
                id: 49,
                name: 'Нилтон САНТОС',
                country: 'Бразилия',
                champ_years: '1950, 1954, 1958, 1962',
                matches_goals: '12/1'
            }, {
                id: 50,
                name: 'Уве ЗЕЕЛЕР',
                country: 'ФРГ',
                champ_years: '1958, 1962, 1966, 1970',
                matches_goals: '21/9'
            }, {
                id: 51,
                name: 'Лионель МЕССИ',
                country: 'Аргентина',
                champ_years: '2006, 2010',
                matches_goals: '8/1'
            }, {
                id: 52,
                name: 'ТОСТАО',
                country: 'Бразилия',
                champ_years: '1966, 1970',
                matches_goals: '7/3'
            }, {
                id: 53,
                name: 'Андреас БРЕМЕ',
                country: 'ФРГ/Германия',
                champ_years: '1986, 1990, 1994',
                matches_goals: '16/4'
            }, {
                id: 54,
                name: 'Джефф ХЕРСТ',
                country: 'Англия',
                champ_years: '1966, 1970',
                matches_goals: '6/5'
            }, {
                id: 55,
                name: 'Зепп МАЙЕР',
                country: 'ФРГ',
                champ_years: '1970, 1974, 1978',
                matches_goals: '18/-18'
            }, {
                id: 56,
                name: 'Христо СТОИЧКОВ',
                country: 'Болгария',
                champ_years: '1994, 1998',
                matches_goals: '10/6'
            }, {
                id: 57,
                name: 'ВАВА',
                country: 'Бразилия',
                champ_years: '1958, 1962',
                matches_goals: '10/9'
            }, {
                id: 58,
                name: 'Шандор КОЧИШ',
                country: 'Венгрия',
                champ_years: '1954',
                matches_goals: '5/11'
            }, {
                id: 59,
                name: 'Луиш ФИГУ',
                country: 'Португалия',
                champ_years: '2002, 2006',
                matches_goals: '10/0'
            }, {
                id: 60,
                name: 'Марсель ДЕСАЙИ',
                country: 'Франция',
                champ_years: '1998, 2002',
                matches_goals: '10/0'
            }, {
                id: 61,
                name: 'Георге ХАДЖИ',
                country: 'Румыния',
                champ_years: '1990, 1994, 1998',
                matches_goals: '12/3'
            }, {
                id: 62,
                name: 'Джузеппе БЕРГОМИ',
                country: 'Италия',
                champ_years: '1982, 1986, 1990, 1998',
                matches_goals: '13/0'
            }, {
                id: 63,
                name: 'Фритц ВАЛЬТЕР',
                country: 'ФРГ',
                champ_years: '1954, 1958',
                matches_goals: '10/5'
            }, {
                id: 64,
                name: 'Карлес ПУЙОЛЬ',
                country: 'Испания',
                champ_years: '2002, 2006, 2010',
                matches_goals: '14/1'
            }, {
                id: 65,
                name: 'Андрес ИНЬЕСТА',
                country: 'Испания',
                champ_years: '2006, 2010',
                matches_goals: '7/2'
            }, {
                id: 66,
                name: 'Пол ГАСКОЙН',
                country: 'Англия',
                champ_years: '1990',
                matches_goals: '6/0'
            }, {
                id: 67,
                name: 'Гжегож ЛЯТО',
                country: 'Польша',
                champ_years: '1974, 1978, 1982',
                matches_goals: '20/10'
            }, {
                id: 68,
                name: 'Обдулио ВАРЕЛА',
                country: 'Уругвай',
                champ_years: '1950, 1954',
                matches_goals: '7/2'
            }, {
                id: 69,
                name: 'Хуан СКЬЯФФИНО',
                country: 'Уругвай',
                champ_years: '1950, 1954',
                matches_goals: '9/5'
            }, {
                id: 70,
                name: 'Альсидес ГИДЖА',
                country: 'Уругвай',
                champ_years: '1950',
                matches_goals: '4/4'
            }, {
                id: 71,
                name: 'Хельмут РАН',
                country: 'Германия',
                champ_years: '1954, 1958',
                matches_goals: '10/10'
            }, {
                id: 72,
                name: 'Франк ДЕ БУР',
                country: 'Голландия',
                champ_years: '1994, 1998',
                matches_goals: '11/0'
            }, {
                id: 73,
                name: 'Руд КРОЛ',
                country: 'Голландия',
                champ_years: '1974, 1978',
                matches_goals: '14/1'
            }, {
                id: 74,
                name: 'Элиас ФИГЕРОА',
                country: 'Чили',
                champ_years: '1966, 1974, 1982',
                matches_goals: '9/0'
            }, {
                id: 75,
                name: 'ЛЕОНИДАС',
                country: 'Бразилия',
                champ_years: '1934, 1938',
                matches_goals: '5/8'
            }, {
                id: 76,
                name: 'Георге ПОПЕСКУ',
                country: 'Румыния',
                champ_years: '1990, 1994, 1998',
                matches_goals: '13/0'
            }, {
                id: 77,
                name: 'Теофило КУБИЛЬЯС',
                country: 'Перу',
                champ_years: '1970, 1978, 1982',
                matches_goals: '13/10'
            }, {
                id: 78,
                name: 'Джей-Джей ОКОЧА',
                country: 'Нигерия',
                champ_years: '1994, 1998, 2002',
                matches_goals: '9/0'
            }, {
                id: 79,
                name: 'ДИДИ',
                country: 'Бразилия',
                champ_years: '1954, 1958, 1962',
                matches_goals: '15/3'
            }, {
                id: 80,
                name: 'Джанни РИВЕРА',
                country: 'Италия',
                champ_years: '1962, 1966, 1970, 1974',
                matches_goals: '9/4'
            }, {
                id: 81,
                name: 'Серхио БАТИСТА',
                country: 'Аргентина',
                champ_years: '1986, 1990',
                matches_goals: '11/0'
            }, {
                id: 82,
                name: 'Игорь БЕЛАНОВ',
                country: 'СССР',
                champ_years: '1986',
                matches_goals: '4/4'
            }, {
                id: 83,
                name: 'Сальваторе СКИЛЛАЧИ',
                country: 'Италия',
                champ_years: '1990',
                matches_goals: '7/6'
            }, {
                id: 84,
                name: 'Весли СНАЙДЕР',
                country: 'Голландия',
                champ_years: '2006, 2010',
                matches_goals: '11/5'
            }, {
                id: 85,
                name: 'БЕЛЛИНИ',
                country: 'Бразилия',
                champ_years: '1958, 1962, 1966',
                matches_goals: '8/0'
            }, {
                id: 86,
                name: 'Алессандро ДЕЛЬ ПЬЕРО',
                country: 'Италия',
                champ_years: '1998, 2002, 2006',
                matches_goals: '12/2'
            }, {
                id: 87,
                name: 'Луис МОНТИ',
                country: 'Аргентина/Италия',
                champ_years: '1930, 1934',
                matches_goals: '9/2'
            }, {
                id: 88,
                name: 'Томас Н\'КОНО',
                country: 'Камерун',
                champ_years: '1982, 1990, 1994',
                matches_goals: '8/10'
            }, {
                id: 89,
                name: 'Клаудио ДЖЕНТИЛЕ',
                country: 'Италия',
                champ_years: '1978, 1982',
                matches_goals: '13/0'
            }, {
                id: 90,
                name: 'БЕБЕТО',
                country: 'Бразилия',
                champ_years: '1990, 1994, 1998',
                matches_goals: '15/6'
            }, {
                id: 91,
                name: 'Эктор ЧУМПИТАС',
                country: 'Перу',
                champ_years: '1970, 1978',
                matches_goals: '10/1'
            }, {
                id: 92,
                name: 'Драган СТОЙКОВИЧ',
                country: 'Югославия',
                champ_years: '1990, 1998',
                matches_goals: '9/3'
            }, {
                id: 93,
                name: 'Маттиас ЗИНДЕЛАР',
                country: 'Австрия',
                champ_years: '1934',
                matches_goals: '3/1'
            }, {
                id: 94,
                name: 'Ринат ДАСАЕВ',
                country: 'СССР',
                champ_years: '1982, 1986, 1990',
                matches_goals: '9/-9'
            }, {
                id: 95,
                name: 'Филипп ЛАМ',
                country: 'Германия',
                champ_years: '2006, 2010',
                matches_goals: '13/1'
            }, {
                id: 96,
                name: 'Юрген КЛИНСМАНН',
                country: 'Германия',
                champ_years: '1990, 1994, 1998',
                matches_goals: '17/11'
            }, {
                id: 97,
                name: 'Антонио КАБРИНИ',
                country: 'Италия',
                champ_years: '1978, 1982, 1986',
                matches_goals: '18/1'
            }, {
                id: 98,
                name: 'ЛЕОНАРДО',
                country: 'Бразилия',
                champ_years: '1994, 1998',
                matches_goals: '11/0'
            }, {
                id: 99,
                name: 'Джачинто ФАККЕТТИ',
                country: 'Италия',
                champ_years: '1966, 1970, 1974',
                matches_goals: '12/0'
            }, {
                id: 100,
                name: 'Томас БРОЛИН',
                country: 'Швеция',
                champ_years: '1990, 1994',
                matches_goals: '10/4'
            },
        ];
        $scope.fp = $scope.players[0];
    }])
    .directive('myPlayer', function () {
        return {
            templateUrl: 'fplayer_info.html'
        };
    });
