module.exports = (express, app) => {
    // 创建session
    const session = require('express-session');
    app.use(session({
        secret: 'AH1HasdIashd23laejfas1ALJ', //秘钥
        resave: true,          //即使 session 没有被修改，也保存 session 值，默认为 true。
        saveUninitialized: true,//无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
        cookie: { secure: false, maxAge: 365 * 24 * 60 * 60 * 1000 }//当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。
    }))

    // 获取crud接口
    const crud = require("../crud");

    // 创建路由
    const router = express.Router();
    app.use("/api", router);

    // 用户登录和注册
    require("./users")(router, crud);

    // 用户登录和注册
    require("./chat")(router, crud);
}
