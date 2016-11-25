app.controller("afkController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;
        
        $scope.animateIn = function() {
            $timeout(function() {
                $('.afk-card').removeClass('loading');
            }, 0);
            $timeout(function() {
                $('.game-logo-container').removeClass('loading');
            }, 200);
            $timeout(function() {
                $('.lol').removeClass('loading');
            }, 500);
            return $timeout(function() {}, 800);
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $('.lol').addClass('loading');
            }, 0);
            $timeout(function() {
                $('.game-logo-container').addClass('loading');
            }, 100);
            $timeout(function() {
                $('.afk-card').addClass('loading');
            }, 250);
            return $timeout(function() {
                $rootScope.socket.emit('state', 'ANIMATE_OUT_FINISHED')
            }, 400);
        };

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.data = $rootScope.data;
        }, true);

        $rootScope.socket.on("animateOut", function() {
            if($rootScope.activeView.overlay == "afk") $scope.animateOut();
        });

        $scope.animateIn();
        
    }]);