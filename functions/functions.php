<?php
  $directory = dirname(__DIR__);

  require_once $directory."\\vendor\\autoload.php";
  use Google\Service\AdExchangeBuyerII\Client;
  use Dotenv\Dotenv;  
  
  $API_KEY = Dotenv::createArrayBacked($directory)->load()["API_KEY"];
  
  $client = new Google_Client();
  $client->setDeveloperKey($API_KEY);
  $service = new Google\Service\YouTube($client);

  $videoId = json_decode(file_get_contents("php://input"))->videoId;

  $results = $service->videos->listVideos('snippet, recordingDetails', array(
    'id' => $videoId,
  ));

  if(!isset($results->items[0])){
    $data["status"] = "404";
    $data["error"] = "Not Found";
    $data["message"] = "This video does not exists";
  } else {
    $firstitem = $results->items[0]->snippet;
    
    $data["id"] = $videoId;
    $data["link"] = "https://youtube.com/watch?v=".$videoId;
    $data["title"] = $firstitem->title;
    $data["author"] = $firstitem->channelTitle;
    $data["preview"] = $firstitem->thumbnails->default->url;
  }

  echo json_encode($data);  
?>