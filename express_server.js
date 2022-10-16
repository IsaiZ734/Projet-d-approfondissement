var express = require('express');
var app = express ()

app.set('view engine', 'ejs');
app.set('views', 'static');

// app.use(function(req,res,next) {
//     console.log ( req.url );
//     next();
//   });

app.get('/', function(req,res,next){
    res.render('index.ejs');
});

app.get('/login', function(req,res,next){
    res.render('login.ejs');
});

app.get('/incident', function(req,res,next){
    res.render('incident.ejs');
});

app.use(express.static('content'));
app.listen(8080);