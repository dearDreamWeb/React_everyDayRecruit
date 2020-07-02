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

    // router.get("/getUserList_chatList", (req, res) => {
    //     console.log(req.session.userInfo)
    //     const self_userId = req.session.userInfo.userId;
    //     const self_userType = req.session.userInfo.userType;
    //     const userListType = self_userType === 1 ? 0 : 1;
    //     crud("SELECT *  FROM `users` WHERE userType=?", [userListType], userList => {
    //         userList = userList.map(item => {
    //             item.password = ""
    //         })
    //         crud("SELECT * FROM `chat` WHERE `from`=? OR `to`=? ORDER BY created_time ", [self_userId], chatList => {
    //             res.json({
    //                 status: 0,
    //                 userList,
    //                 chatList
    //             })
    //         })
    //     })
    // })

}