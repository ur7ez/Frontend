<?php
/**
 * Created by PhpStorm.
 * User: Mike
 * Date: 16.12.2017
 * Time: 16:38
 */

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['q']) && isset($_GET['lang'])) {
    $q = $_GET['q'];
    $lang = $_GET['lang'];
    $APIkey = '0a2e760f561341c585703421171412';
}
require_once 'infoCache.php';
$rCache = new InfoCache('wxWidget_' . $q . '_' . $lang);
//$rCache->expired = 10 мин;

//пробуем получить данные из кэша
try {
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');

    if (FALSE === ($data = $rCache->get())) {
        //если данные в кэше устарели, пытаемся получить их от сервера
        $data = @file_get_contents(
            'https://api.apixu.com/v1/current.json'
            . '?key=' . $APIkey . '&q=' . $q . '&lang=' . $lang
        );
        //если сервер недоступен, пробуем получить данные из устаревшего кеша
        if (FALSE === $data) {
            $data = $rCache->get(TRUE);
        } else {
            $data = json_decode($data, true);
            $data['url'] = trim($_SERVER['SCRIPT_NAME'], __FILE__);
            $data = json_encode($data);
            //обновляем данные в кэше, предварительно изменяем кодировку на UTF-8
            $rCache->save(iconv('windows-1251', 'utf-8', $data));
        }
    }
    if (FALSE !== $data) {

        die($data);
    }
} catch (Exception $e) {
    //отправляем сообщение об ошибке
    echo "Выброшено исключение: " . $e->getMessage();
}