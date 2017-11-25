/*
Задача №1

Написать скрипт, который выводит в консоль дерево DOM тела (body) текущей страницы, задавая отступы с учетом вложенности элементов. Примерный вывод:

#text:
H1
- #text: Домашнее задание по JavaScript в браузере. DOM
SECTION
- #text:
- H2
-- #text: Задача №1
- #text
- P
...

*/

function DOM(elem, level) {
    var elemCollection = elem.childNodes;
    if (arguments.length === 1 || elemCollection.length === 0) {
        level = 0;
    } else {
        level++;
    }
    for (var i = 0; i < elemCollection.length; i++) {
        var treeInfo = logDOM(elemCollection[i]);
        console.log('%c' + showLevel(level) + treeInfo[0], treeInfo[1]);
        DOM(elemCollection[i], level);
    }
}

function showLevel(lvl) {
    if (!lvl) {
        return '';
    }
    return Array(lvl+1).join('-');
    /*
    if ('repeat' in String.prototype) {
        return '-'.repeat(lvl);
    }
    var s = [].fill.call({length: lvl}, '-');
    return [].join.call(s, '') + ' ';
    */
}

function logDOM(anyElement) {
    var logVar = '';
    var color;
    if (!('nodeType' in anyElement)) {
        return false;
    }
    switch (anyElement.nodeType) {
        case 1: //Узел элемента
            logVar = anyElement.nodeName;
            color = 'purple';
            break;
        case 3: //Текстовый узел (#text)
            logVar = anyElement.nodeName + ": " + (anyElement.nodeValue).trim();
            color = 'gray';
            break;
        case 7: //Узел инструкции обработки
            logVar = "(" + anyElement.nodeType + ")" + anyElement.nodeName + ": " + anyElement.nodeValue;
            color = 'green';
            break;
        case 8: //Узел комментария (#comment)
            logVar = anyElement.nodeName + ": " + anyElement.nodeValue;
            color = 'green';
            break;
        case 9: //Узел документа (#document)
            logVar = anyElement.nodeName + ": " + anyElement.nodeValue;
            color = '#666';
            break;
        case 10: //Узел типа документа
            logVar = anyElement.nodeName + ": " + anyElement.nodeValue;
            color = '#666';
            break;
        case 11: //Узел фрагмента документа
            logVar = "(" + anyElement.nodeType + ")" + anyElement.nodeName + ": " + anyElement.nodeValue;
            color = '#666';
    }
    return [logVar, 'font-weight:700;color:' + color];
}

console.clear();
var bodyElements = document.body;
DOM(bodyElements);
// document.addEventListener("DOMContentLoaded", function (bodyElements) {
//     DOM(bodyElements);
// });