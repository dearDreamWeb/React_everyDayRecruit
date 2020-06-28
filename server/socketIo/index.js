module.exports = app => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', socket => {
        console.log("111")
        socket.on('message', data => {
            console.log("服务器收到消息" + data);
            // io.emit代表广播，socket.emit代表私发
            io.emit('message', data);
        })

        // // 客户端断开，自带事件
        // socket.on('disconnect', function () {
        //     io.emit('leave', socket.nickname + ' left')
        // })
    });
    server.listen(8000)
}