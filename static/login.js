function validateLogin(event){
    let nick = document.forms["loginForm"]["nickName1"].value;
    let pass = document.forms["loginForm"]["password1"].value;
    if (nick === "" || pass != "123pass") {
        event.preventDefault();
        alert("Incorrect password");
        return false;
    }
    return true;
}

function validateRegister(event){
    // event.preventDefault();
    // console.log(document.forms["registerForm"]);
    return true;
}