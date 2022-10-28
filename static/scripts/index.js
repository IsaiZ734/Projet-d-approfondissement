function myDatePicker(){
    let myDatePicker = document.getElementById("myDatePicker");
    let todayDate = new Date().toISOString().slice(0, 10);
    myDatePicker.value = todayDate;

}

function datePickerClicked() {
  let myDatePicker = document.getElementById("myDatePicker");
  let myDatePickerValue = myDatePicker.value;
  console.log("Selected value: " + myDatePickerValue);
  getAccidentsByDay(myDatePickerValue);
}

function getAccidentsByDay(selectedDate) {

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

  //const filteredResults = incidents.filter(x => x.date === selectedDate);
  const filteredResults = incidents;

  let incidentsContainer = document.getElementById("incidents-table");
  if (incidentsContainer) {
    let content = "<table>";
    content += "<tr>";
    content += "<th>Description</th>";
    content += "<th>Adresse</th>";
    content += "<th>Rapporté par</th>";
    content += "<th>Date</th>";
    content += "</tr>";

    for (var i = 0; i < filteredResults.length; i++) {
      const incident = filteredResults[i];
      content += "<tr>";
      content += `<td>${incident.description}</td>`;
      content += `<td>${incident.address}</td>`;
      content += `<td>${incident.user}</td>`;
      content += `<td>${incident.date}</td>`;
      content += "</tr>";
    }
    content += "</table>";
    incidentsContainer.innerHTML = content;
  }
}

//search bar filter table
function searchOnKeyUp() {
    let myWord = document.getElementById("searchbar");
    let myWordValue = myWord.value;
    myWord.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        getAccidentsBySearch(myWordValue)
        console.log("placeholder value : " +myWordValue);
      }
    });
  }

function getAccidentsBySearch(searchWord) {
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

  const filteredResults = incidents.filter(x => (x.description == searchWord || x.address == searchWord || x.user ==searchWord||x.date == searchWord));
  let incidentsContainer = document.getElementById("incidents-table");
  if (incidentsContainer) {
    let content = "<table>";
    content += "<tr>";
    content += "<th>Description</th>";
    content += "<th>Adresse</th>";
    content += "<th>Rapporté par</th>";
    content += "<th>Date</th>";
    content += "</tr>";

    for (var i = 0; i < filteredResults.length; i++) {
      const incident = filteredResults[i];
      content += "<tr>";
      content += `<td>${incident.description}</td>`;
      content += `<td>${incident.address}</td>`;
      content += `<td>${incident.user}</td>`;
      content += `<td>${incident.date}</td>`;
      content += "</tr>";
    }
    content += "</table>";
    incidentsContainer.innerHTML = content;
  }

}
//render the myDatePicker
myDatePicker();
//render the table
datePickerClicked();