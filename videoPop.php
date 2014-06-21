<?php
header('Content-Type: application/json');
$filename = "playlist.txt";
$videos = unserialize(file_get_contents($filename));
$nextVideo = array_shift($videos);
$writeResult = file_put_contents($filename, serialize($videos));
echo json_encode($nextVideo);
?>