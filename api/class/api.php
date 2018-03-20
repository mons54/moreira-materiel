<?php

class Api 
{
    public function __construct() 
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }
    
    public function response($data) 
    {
        echo json_encode($data);
    }

    public function error($code) 
    {
        http_response_code((int) $code);
    }
}