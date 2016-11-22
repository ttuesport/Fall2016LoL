app.controller("gameController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope",
    function($q, $scope, $stateParams, store, socketService, $rootScope) {
        
        $scope.writeAnswer = function(answer) {
            $rootScope.socket.emit('addAnswer', {answer: answer, player: store.get("name")});
            $state.go("game.wait");
        };

        $scope.guessAnswer = function(index) {
            $rootScope.socket.emit('guessAnswer', {answer: index, player: store.get("name")});
            $state.go("game.wait");
        };
        
        $scope.isReady = function(name) {
            for(var i = 0; i < $rootScope.playersReady.length; i++) {
                if(name == $rootScope.playersReady[i]) {
                    return true;
                }
            }
            return false;
        }
        
    }]);