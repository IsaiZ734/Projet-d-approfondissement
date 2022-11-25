const element = document.getElementById("user_preferences").innerText;
localStorage.setItem("darkmode",element.split(",")[0]);
localStorage.setItem("number",element.split(",")[1]);
if(localStorage.getItem("darkmode")==="true"){
    myFunction();
}

function myFunction() {
    var element1 =document.getElementById("myBtn");
    element1.classList.toggle("dark");
}