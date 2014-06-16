<?php
	$filename = "playlist.txt";
	$videos = unserialize(file_get_contents ($filename));
	$nextVideo = array_shift($videos);
	echo json_encode($nextVideo);
	$writeResult = file_put_contents ($filename, serialize($videos));
?>