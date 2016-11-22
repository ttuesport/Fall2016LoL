app.controller("nameSelectController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", 
    "$state",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $state) {

        $scope.nickname = "";

        $scope.init = function() {
            $rootScope.inGame = false;
            if(store.get('name') && store.get('name') != undefined) {
                $scope.nickname = store.get(name);
            }
        };

        $scope.join = function() {
            store.set('name', $scope.nickname);
            $rootScope.socket.emit('join', $scope.nickname);
            $rootScope.nickname = $scope.nickname;
            $rootScope.inGame = true;
            $state.go("game.wait");
        };

        $scope.init();
    }]);