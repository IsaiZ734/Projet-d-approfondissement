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

//exporting variables
module.exports={
    app:app,
    sequelize:sequelize,
    User:User,
    Incident:Incident
}

//imports
const index =require("./static/scripts/index")
const login =require("./static/scripts/login");


//ajouter un incident manuellement via la requette /add , il faut passer un objet
//Incident
app.post("/add",async (req,res)=>{
    try{
        console.log(req.body,req.session.username)
        const user=req.session.username
        Incident.create({
            user:user,
            description:req.body.description,
            address:req.body.address,
            date:new Date().toISOString()
        }).then(console.log("incident added"))
        
        res.redirect("/");

    }catch{
        res.send(console.log("incident not added"))
    }
});

//index

app.get('/', async function(req,res,next){
    let table =await index.allIncidents;
    res.render('index.ejs',await index.update(req.session.username));
});




//login,signup


app.post('/ident', async function(req, res, next){
    sequelize.sync();

    let result = await login.login(req.body.username1,req.body.password1);

    if(result==req.body.username1){
        req.session.username=result;
        res.redirect('/');
    }else{
        res.redirect('/login?incorrect=true');
    } 


/*     if (req.body.username1 == "mismo" && req.body.password1 == "mismo"){
        req.session.username1 = "mismo";
        res.redirect('/');
    } else {
        res.redirect('/login?incorrect=true');
    } */
});

app.get('/login', function(req,res,next){
    if (req.query.incorrect){
        res.render('login.ejs', {incorrect: "The username or the password you entered was incorrect."});
    } else {
        res.render('login.ejs', {incorrect: ""});
    }
});

app.post('/signUp',async function(req,res,next){
    const username =new String(req.body.username2).toLowerCase()
    const email=new String(req.body.email).toLowerCase()

    if (await login.usernameTaken(username)){
        res.render('login.ejs', {incorrect: "The username is already taken try a new one"});
    }else if(await login.emailTaken(email)){
        res.render('login.ejs', {incorrect: "The email is already taken try a new one"});
    }else{
        try{
            User.create({
                user:username,
                firstName:req.body.name.split(" ")[0],
                lastName:req.body.name.split(" ")[1],
                email:email,
                password:req.body.password2
            }).then(console.log("User added"))
            
            res.render('login.ejs',{incorrect:""});
    
        }catch{
            res.render('login.ejs', {incorrect: "User did not created data missing"});
        }
    }
})








app.get('/incident', function(req,res,next){

    if(req.session.username){
        res.render('incident.ejs',{rememeber:"22-12-2022"});
    }else{
        res.redirect('/login');
    res.alert('Please login before submitting an incident');
    }
/*     let date= new Date();
    let date1=date.toDateString();
    if (req.session.username1&&req.session.password1){
        res.render('incident.ejs',{rememeber:date1});
        res.render('incident.ejs');
        }
    else {res.redirect('/login');
    res.alert('Please login before submitting an incident');} */
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

