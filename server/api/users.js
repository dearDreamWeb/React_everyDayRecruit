module.exports = (router, crud) => {
    const cookieParser = require("cookie-parser");

    // 自动登录
    router.post("/auto_login", (req, res) => {
        // 获取前端的cookie，然后切割成对象的形式
        res.header("Content-Type", "application/json; charset=utf-8");
        let cookies = req.headers.cookie;
        // 判断cookie是否存在
        if (cookies) {
            let arr = cookies.split(";")
            let cookiesObj = {}; //对象形式的cookie
            arr.forEach(item => {
                let objArr = item.split("=");
                cookiesObj[objArr[0].trim()] = objArr[1].trim()
            })
            // 判断cookie中是否有sid
            if (cookiesObj.hasOwnProperty("sid")) {
                if (cookiesObj.sid === req.session.auto_loginId && req.body.userId === req.session.userInfo.userId) {
                    res.json({
                        status: 0,
                        userInfo: req.session.userInfo
                    })
                } else {
                    res.json({ status: 1 })
                }
            } else {
                res.json({ status: 1 })
            }
        } else {
            res.json({ status: 1 })
        }
    })

    // 登录
    router.post("/login", (req, res) => {
        crud("SELECT * FROM `users` WHERE userName = ? AND password = ?", [req.body.userName, req.body.password], data => {
            if (data.length !== 0) {
                let auto_loginId = require("../randomId")(); //获取自动登录的cookie随机值
                res.cookie('sid', auto_loginId, { maxAge: 1000 * 60 * 60 * 24 * 7 }); //向前端种一个cookie
                req.session.userInfo = data[0];
                req.session.auto_loginId = auto_loginId;
                const { userId, userType } = data[0];
                res.json({
                    status: 0,
                    message: "登录成功",
                    userInfo: { userId, userType }
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
        let { userName, password, avatar, job, companyName, salary, jobRequire, wantJob, selfIntroduction } = req.body;
        let userType = req.body.userType.join("");
        // 先判断是否有该用户名，有的话返回提示，没有的话，添加数据到数据库
        crud("SELECT * FROM `users` WHERE userName = ?", [userName], data => {
            if (data.length === 0) {
                let userId = require("../randomId")();
                // 要插入的数据
                let data = {
                    userId,
                    userName,
                    password,
                    userType,
                    avatar
                }
                // 判断用户类型，1是老板，2是大神，根据用户类型选择数据插入
                if (userType === "1") {
                    data = Object.assign({}, data, {
                        job,    // 招聘岗位
                        companyName, // 公司名称
                        salary, // 职位薪资
                        jobRequire  // 职位要求
                    })
                } else {
                    data = Object.assign({}, data, {
                        userType, //用户类型
                        wantJob, //求职岗位
                        selfIntroduction //个人介绍
                    })
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