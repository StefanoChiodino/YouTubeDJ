var player;

function playNextVideo() {
    $.getJSON("videoPop.php", function (video) {
        player.loadVideoById(video.id.$t.split(':').reverse()[0]);
    });
}

function onPlayerReady(event) {
    playNextVideo();
}

function onPlayerStateChange(event) {
    if (event.target.getPlayerState() == YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function onYouTubeIframeAPIReady() {
    $(document).ready(function () {
        player = new YT.Player('player', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}



function addVideoTitles() {
    var videoIDs = Array();
    $("ul li").each(function () {
        videoIDs.push($(this).text());
    });
    $.getJSON("https://www.googleapis.com/youtube/v3/videos",
        {
            part: "snippet",
            id: videoIDs.join(",")
        },
        function(data) {
            alert(data);
        });
}