<?php
$filename = "playlist.txt";

$video = $_POST['ytID'];
$videos = Array();
$fileVideos = unserialize(file_get_contents ($filename));
if(is_array($fileVideos))
    $videos = $fileVideos;
array_push($videos, $video);
$writeResult = file_put_contents ($filename, serialize($videos));

?>