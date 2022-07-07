const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./conf/session.conf');
const MongoStore = require('connect-mongo')(session);
const config = require('./conf/config.conf');

// require('./randy-middleware/logger')(require('morgan'), app);

// app.all('*', (req, res, next) => {
//     console.log(req.headers.origin);
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header('Access-Control-Allow-Credentials', "true");
//     res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Max-Age", '3600');
//     //res.header('Content-Type', 'application/json;charset=utf-8');

//     //header头信息设置结束后，结束程序往下执行，返回
//     if (req.method.toLocaleLowerCase() === 'options') {
//         res.status(204);
//         return res.json({});   //直接返回空数据，结束此次请求
//     } else next();
// });

/*
mysql数据库： 192.168.0.34:3306 -> rd_db_for_develop_test    user: root   password: qwerasdf
mongo数据库: localhost:27017
*/

app.use(helmet());
app.use(cors(config.corsConfig));
app.use(require('cookie-parser')(sessionConfig.secret));
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));
app.use(bodyParser.json({limit:'50mb'}));
//初始化session




// app.use(session({
//     secret:'qwerasdf',
//     resave:false,
//     saveUninitialized: true,
//     cookie: {secure:false,maxAge:1000 * 60 * 60 * 10}, /*只有在https才可以访问cookie*/
//     rolling:true,/*只要页面在操作就不会过期，无操作5秒后过期*/
//     store: new MongoStore({
//         url: `mongodb://10.199.4.22:27017,10.199.4.23:27017,10.199.4.24:27017/yb_session_test?replicaSet=my_repl`,
//         touchAfter: 24 * 3600,
//         databaseName: 'yb_session_test',
//         collection: 'ldjgsessions'
//     })
// }));


//登录认证
// app.use(require('./randy-middleware/session-checker'));
require('./routes/http.routemgr')(app);

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    const err = new Error('Not Found' + req.url + '?');
    err.status = 404;
    res.json({'respCode': '404'});
    next(err);
});
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.end('error');
});

module.exports = app;
