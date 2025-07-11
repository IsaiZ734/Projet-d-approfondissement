const e = require("express");
const preference = require("./preference");

const sequelize = require("../../express_server").sequelize;
const User = require("../../express_server").User;
const Incident = require("../../express_server").Incident;
const Preference = require("../../express_server").Preference;
//var app = require("../../express_server").app;

async function getAllIncidents() {
    try {
        const [result, meta] = await sequelize.query("SELECT * from Incidents");
        return result.reverse();
    } catch {
        return [];
    }
}

function isLoggedIn(user) {
    return (user === undefined || user === null || new String(user).length == 0) ? "Login" : user;
}

function todaysDate() {
    return (new Date()).toLocaleDateString('de-DE');
}


async function update(username,search="") {
    const resut=await preference.getUserPreferencesAsList(username);
    let size=resut[1];
    if(size===-1)
        size=(await getAllIncidents()).length
    if(search!=""){
        return {Login: isLoggedIn(username), date: todaysDate(), data: await filterData(search,size),Preferences:await preference.getUserPreferencesAsList(username)}  
    }
    return {Login: isLoggedIn(username), date: todaysDate(), data: (await getAllIncidents()).slice(0,size),Preferences:await preference.getUserPreferencesAsList(username)}
}


async function addIncidentsTest() {
    //static data for testing purposes
    const array = [];

    array.push({
        description: "Incident 1",
        address: "LLN Gare",
        user: "ajia",
        date: "2022-10-23"
    });

    array.push({
        description: "Incident 2",
        address: "Grande place",
        user: "adham",
        date: "2022-10-22"
    });

    array.push({
        description: "Incident 3",
        address: "Place de l'université",
        user: "eduart",
        date: "2022-10-21"
    });

    array.push({
        description: "Incident 4",
        address: "Place des Wallons",
        user: "ajia",
        date: "2021-08-14"
    });

    array.push({
        description: "Incident 5",
        address: "Lac",
        user: "adham",
        date: "2022-11-07"
    });

    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        Incident.create(array[i]);
    }

    console.log(await getAllIncidents());

    return "example incidents added";
}

function checkInput(string){

    const name=/^[a-z ,.'-]+$/i
    const address=/(\d{1,}) [a-zA-Z0-9'-\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2}-[0-9]{0,6}/g
    const email =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(string.type==="name") {    
        try{
            if(name.test(string.value)) return string.value;
            else throw e;
        }catch (e){
            throw 'Parameter is not a name!';
        }
    }
    if(string.type==="address") {    
        try{
            if(address.test(string.value)) return string.value;
            else throw e;
        }catch (e){
            throw 'Parameter is not an address!';
        }
    }
    if(string.type==="email") {    
        try{
            if(email.test(string.value)) return string.value;
            else throw e;
        }catch (e){
            throw 'Parameter is not an email!';
        }
    }
    return "";
};


async function filterData(data,number){
        let table =await getAllIncidents();
        
        if(data=="")return table.slice(0,number);
        let filtredTable=[];
    
        for(let i=0;i<table.length;i++){
            if(table[i].user.includes(data)||table[i].description.includes(data)||table[i].address.includes(data)||table[i].date.includes(data)){
                filtredTable.push(table[i]);
            }
        }
        return filtredTable.slice(0,number);
    }
module.exports = { // le module exporte un objet
    getAllIncidents: getAllIncidents,
    isLoggedIn: isLoggedIn,
    todaysDate: todaysDate,
    update: update,
    addIncidentsTest: addIncidentsTest,
    checkInput: checkInput
};