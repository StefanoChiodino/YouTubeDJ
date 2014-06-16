(function () {
    var app = angular.module('dj', []);

    app.controller('SubmitVideoController', ['$http', '$scope', '$rootScope', function ($http, $scope, $rootScope) {
        $scope.video = {};
        $rootScope.videos = [];

        this.submit = function () {
            $http({
                url: 'videoPush.php',
                method: "POST",
                data: "ytID=" + $scope.video.ytID,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function () {
                    $rootScope.videos.push($scope.video.ytID);
                    $scope.video = {};
                });
        };

        this.validate = function (successCallback) {
            $scope.video.isDuplicate = false;
            $scope.video.isInvalid = false;
            $scope.successCallback = successCallback;

            if ($.inArray($scope.video.ytID, $rootScope.videos) > - 1) {
                $scope.video.isDuplicate = true;
                return false;
            }

            $http({
                url: 'http://gdata.youtube.com/feeds/api/videos/' + $scope.video.ytID + '?alt=json',
                method: "GET"
            })
                .success(function (data) {
                    if (data.entry.id != false) {
                        $scope.successCallback();
                    }
                })
                .error(function () {
                    $scope.video.isInvalid = true;
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