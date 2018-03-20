<?php

require_once 'class/api.php';
require_once 'class/mail.php';

$api  = new Api();
$mail = new Mail();

switch ((string) $_GET['url']) {

    case 'mail':
        return $mail->send($_POST);

    case 'mail/token':
        return $mail->generateToken();

    default:
        $api->error(404);
        return $api->response("Not found");
}