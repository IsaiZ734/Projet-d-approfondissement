var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var https = require("https");
var fs = require("fs");
var app = express();


app.set("view engine", "ejs");
app.set("views", "static");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: "propre123",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        httpOnly: true
    }
}));

const sequelize = require("./Database/database")
const User = require('./Database/Users')
const Incident = require('./Database/Incident')

sequelize.sync().then(() => {emptyDB(),console.log("db is ready")});

//exporting variables
module.exports = {
    app: app,
    sequelize: sequelize,
    User: User,
    Incident: Incident
}

//imports
const index = require("./static/scripts/index")
const login = require("./static/scripts/login");
const e = require('express');
const { table } = require("console");
const { render } = require("ejs");

async function emptyDB() {
    //console.log(await login.getAllUsers())
    if ((await login.getAllUsers()).length == 0) {
        console.log("empty Users table");
        login.addUsersTest();
    } else {
        console.log("Users table is not empty");
    }
    if ((await index.getAllIncidents()).length == 0) {
        console.log("empty Incident table");
        index.addIncidentsTest();
    } else {
        console.log("Incident table is not empty");
    }
}

//ajouter un incident manuellement via la requette /add , il faut passer un objet


//index
    //render the first page
app.get('/', async function (req, res, next) {
    try{
        res.render('index.ejs', await index.update(req.session.username,req.session.message.search));
    }catch{
        res.render('index.ejs', await index.update(req.session.username));
    }
});

    //when the search bar is used, uses the middleware to sent data when redirected
app.post('/request/search', async function (req, res, next) {
    req.session.message={search:req.body.search}
    res.redirect("/");
});


//login,signup
app.post('/ident', async function (req, res, next) {
    sequelize.sync();

    var hash = crypto.createHash("md5").update(req.body.password1).digest('hex');

    let result = await login.login(req.body.username1, hash);

    if (result == req.body.username1) {
        req.session.username = result;
        res.redirect('/');
    } else {
        res.redirect('/login?incorrect=true');
    }
});

app.get('/login', function (req, res, next) {
    if (req.query.incorrect) {
        res.render('login.ejs', {incorrect1: "The username or the password you entered was incorrect", incorrect2: ""});
    } else {
        res.render('login.ejs', {incorrect1: "", incorrect2: ""});
    }
});

app.post('/signUp', async function (req, res, next) {
    const username = new String(req.body.username2).toLowerCase()
    const email = new String(req.body.email).toLowerCase()

    if (await login.usernameTaken(username)) {
        res.render('login.ejs', {incorrect1: "", incorrect2: "The username is already taken try a new one"});
    } else if (await login.emailTaken(email)) {
        res.render('login.ejs', {incorrect1: "", incorrect2: "The email is already taken try a new one"});
    } else {
        try {
            User.create({
                user: username,
                name: req.body.name,
                email: email,
                password: crypto.createHash("md5").update(req.body.password2).digest('hex'),
                role: "normal"
            }).then(console.log("User added"))

            res.send("Account created");

        } catch {
            res.render('login.ejs', {incorrect1: "", incorrect2: "User was not created, data missing"});
        }
    }
})


app.get('/incident', function (req, res, next) {
    if (req.session.username) {
        try{
            res.render('incident.ejs', {user:req.session.username,incorrect:req.session.message.alert,{rememeber: (new Date()).toLocaleDateString('de-DE'), nom:req.session.username}});
        }catch{
            res.render('incident.ejs', {user:req.session.username,incorrect:"",rememeber: (new Date()).toLocaleDateString('de-DE')});
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/subm.html', function (req, res, next) {
    if (req.session.username1 && req.session.password1) {
        res.render('add.ejs')
        res.redirect('/')

    } else {
        res.redirect('/login');
        res.alert('Your session has expired please login to continue')
    }
})


//Incident 
app.post("/add",(req, res) => {
    const user = req.session.username;
    req.session.message={alert:""};
    try {
        //console.log(req.body, req.session.username)
        const obj={
            user: user,
            description: req.body.description,
            address: index.checkInput({type:"address",value:req.body.address}),
            date: new Date().toISOString()
        }
        Incident.create(obj).then(req.session.message.alert="")
        res.redirect("/");

    } catch (e) {
        req.session.message.alert=e;
        req.session.username=user;
        res.redirect('/incident');
    }
});

app.use(express.static('static'));
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080);

