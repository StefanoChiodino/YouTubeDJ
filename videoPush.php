<?php

header('Content-Type: application/json');

function isDuplicate($videos, $video)
{
    for ($i = 0; $i < count($videos); $i++) {
        if (strcmp ($videos[$i]['id']['$t'], $video['id']['$t']) === 0)
            return true;
    }
    return false;
}

function exitWithMessage($message)
{
    http_response_code(400);
    $errorResponse['message'] = $message;
    exit (json_encode($errorResponse = array('success' => false, 'message' => $message)));
}


$filename = "playlist.txt";
$video = $_POST;
$videos = Array();
$fileVideos = unserialize(file_get_contents($filename));
if (is_array($fileVideos))
    $videos = $fileVideos;
if (isDuplicate($videos, $video)) {
    exitWithMessage("The video is already present in the queue");
}

array_push($videos, $video);
//$videos = array_unique($videos);
$writeResult = file_put_contents($filename, serialize($videos));

if ($writeResult === false) {
    exitWithMessage('Error writing to file');
}

echo json_encode(array('success' => true));

?>