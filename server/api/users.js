module.exports = (router, crud) => {

    // 登录
    router.post("/login", (req, res) => {
        crud("SELECT * FROM `users` WHERE userName = ? AND password = ?", [req.body.userName, req.body.password], data => {
            if (data.length !== 0) {
                req.session.isLogin = true;
                req.session.userInfo = data[0];
                res.json({
                    status: 0,
                    message: "登录成功"
                })
            } else {
                res.json({
                    status: 1,
                    message: "用户名或密码错误"
                })
            }
        })
    })


    // 注册
    router.post("/register", (req, res) => {
        let userName = req.body.userName;
        let password = req.body.password;
        let userType = req.body.userType.join("");
        // 先判断是否有该用户名，有的话返回提示，没有的话，添加数据到数据库
        crud("SELECT * FROM `users` WHERE userName = ?", [userName], data => {
            if (data.length === 0) {
                let userId = require("../randomId")();
                // 要插入的数据
                let data = {
                    userId: userId,
                    userName: userName,
                    password: password,
                    userType: userType
                }
                crud("INSERT INTO `users` set ?", data, insertData => {
                    res.json({
                        status: 0,
                        message: "恭喜你，用户注册成功"
                    })
                })
            } else {
                res.json({
                    status: 1,
                    message: "该用户名已存在"
                })
            }
        })

    })
}