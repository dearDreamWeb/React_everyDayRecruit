module.exports = (router, crud) => {
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

}