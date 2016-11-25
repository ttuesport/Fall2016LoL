// Environment variables

socketBase = "10.0.24.48:3000";

var app = angular.module("esport16FallLoLOverlay", [
    "ui.router",
    "ui.utils",
    "angular-storage",
    'ui.bootstrap',
    'btford.socket-io'
]).run(function($rootScope, $state, $stateParams, store, socketService, $interval) {
    $rootScope.inGame = false;
    $rootScope.data = null;
    $rootScope.state = null;
    $rootScope.activeView = null;
    $rootScope.views = null;
    $rootScope.socket = socketService;
    $rootScope.socket.on("getAll", function(response) {
        $rootScope.data = response.data;
        $rootScope.state = response.state;
        $rootScope.activeView = response.activeView;
        $rootScope.views = response.views;
    });
    $rootScope.socket.on("data", function(payload) {
        $rootScope.data = payload;
    });
    $rootScope.socket.on("view", function(view) {
        $rootScope.activeView = view;
        $state.go(view.overlay, {}, {reload: true});
    });
    $rootScope.socket.emit('getAll', null);
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.sponsorLogos = [
        "arvutitark.png", "aula.png", "euronics.svg", "fifaa.png", "ittk.png", "ityn.png", "lux.png",
        "nt.png", "playfair.svg", "redbull.png", "thorgate.svg"
    ];
    $rootScope.logoIndex = 0;
    $rootScope.sponsorLogo = $rootScope.sponsorLogos[0];
    $interval(function() {
        if($rootScope.logoIndex - 2 == $rootScope.sponsorLogos.length) {
            $rootScope.logoIndex = 0;
        } else {
            $rootScope.logoIndex++;
        }
        $rootScope.sponsorLogo = $rootScope.sponsorLogos[$rootScope.logoIndex];
    }, 10000);
}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/afk");
    $stateProvider
        .state("afk", {
            url: "/afk",
            templateUrl: "templates/afk.html",
            controller: "afkController"
        })
        .state("timetable", {
            url: "/timetable",
            templateUrl: "templates/timetable.html",
            controller: "timetableController"
        })
        .state("ingame", {
            url: "/ingame",
            templateUrl: "templates/game.html",
            controller: "gameController"
        })
});