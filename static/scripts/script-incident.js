const darkmode = localStorage.getItem("darkmode");
const number = localStorage.getItem("number");




if(localStorage.getItem("darkmode")==="true"){
    myFunction();
}

function myFunction() {
    var element1 =document.body;
    element1.classList.toggle("dark");
}