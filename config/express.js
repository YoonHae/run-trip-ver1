module.exports = function() {
    const express = require('express');
    const app = express();

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    const cors =  require('cors');
    app.use(cors());

    const redis = require('redis');
    const session = require('express-session');
    const RedisStore = require('connect-redis')(session);
    const redisClient = redis.createClient();

    app.use(session({
        secret: 'fjd@343%46&^**&-354k',
        resave: true,
        saveUninitialized: true,
        store: new RedisStore({
            client: redisClient,
            host: global.custom_env.REDIS_CONFIG.primary_host,
            port: global.custom_env.REDIS_CONFIG.port
        })
    }));

    // ejs 를 이용한 html 파일 반환
    // app.set('views', global.__workdir + '/views');
    // app.set('view engine', 'pug');

    // app.use(express.static(global.__workdir + '/views'));  // 정적 파일 서비스하기위한 미들웨어에 경로 설정

    return app;
}