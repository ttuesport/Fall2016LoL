app.controller("castersController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;
        
        $scope.animateIn = function() {
            $timeout(function() {
                $('.caster-left').removeClass('loading');
            }, 0);
            $timeout(function() {
                $('.caster-right').removeClass('loading');
            }, 150);
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $('.caster-left').addClass('loading');
            }, 0);
            $timeout(function() {
                $('.caster-right').addClass('loading');
            }, 150);
            return $timeout(function() {
                $rootScope.socket.emit('state', 'ANIMATE_OUT_FINISHED')
            }, 350);
        };

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.data = $rootScope.data;
        }, true);

        $rootScope.socket.on("animateOut", function() {
            if($rootScope.activeView.overlay == "casters") $scope.animateOut();
        });

        $scope.animateIn();
        
    }]);