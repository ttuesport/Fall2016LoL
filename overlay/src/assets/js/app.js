// Environment variables

socketBase = "localhost:3000";

var app = angular.module("esport16FallLoLOverlay", [
    "ui.router",
    "ui.utils",
    "angular-storage",
    'ui.bootstrap',
    'btford.socket-io'
]).run(function($rootScope, $state, $stateParams, store, socketService) {
    $rootScope.socket = socketService;
    $rootScope.players = [];
    $rootScope.playersReady = [];
    $rootScope.socket.on("gameStatus", function(viewName) {
        if(viewName == "writeAnswer") $state.go("game.write");
        else if(viewName == "guessAnswer") $state.go("game.guess");
        else if(viewName == "waitPlayers") $state.go("game.wait");
        $rootScope.playersReady = [];
    });
    $rootScope.socket.on("answers", function(answers) {
        $rootScope.answers = answers;
    });
    $rootScope.socket.on("question", function(question) {
        $rootScope.question = question;
    });
    $rootScope.socket.on("players", function(players) {
        $rootScope.players = players;
    });
    $rootScope.socket.on("playerReady", function(player) {
        $rootScope.playersReady.push(player);
    });
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/game/wait");
    $stateProvider
        .state("game", {
            url: "/game",
            abstract: true,
            templateUrl: "templates/game.html",
            controller: "gameController",
            data: {
                requiresName: true
            }
        })
        .state("game.wait", {
            url: "/wait",
            templateUrl: "templates/game/waitPlayers.html"
        })
        .state("game.write", {
            url: "/write",
            templateUrl: "templates/game/writeAnswer.html"
        })
        .state("game.guess", {
            url: "/guess",
            templateUrl: "templates/game/guessAnswer.html"
        })
});