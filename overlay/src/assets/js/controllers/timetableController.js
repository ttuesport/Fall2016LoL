app.controller("timetableController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout", "$state",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout, $state) {
        $scope.data = $rootScope.data;
        
        $scope.animateIn = function() {
            $timeout(function() {
                $('.timetable-container').removeClass('loading');
            }, 0);
            for(var i = 0; i < $scope.data.timetable.length; i++) {
                $timeout(function() {
                    $('.timetable-row.loading').first().removeClass('loading');
                }, 900 + (i * 100));
            }
            return $timeout(function() {}, 1100 + ($scope.data.timetable.length * 100));
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $('.timetable-container').addClass('loading');
            }, 200 /*+ ($scope.data.timetable.length * 100)*/);
            /*for(var i = 0; i < $scope.data.timetable.length; i++) {
                $timeout(function() {
                    $('.timetable-row.loading').last().addClass('loading');
                }, i * 100);
            }*/
            $timeout(function() {
                $rootScope.socket.emit('state', 'ANIMATE_OUT_FINISHED')
            }, 800 /*+ ($scope.data.timetable.length * 100)*/);
        };

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.data = $rootScope.data;
        }, true);

        $rootScope.socket.on("animateOut", function() {
            if($rootScope.activeView.overlay == "timetable") $scope.animateOut();
        });

        $scope.animateIn();
        
    }]);