<?php

function formatValue($value) {
    return htmlspecialchars(stripslashes(trim($value)));
 }

$time = (int) $_POST['time'];

if ($time === (int) $_COOKIE['contactTime'] || $time + 3 >= time()) {
    http_response_code(400);
    die("Formulaire invalide.");
}

$email = formatValue((string) $_POST['email']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(406);
    die("Adresse email invalide.");
}

$name    = substr(formatValue((string) $_POST['name']), 0, 30);
$phone   = substr(formatValue((string) $_POST['phone']), 0, 20);
$address = substr(formatValue(preg_replace("/(.*)(\s+)(\d{5}.*)/", "$1\n$3", (string) $_POST['address'])), 0, 200);
$message = formatValue((string) $_POST['message']);

$to = 'j.mons54@gmail.com';

$subject = '[MOREIRA MATERIEL] Demande de contact';

$headers  = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $name . " <". $email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";

ob_start();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <style>
        .container {
            background-color: #be202a;
        }
        .content {
            background-color: #fff; 
            max-width: 600px; 
            padding: 10px 20px;
            margin: 0 auto;
            border: 1px solid #d9d8d9;
        }
        .title {
            font-weight: normal;
            font-size: 1.6em;
        }
        .logo {
            width: 32px;
            margin-right: 4px;
        }  
        .contact {
            text-align: right;
            line-height: 1.6em;
            font-size: 1.1em;
        }
        .object {
            font-size: 1.1em;
            text-decoration: underline;
            font-weight: normal;
        }
        .message {
            white-space: pre-wrap;
            line-height: 1.6em;
            font-size: 1.1em;
        }
        .address {
            white-space: pre-wrap;
        }

        @media screen and (max-width: 600px) {
            .content {
                border: 0;
                padding: 0;
            }
        }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="content">
            <h1 class="title">
                <img class="logo" src="/assets/img/logo.png" width="32px" style="width: 32px">
                <strong>Moreira</strong> Materiel
            </h1>
            <div class="contact">
                <div><?= $name ?></div>
                <div><?= $email ?></div>
                <? if (!empty($phone)) { ?><div><?= $phone; ?></div><? } ?>
                <? if (!empty($address)) { ?><div class="address"><?= $address; ?></div><? } ?>
            </div>
            <h2 class="object">Demande de contact</h2>
            <p class="message"><?= $message ?></p>
        </div>
     </div>
  </body>
</html>

<?php

$message = ob_get_clean();

setcookie('contactTime', $time);

if (mail($to, $subject, $message, $headers)) {
    echo "Votre mail a été envoyé.";
} else {
    http_response_code(500);
    echo "Une erreur est survenue.";
}