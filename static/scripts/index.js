const sequelize = require("../../express_server").sequelize;
const User =require("../../express_server").User;
const Incident =require("../../express_server").Incident;
var app = require("../../express_server").app;

async function getAllIncidents(){
  try{
    const [result,meta] = await sequelize.query("SELECT * from Incidents");
    return result;
  }catch{
    return[];
  }
}
function isLoggedIn(user){
    return (user===undefined||user===null||new String(user).length==0)? "Login":user;
}
function todaysDate(){
  return (new Date()).toLocaleDateString('de-DE');
}


async function update(username){
  return{Login:isLoggedIn(username),date: todaysDate(),data: await getAllIncidents()}
}




function randomUserTable() {

  //static data for testing purposes
  const incidents = [];

  incidents.push({
    id: 1,
    description: "Accident 1",
    address: "XYZ 1",
    user: "User1",
    date: "2022-10-23",
  });

  incidents.push({
    id: 2,
    description: "Accident 2",
    address: "XYZ 2",
    user: "User2",
    date: "2022-10-22",
  });

  incidents.push({
    id: 3,
    description: "Accident 3",
    address: "XYZ 3",
    user: "User3",
    date: "2022-10-21",
  });
    return incidents;
  }


module.exports = { // le module exporte un objet
  table: randomUserTable(),
  allIncidents :getAllIncidents(),
  isLoggedIn:isLoggedIn,
  todaysDate:todaysDate,
  update:update
 };