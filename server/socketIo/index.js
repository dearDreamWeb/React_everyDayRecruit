module.exports = app => {
    // 获取crud接口
    const crud = require("../crud");

    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    let usersObj = {}; //存放登录的用户的socket.id
    io.on('connection', socket => {

        // 初始化用户
        socket.on("init", data => {
            usersObj[data] = socket.id;
        })
 
        // 接收发的消息
        socket.on('message', data => {
            // 把发送方的id值当做key值，socket.id当value值存放在usersObj，socket.id每次刷新页面都会变得
            let msgData = JSON.parse(data);

            // console.log("服务器收到消息" + data);
               
            // 获取发送过来的数据
            const { from, to, chat_content } = msgData;
            const created_time = new Date().getTime();//消息发送的时间

            crud("INSERT INTO `chat` SET ?", { from, to, chat_content, created_time }, () => {
                // 将消息私发给指定的客户端
                socket.emit('message', JSON.stringify({ from, to, chat_content, created_time }));
                socket.to(usersObj[msgData.to]).emit('message', JSON.stringify({ from, to, chat_content, created_time }));

            })
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