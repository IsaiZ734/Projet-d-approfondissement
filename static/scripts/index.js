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
  table: randomUserTable()
 };