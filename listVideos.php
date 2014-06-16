<?php
	$filename = "playlist.txt";
	$videos = Array();
	$fileVideos = unserialize(file_get_contents ($filename));
    if(is_array($fileVideos))
        $videos = $fileVideos;
    echo json_encode($videos);
?>