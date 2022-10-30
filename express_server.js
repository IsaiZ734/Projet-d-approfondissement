var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');
var app = express ()


app.set('view engine', 'ejs');
app.set('views', 'static');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());

app.use(session({
  secret: "propre123",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/', 
    httpOnly: true
  }
}));

const sequelize = require("./Database/database")
const User =require('./Database/Users')
const Incident =require('./Database/Incident')

sequelize.sync().then(()=> console.log("db is ready"));


app.get('/signIn', function(req,res,next){
    res.render('index.ejs', {nick: req.query.nickName1}); //faire un label pour mettre le nickname dedans
});

app.get('/', function(req,res,next){
    let indexJS = require('./static/scripts/index');

//ajouter un incident manuellement via la requette /add , il faut passer un objet
//Incident
app.post("/add",(req,res)=>{
    try{
        Incident.create(req.body).then(()=>res.send(console.log("incident added")));
    }catch{
        res.send(console.log("incident not added"))
    }
});


app.get('/', async function(req,res,next){
    const [result,meta] = await sequelize.query("SELECT * from Incidents");
    res.render('index.ejs',{date: "22-12-2022",data:result});
});

app.get('/login', function(req,res,next){
    res.render('login.ejs');
});

app.get('/incident', function(req,res,next){
    res.render('incident.ejs');
});

app.use(express.static('static'));
app.listen(8080);