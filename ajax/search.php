<?php
/**
 * Created by PhpStorm.
 * User: Mike
 * Date: 30.11.2017
 * Time: 15:48
 */
/*
 * Серверная часть. Список подсказок: "javascript", "java", "download", "downtown", "Dow!", "Ad".
 * Подсказка "Ad" возвращается при любом присланном тексте, все остальные - при совпадении по первым символам.
 * В качестве результатов присылаются произвольный заголовок и описание для каждого результата, заголовок должен содержать подсказку, описание должно иметь два вхождения подсказки.
 */
error_reporting(E_DEPRECATED);
$hints = [
    "javascript", "java", "download", "downtown", "Dow!", "Ad",
];
$data = [
    [
        'header' => 'Справочники по java',
        'description' => 'Полные руководства, справочник по теме java. Для тех, кто ищет java - самый правильный ресурс.'
    ],
    [
        'header' => 'JavaScript в браузере',
        'description' => 'Серверная часть. Список подсказок: "javascript", "java", "download", "downtown", "Dow!", "Ad". Подсказка "Ad" возвращается при любом присланном тексте, все остальные - при совпадении по первым символам. В качестве результатов присылаются произвольный заголовок и описание для каждого результата, заголовок должен содержать подсказку, описание должно иметь два вхождения подсказки.javascript'
    ],
    [
        'header' => 'Downtown Radio | The Home of Great Music - Planet Radio',
        'description' => 'Listen live to your favourite music and presenters at Downtown Radio. Keep up with the latest news and shows, enter competitions, and check out our playlists<br><a href="https://planetradio.co.uk/downtown/" target="_blank">https://planetradio.co.uk/downtown/</a>'
    ],
    [
        'header' => 'Dow! Chemical',
        'description' => 'The Dow! Chemical Company is a leader in specialty chemicals delivering products and solutions to markets such as electronics, water, packaging, energy, and coatings.
‎About Dow! · ‎Dow! India · ‎Dow! Thailand · ‎Dow! eLibrary<br><a href="https://www.dow.com" target="_blank">The Dow! Chemical Company - Home</a>'
    ],
];

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['q']) && $_GET['q'] !== '') {
    // шлем подсказки
    $search = strtolower($_GET['q']);
    $hint = array_filter($hints, function ($val) {
        return ($val === 'Ad' || strpos(strtolower($val), $GLOBALS['search']) !== false);
    });
    asort($hint);
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');
    echo json_encode(array_values($hint));
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['search']) && $_POST['search'] !== '') {
    // шлем результат выбора - заголовок (содержит подсказку) и описание (имеет >=2 вхождения подсказки

    $result = strtolower($_POST['search']);
    $res = array_filter($data, function ($val) {
        return (substr_count(strtolower($val['header']), $GLOBALS['result']) >= 1)
            && (substr_count(strtolower($val['description']), $GLOBALS['result']) >= 2);
    });
    if (!count($res)) {
        echo '';
        die();
    }
    $result = json_encode(array_values($res));   //to ensure we have an array output in JSON, not an Object
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');
    echo $result;
}