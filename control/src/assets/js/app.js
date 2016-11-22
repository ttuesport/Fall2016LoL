// Environment variables

apiBase = "http://private-d5ebba-fundingsystem.apiary-mock.com";

var app = angular.module("esport16FallLoLOverlay", [
    "ui.router",
    "ui.utils",
    "angular-storage",
    'ui.bootstrap',
    'btford.socket-io'
]).run(function($rootScope, $state, $stateParams, store, socketService) {
    $rootScope.inGame = false;
    $rootScope.socket = socketService;
    $rootScope.socket.on("gameStatus", function(viewName) {
        if(viewName == "writeAnswer") $state.go("game.write");
        else if(viewName == "guessAnswer") $state.go("game.guess")
    });
    $rootScope.socket.on("answers", function(answers) {
        $rootScope.answers = answers;
    });
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("");
    $stateProvider
        .state("panel", {
            url: "",
            templateUrl: "templates/panel.html",
            controller: "panelController"
        })
});