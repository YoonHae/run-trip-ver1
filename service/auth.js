module.exports = (app, passport) => {
    var route = require('express').Router();
    const conn = require('../config/db').rDB();

    // password 암호화에 사용할 암호화 모듈
    var bkfd2Password = require("pbkdf2-password");
    var hasher = bkfd2Password();

    route.get('/', (req, res) => {
        res.send(req.user);
    });
    
    // 아래 기존로직 대신 passport 사용
    // middleware 에 등록한 함수를 호출해줌.
    route.post('/login', 
            (req, res, next) => {
                if(req.isAuthenticated() && req.user.displayName) {
                    res.send({loginSuccess: true, ...req.user});
                } else {
                    next();
                }
            },
            passport.authenticate('local'), 
            (req, res) => {
                if (req.user.displayName)  {
                    res.send({loginSuccess: true, ...req.user});
                } else {
                    res.send({loginSuccess: false});
                }
            });

    /** 
     * 1. front 에서 /auth/facebook  을 호출
     * 2. passport 가 facebook 인증 페이지로 이동
     * 3. facebook 에서 인증절차 진행
     * 4. facebook app 에 등록한 url 과 FacebookStrategy 에 callback 으로 등록한 url 을 merge 해서 facebook 이 호출해줌
     * 5. /auth/facebook/callback 가 호출되면 성패에 따라 option 내용의 redirection 진행
    */
    route.get('/facebook', passport.authenticate('facebook', {scope:'email'}));

    route.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/welcome',
                                        failureRedirect: '/auth/login' }));


    route.post('/register', function(req, res) {
        var uname = req.body.username;
        var pwd = req.body.password;
        var dname = req.body.displayName;

        hasher({password: pwd}, function(err, pass, salt, hash){
            var user = {
                authId: 'local:' + uname,
                username: uname,
                password: hash,
                salt: salt,
                displayName: dname
            };
            
            conn.query('insert into users set ?', user, function(err, results) {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else {
                    // passport 의 기능으로 가입 즉시 로그인을 할 수 있다. 
                    req.login(user, function(err){
                        // passport 가 session 작업을 하므로, 저장이 완료된 시점에 하는게 나음
                        req.session.save(function() {
                            res.redirect('/welcome');
                        });
                    });
                }
            });
        });
    });


    
    route.get('/logout', function(req, res) {
        // passport 의 기능으로 로그아웃 기능을 사용할 수 있다.(세선관리 포함)
        req.logout();
        // passport 가 session 작업을 하므로, 저장이 완료된 시점에 하는게 나음
        req.session.save(function() {
            res.redirect('/');
        });
    });

    return route;
}