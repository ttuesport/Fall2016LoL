app.controller("gameController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$state",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $state) {
        
        $scope.writeAnswer = function(answer) {
            $rootScope.socket.emit('addAnswer', {answer: answer, player: store.get("name")});
            $state.go('game.wait');
        };

        $scope.guessAnswer = function(index) {
            $rootScope.socket.emit('guessAnswer', {answer: index, player: store.get("name")});
            $state.go('game.wait');
        };
        
    }]);