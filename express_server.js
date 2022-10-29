var express = require('express');
var app = express ()


// app.set('view engine', 'ejs');
app.set('views', 'static');
app.use(express.static('static'));
app.use(express.json());
// app.use(function(req,res,next) {
//     console.log ( req.url );
//     next();
//   });
const sequelize = require("./Database/database")

const User =require('./Database/Users')
const Incident =require('./Database/Incident')

sequelize.sync().then(()=> console.log("db is ready"));


app.post("/add",(req,res)=>{
    try{
        Incident.create(req.body).then(()=>res.send(console.log("incident added")));
    }catch{
        res.send(console.log("incident not added"))
    }
});
app.get('/', function(req,res,next){
    let indexJS = require('./static/scripts/index');
    
    res.render('index.ejs',{date: "22-12-2022",data:indexJS.table});
});

app.get('/login', function(req,res,next){
    res.render('login.ejs');
});

app.get('/incident', function(req,res,next){
    res.render('incident.ejs');
});

app.listen(8080);