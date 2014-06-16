<?php
	$filename = "playlist.txt";
	$videos = unserialize(file_get_contents ($filename));
	if($videos)
	    echo json_encode($videos);
?>