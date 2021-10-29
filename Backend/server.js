const mysql = require('mysql');
const db = require('./config/db.config');

const express = require('express');
const app = express();
const path = require('path');

//OWASP
const toobusy = require('toobusy-js');

const rateLimit = require('express-rate-limit');
const apiRequestLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(apiRequestLimiter);

const hpp = require('hpp');
app.use(hpp());

const hsts = require('hsts');
const sixtyDaysInSeconds = 5184000;
app.use(hsts({
    maxAge: sixtyDaysInSeconds,
    includeSubDomains: false
}));


//Internal modules
const postsRoutes = require('./routes/post');
const userRoutes =  require('./routes/user');


app.use((req, res, next) => {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    }
    
});

db.authenticate().then( () =>console.log("Data  Base Connected !")).catch((err) => console.log(err));
    
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);

app.listen(3000, () => {
    console.log("Server Listening");
});