<?php
ini_set('display_errors', true);
error_reporting (E_ALL | E_STRICT);

include_once('php-iban.php');


if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
    $postdata = json_decode(file_get_contents('php://input'), true);
    if (verify_iban($postdata['nummer']) == 1) echo '{"valid" : "yes"}' ;
    else echo '{"invalid" : "yes"}';
    return;
}





