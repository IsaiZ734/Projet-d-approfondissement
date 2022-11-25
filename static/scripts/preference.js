const { Preference } = require("../../express_server");
const sequelize = require("../../express_server").sequelize;

async function getUserPreferencesAsList(username){
    try {
        const userPreferences = await Preference.findOne({ where: { user: username } });
        const result = [];
        result.push(userPreferences.darkMode);
        result.push(userPreferences.numberOfIncidents);
        return result;
    } catch {
        return [0,-1];
    }
}

async function updateUserPreferences(username,preferences){
    const userPreferences = await Preference.findOne({ where: { user: username } });

    if (userPreferences) {
      userPreferences.darkMode = preferences[0];
      userPreferences.numberOfIncidents = preferences[1];
      await userPreferences.save();
    } else {
      console.log("User not found");
    }  
}
function addTest(){
    Preference.create({
        user:"admin",
        darkMode:false,
        numberOfIncidents:10

    })
}

module.exports = { // le module exporte un objet
        addTest:addTest,
        modify:updateUserPreferences,
        getUserPreferencesAsList:getUserPreferencesAsList
};