var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
app.listen(3000);
//io.set('log level', 1);
function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}

io.sockets.on('connection', function(socket) {
  socket.on('emit_from_client', function(data) {
    //console.log(data);

    // 接続してるソケットのみ
    //socket.emit('emit_from_server', 'hello from server: ' + data);

    // 接続しているソケット以外に送信
    //socket.broadcast.emit('emit_from_server', 'hello from server: ' + data);

    // すべてのソケットに送信
    io.sockets.emit('emit_from_server', '[' + socket.id + '] : ' + data);
  });
});
