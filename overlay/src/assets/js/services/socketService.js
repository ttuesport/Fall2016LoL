app.factory("socketService", ["socketFactory", function(socketFactory) {

    var myIoSocket = io.connect('localhost:3000');

    return socketFactory({
        ioSocket: myIoSocket
    });
}]);