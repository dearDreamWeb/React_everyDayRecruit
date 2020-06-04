const express = require('express');
const app = express();
const history = require("connect-history-api-fallback");
const bodyParser = require('body-parser');

app.listen(3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())  

// 这里千万要注意，要在express.static()静态资源上面
app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [
        {
            from: /^\/.*$/,
            to: function (context) {
                return "/";
            }
        },
    ]
}));

// api接口
require("./api")(express, app);