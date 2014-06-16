(function () {
    var app = angular.module('dj', []);

    app.controller('SubmitVideoController', ['$http', '$scope', '$rootScope', function ($http, $scope, $rootScope) {
        $scope.video = {};
        $scope.results = {};
        $rootScope.videos = [];

        this.submit = function () {
            $http({
                url: 'videoPush.php',
                method: "POST",
                data: $.param($scope.video),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function () {
                    $rootScope.videos.push($scope.video);
                    $scope.video = {};
                });
        };

        this.validate = function (successCallback) {
            $scope.video.isDuplicate = false;
            $scope.video.isInvalid = false;
            $scope.successCallback = successCallback;

            if (isVideoInArray($scope.video, $rootScope.videos)) {
                $scope.video.isDuplicate = true;
                return false;
            }

            $http({
                url: 'http://gdata.youtube.com/feeds/api/videos/' + $scope.video.ytID + '?alt=json',
                method: "GET"
            })
                .success(function (data) {
                    if (data.entry.id != false) {
                        //adds the title
                        // TODO: separate in appropriate funct
                        $scope.video.title = data.entry.title.$t;
                        $scope.successCallback(data.entry.title);
                    }
                })
                .error(function () {
                    //$scope.video.isInvalid = true;

                    $http({
                        url: 'http://gdata.youtube.com/feeds/api/videos?max-results=4&v=2&alt=json&q=' + $scope.video.ytID,
                        method: "GET"
                    })
                        .success(function (data) {
                            $scope.results = data.feed.entry;
                        });
                });

        };
    }]);

    app.controller('ListVideoController', ['$http', '$rootScope', function ($http, $rootScope) {
        $rootScope.videos = [];

        $http({
            url: 'listVideos.php',
            method: "GET"
        })
            .success(function ($videos) {
                $rootScope.videos = $videos;
            });
    }]);
})();

function isVideoInArray(video, videos) {
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].ytID == video.ytID)
            return true;
    }
    return false;
}