app.factory("socketService", ["socketFactory", function(socketFactory) {

    var myIoSocket = io.connect('10.0.24.48:3000');

    return socketFactory({
        ioSocket: myIoSocket
    });
}]);