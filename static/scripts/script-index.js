const element = document.getElementById("user-pref").innerText;
localStorage.setItem("darkmode",element.split(",")[0]);
localStorage.setItem("number",element.split(",")[1]);
if(localStorage.getItem("darkmode")==="true"){
    myFunction();
}

function myFunction() {
    var element1 =document.body;
    element1.classList.toggle("dark");
}
function proceed (string) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/'+string);
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}