<?php

require_once 'api.php';

class Mail extends Api
{
    public function send(array $params) 
    {
        if ((string) $params['token'] !== $_SESSION['mailToken']) {
            $this->error(400);
            return $this->response("Formulaire invalide");
        }

        $email = $this->formatData((string) $params['email']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error(406);
            return $this->response("Adresse email invalide");
        }

        $name    = substr($this->formatData((string) $params['name']), 0, 30);
        $phone   = substr($this->formatData((string) $params['phone']), 0, 20);
        $address = substr($this->formatData(preg_replace("/(.*)(\s+)(\d{5}.*)/", "$1\n$3", (string) $params['address'])), 0, 200);
        $message = $this->formatData((string) $params['message']);

        $headers  = "From: " . $name . " <" . $email . ">\r\n";
        $headers .= "Reply-To: " . $name . " <". $email . ">\r\n";
        $headers .= "Cc: Julien Simonet <j.mons54@gmail.com>\r\n";
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
                        <img class="logo" src="https://moreiramateriel.fr/assets/img/logo-mail.png">
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

        if (!mail('moreira.toiture@gmail.com', '[MOREIRA MATERIEL] Contact', $message, $headers)) {
            $this->error(500);
            return $this->response("Une erreur est survenue");
        }

        unset($_SESSION['mailToken']);

        return $this->response("Votre mail a été envoyé");
    }

    public function generateToken()
    {
        $token = md5(uniqid(rand(), true));

        $_SESSION['mailToken'] = $token;

        return $this->response($token);
    }

    protected function formatData($data) 
    {
        return htmlspecialchars(stripslashes(trim($data)));
    }
}