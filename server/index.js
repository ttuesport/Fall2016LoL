var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var clk = require("chalk");
var config = JSON.parse(fs.readFileSync("config.json"));
var overlayers = [];
var state = "ANIMATE_IN_FINISHED";
var data = config.startData;

io.on('connection', function(socket) {
    console.log(clk.green.underline.bold(socket.handshake.address) + clk.green(" has connected"));
    socket.on('disconnect', function() {
        if(searchOverlayer(socket.handshake.address) != -1) {
            overlayers.splice(searchOverlayer(socket.handshake.address), 1);
            console.log(clk.red.underline.bold(socket.handshake.address) + clk.red(" has disconnected as ") +
                clk.red.bold("overlayer"))
        } else {
            console.log(clk.red.underline.bold(socket.handshake.address) + clk.red(" has disconnected"));
        }
    });
    socket.on('setOverlayer', function() {
        if(searchOverlayer(socket.handshake.address) == -1) {
            overlayers.push(socket.handshake.address);
            console.log(clk.green.underline.bold(socket.handshake.address) + clk.green(" has been set to ") +
                    clk.green.bold("overlayer"))
        }
    });
    socket.on('animationState', function(newState) {
        state = newState;
        io.emit("state", state);
    });
    socket.on('getAll', function(name) {
        socket.emit('getAll', {
            state: state,
            config: config,
            data: data
        })
    });
    socket.on('addAnswer', function(obj) {
        io.emit("playerReady", obj.player);
        answers.push(obj);
        console.log("Player " + obj.player + " added answer: " + obj.answer);
    });
});

function searchOverlayer(ip) {
    for(var i = 0; i < overlayers.length; i++) {
        if(overlayers[i] == ip) {
            return i
        }
    }
    return -1
}

http.listen(3000, function(){
    console.log('listening on *:3000');
});