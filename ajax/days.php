<?php
/**
 * Created by PhpStorm.
 * User: Mike
 * Date: 30.11.2017
 * Time: 15:48
 */
error_reporting(E_DEPRECATED);
$data = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
$resCnt = count($data);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['limit']) && isset($_GET['from'])) {
// принимает запросы с двумя параметрами: limit (количество возвращаемых элементов) и
// from (с какой позиции генерировать элементы).
    $from = $_GET['from'];
    $limit = $_GET['limit'];
    $callback = $_GET['callback'];

    $from = ($from < 1) ? 1 : $from;
    $limit = ($limit < 1) ? 1 : $limit;
    $k = $from;
    $from = ($from > $resCnt) ? $from % $resCnt : $from;
    if (!$from) $from = 7;

    $res = [];
    for ($i = $from - 1; $i < $from + $limit - 1; $i++) {
        $j = ($i >= $resCnt) ? $i % $resCnt : $i;
        $res[$k] = $data[$j];
        $k++;
    }

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/javascript; charset=utf-8');
    echo($callback . '(' . json_encode($res) . ')');
}