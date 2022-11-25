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
const Preference = require('./Database/Preference')
sequelize.sync().then(() => {emptyDB(),console.log("db is ready")});

//exporting variables
module.exports = {
    app: app,
    sequelize: sequelize,
    User: User,
    Incident: Incident,
    Preference:Preference
}

//imports
const index = require("./static/scripts/index")
const login = require("./static/scripts/login");
const user_preference = require("./static/scripts/preference");
const preference = require("./static/scripts/preference");

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
                name: index.checkInput({type:"name",value:new String(req.body.name).toLowerCase()}),
                email: email,
                password: crypto.createHash("md5").update(req.body.password2).digest('hex'),
                role: "normal"
            }).then(console.log("User added"))

            res.redirect("/login");

        } catch (e) {
            res.render('login.ejs', {incorrect1: "", incorrect2: "User was not created, data missing : "+ e});
        }
    }
})


app.get('/incident', function (req, res, next) {
    if (req.session.username) {
        try{
            res.render('incident.ejs', {user:req.session.username,incorrect:req.session.message.alert,rememeber: (new Date()).toLocaleDateString('de-DE')});
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
//modifying user preferences
app.post("/10",async (req, res) => {
    if(index.isLoggedIn(req.session.username)!=="Login"){
        let user_preference = await preference.getUserPreferencesAsList(req.session.username);
        if(user_preference[0]===false&&user_preference[1]===-1) Preference.create({
            user:req.session.username,
            darkmode:false,
            numberOfIncidents:10
        })
        preference.modify(req.session.username,[user_preference[0],10]);
    }
    res.redirect("/");
});
app.post("/20",async (req, res) => {
    if(index.isLoggedIn(req.session.username)!=="Login"){
        let user_preference = await preference.getUserPreferencesAsList(req.session.username);
        if(user_preference[0]===false&&user_preference[1]===-1) Preference.create({
            user:req.session.username,
            darkmode:false,
            numberOfIncidents:20
        })
        preference.modify(req.session.username,[user_preference[0],20]);
    }
    res.redirect("/");
});
app.post("/-1",async (req, res) => {
    if(index.isLoggedIn(req.session.username)!=="Login"){
        let user_preference = await preference.getUserPreferencesAsList(req.session.username);
        if(user_preference[0]===false) preference.deletePreference(req.session.username)
        preference.modify(req.session.username,[user_preference[0],-1]);
    }
    res.redirect("/");
});
app.post("/switch",async (req, res) => {
    if(index.isLoggedIn(req.session.username)!=="Login"){
        let user_preference = await preference.getUserPreferencesAsList(req.session.username);
        if(!user_preference[0]===false&&user_preference[1]===-1) preference.deletePreference(req.session.username)
        if(user_preference[0]===false&&user_preference[1]===-1) Preference.create({
            user:req.session.username,
            darkmode:true,
            numberOfIncidents:-1
        })
        preference.modify(req.session.username,[!user_preference[0],user_preference[1]]);
    }
    res.redirect("/");
});


app.use(express.static('static'));
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'ingi'
}, app).listen(8080);

