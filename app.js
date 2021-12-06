const { application } = require('express');

global.custom_env = require('./settings/env.js'); 
global.__workdir = __dirname;

const app = require('./config/express')();
const passportRout = require('./config/passport')(app);
const authRout = require('./service/auth')(app, passportRout);

app.use('/auth', authRout);


app.get('/api/test', (req, res) => {
    
    res.send('test');
});


app.post('/api/login', (req, res) => {
    res.send('{"id":"abc", "displayName": "AAAAbc"}');
})

app.get('/api/users/auth', (req, res) => {
    res.send('{"id":"abc", "displayName": "AAAAbc", "isAuth": "true"}')
})


app.get('', (req, res) => {
    
    res.send('HI~~');
});


app.listen(3000, function() {
    console.log("RUN!!!!!!!!");
})
