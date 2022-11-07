const sequelize = require("../../express_server").sequelize;
const User =require("../../express_server").User;
const Incident =require("../../express_server").Incident;
var app = require("../../express_server").app;
var crypto = require("crypto");


async function login(username,password){
    const result = await sequelize.query(`Select user,password From Users where user= '${username}'`);
    try{
        if(result[0].length>0){
            if(equals(new String(result[0][0].password),new String(password))){
                return new String(username);
            }else{
                return "Password does not match try again"
            }
        }else{
            return"User name doesn't exist, try again"
        }

    }catch (error){
        return error;
    }
}

function equals(s1,s2){
    try{
        if(s1.length!=s2.length)return false;

        for(let i=0;i<s1.length;i++){
            if(s1[i].toLowerCase()!==s2[i].toLowerCase()){
                return false;
            }
        }
        return true;
    }catch (error) {
        throw error;
        
    }
}

async function usernameTaken(username){
    const result = await sequelize.query(`Select user From Users where user= '${username}'`);
    return (result[0].length>0 ? true : false);
}
async function emailTaken(email){
    const result = await sequelize.query(`Select email From Users where email= '${email}'`);
    return (result[0].length>0 ? true : false);
}

async function getAllUsers(){
    try{
        return await sequelize.query("Select * from Users");
    } catch{
        return [];
    }
}

async function addUsersTest(){
    //static data for testing purposes
    const users = [];

    users.push({
        user: "admin",
        email: "admin@admin.com",
        role:"admin",
        password: crypto.createHash("md5").update("admin").digest('hex'),
        name:"admin"
    });

    users.push({
        user: "ajia",
        email: "ajia@ajia.com",
        role:"normal",
        password: crypto.createHash("md5").update("ajia").digest('hex'),
        name:"ajia"
    });

    users.push({
        user: "eduart",
        email: "eduart@eduart.com",
        role:"normal",
        password: crypto.createHash("md5").update("eduart").digest('hex'),
        name:"eduart"
    });

    users.push({
        user: "adham",
        email: "adham@adham.com",
        role:"normal",
        password: crypto.createHash("md5").update("adham").digest('hex'),
        name:"adham"
    });

    for (let i = 0; i<users.length; i++){
        User.create(users[i]);
    }

    return "example users added";
}


exports.usernameTaken = usernameTaken;
exports.emailTaken = emailTaken;
exports.login=login;
exports.getAllUsers=getAllUsers;
exports.addUsersTest=addUsersTest;