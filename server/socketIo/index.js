module.exports = app => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    let usersObj = {}; //存放登录的用户的socket.id
    io.on('connection', socket => {
        // 接收发的消息
        socket.on('message', data => {
            // 把发送方的id值当做key值，socket.id当value值存放在usersObj，socket.id每次刷新页面都会变得
            let msgData = JSON.parse(data);
            usersObj[msgData.from] = socket.id;

            console.log("服务器收到消息" + data);
            // 将消息私发给指定的客户端
            socket.to(usersObj[msgData.to]).emit('message', data);
        })

        
        // socket.on("online", data => {
        //     console.log(data);
        // })

        // // 客户端断开，自带事件
        // socket.on('disconnect', function () {
        //     io.emit('leave', socket.nickname + ' left')
        // })
    });
    server.listen(8000)
}