var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');
var app = express ();


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

//ajouter un incident manuellement via la requette /add , il faut passer un objet
//Incident
app.post("/add",(req,res)=>{
    try{
        Incident.create(req.body).then(()=>res.send(console.log("incident added")));
    }catch{
        res.send(console.log("incident not added"))
    }
});

app.post('/ident', function(req, res, next){
    if (req.body.username1 == "mismo" && req.body.password1 == "mismo"){
        req.session.username1 = "mismo";
        res.redirect('/');
    } else {
        res.redirect('/login?incorrect=true');
    }
});

app.get('/', async function(req,res,next){
    const [result,meta] = await sequelize.query("SELECT * from Incidents");
    res.render('index.ejs',{date: "22-12-2022",data:result});
});

app.get('/login', function(req,res,next){
    if (req.query.incorrect){
        res.render('login.ejs', {incorrect: "The username or the password you entered was incorrect."});
    } else {
        res.render('login.ejs', {incorrect: ""});
    }
});

app.get('/incident', function(req,res,next){
    let date= new Date();
    let date1=date.toDateString();
    if (req.session.username1&&req.session.password1){
        res.render('incident.ejs',{rememeber:date1});
        res.render('incident.ejs');
        }
    else {res.redirect('/login');
    res.alert('Please login before submitting an incident');}
});

app.get('/subm.html', function (req,res,next){
    if (req.session.username1&&req.session.password1) {
        res.render('add.ejs')
        res.redirect('/')
       
    }
    else {
        res.redirect('/login');
        res.alert('Your session has expired please login to continue')}
})

app.use(express.static('static'));
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
  }, app).listen(8080);
