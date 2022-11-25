const element = document.getElementById("user-pref").innerText;
if(document.getElementById("btn-login").innerHTML==="Login"){
    localStorage.setItem("darkmode",localStorage.getItem("darkmode"));
}else{
    localStorage.setItem("darkmode",element.split(",")[0]);
}
localStorage.setItem("number",element.split(",")[1]);
if(localStorage.getItem("darkmode")==="true"){
    myFunction();
}

function myFunction() {

    let tableElements = document.getElementById("myTable");
    for(let j = 1; j < tableElements.rows.length; j++)
    {
        var r = tableElements.rows[j] ;
        for (var i=0; i<r.cells.length; i++) {
            r.cells[i].classList.toggle("dark");
        }
    
    }
}
function proceed (string) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/'+string);
    form.style.display = 'hidden';
    document.body.appendChild(form)
    form.submit();
}
function chose(string){
    if(document.getElementById("btn-login").innerHTML==="Login"){
        localStorage.setItem("darkmode",!localStorage.getItem("darkmode"))
        myFunction();
    }else{
        proceed (string);
    }
}