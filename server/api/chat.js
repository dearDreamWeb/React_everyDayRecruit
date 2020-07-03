module.exports = (router, crud) => {
    // 获取本人与聊天对象的聊天信息
    router.get("/chat_init", (req, res) => {
        if (req.session.userInfo) {
            const fromId = req.query.userId;
            const toId = req.session.userInfo.userId;
            const { userName, avatar, userId } = req.session.userInfo;
            crud("SELECT * FROM `chat` WHERE `from`=? AND `to`=? OR `from`=? AND `to`=? ORDER BY created_time ", [fromId, toId, toId, fromId], data => {
                res.json({
                    status: 0,
                    chat_data: data,
                    self_userInfo: { userId, avatar, userName }
                })
            })
        } else {
            res.json({
                status: 1,
                message: "用户未登录"
            })
        }
    })

    // 更新本人与聊天对象的信息已读情况
    router.get("/updateRead", (req, res) => {
        if (req.session.userInfo) {
            // 聊天对象的suerId
            const fromId = req.query.userId;
            // 本人的userId
            const toId = req.session.userInfo.userId;
            crud("UPDATE `chat` SET `read`=? WHERE `from`=? AND `to`=? ", [1, fromId, toId], () => {
                res.json({ status: 0 })
            })
        }
    })

    // 获取聊天列表
    router.get("/getChatList", (req, res) => {
        crud("SELECT * FROM `users` WHERE userId = ?", [req.query.userId], data => {
            if (data.length !== 0) {
                let auto_loginId = require("../randomId")(); //获取自动登录的cookie随机值
                res.cookie('sid', auto_loginId, { maxAge: 1000 * 60 * 60 * 24 * 7 }); //向前端种一个cookie
                req.session.userInfo = data[0];
                req.session.auto_loginId = auto_loginId;
                const { userId, userType } = data[0];
                // 获取用户列表的
                const userListType = userType === 1 ? 0 : 1;
                // 获取对应的用户列表
                crud("SELECT *  FROM `users` WHERE userType=?", [userListType], userList => {
                    // 把用户密码去掉
                    userList = userList.map(item => {
                        item.password = ""
                        return item;
                    })
                    // 获取该用户的聊天数据，按照时间降序
                    crud("SELECT * FROM `chat` WHERE `from`=? OR `to`=? ORDER BY created_time desc", [userId, userId], chatList => {
                        res.json({
                            status: 0,
                            userList,
                            chatList
                        })
                    })
                })
            } else {
                res.json({
                    status: 1,
                    message: "用户名或密码错误"
                })
            }
        })
    })
}