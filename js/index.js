var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var signUpBtn = document.getElementById("signUpBtn");
var logInBtn = document.getElementById("loginBtn");
var success = document.getElementById("success");
var error = document.getElementById("error");
var welcome = document.getElementById("welcome");
var emailAlert = document.getElementById("alert");
var passwordAlert = document.getElementById("passAlert");
var logOutBtn= document.getElementById("logOutBtn");
var signUpInfoContainer;

if (localStorage.getItem("signUPInfolist") == null) {
    signUpInfoContainer = [];
}
else {
    signUpInfoContainer = JSON.parse(localStorage.getItem("signUPInfolist"));
}
// ------------------------Add information to sign up----------------------------------------------------
function AddSignUpInfo() {
    if (checkInputs() == false) {
        success.innerHTML = "";
        error.innerHTML = `<p>all inputs are required<p>`;

    }
    else if (validateUserEmail()==false) {
        success.innerHTML = "Fail";
    }
    else if (validateUserPassword()==false) {
        success.innerHTML = "Fail";
    }
    else if (checkEmail() == true) {
        error.innerHTML = `<p>email already exists<p>`;
        success.innerHTML = "";
    }

    else if (checkInputs() == true&&validateUserEmail()==true&&validateUserPassword()==true) {
        var info = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,

        }
        signUpInfoContainer.push(info);
        localStorage.setItem("signUPInfolist", JSON.stringify(signUpInfoContainer));
        success.innerHTML = "Success";
        error.innerHTML = "";
        clearForm();
    }
}
    signUpBtn.addEventListener("click", AddSignUpInfo);
// -------------------------check The Input---------------------------------------------------
function checkInputs() {
    if (userName.value != "" && userEmail.value != "" && userPassword.value != "") {
        return true;
    }
    else {
        return false;
    }
}
// --------------------------------clear form--------------------------------------------
function clearForm() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
}
// ------------------------------check Email----------------------------------------------
function checkEmail() {

    for (var i = 0; i < signUpInfoContainer.length; i++) {

        if (userEmail.value == signUpInfoContainer[i].email) {

            return true;

        }
    }
    return false;
}


// -------------------------------check Login Information---------------------------------------------
function checkLoginInfo() {

    if (checkLoginInputs() == true && matchLoginInfo() == false) {
        error.innerHTML = `<p>Incorrect email or password<p>`;
    }
    else if (checkLoginInputs() == true && matchLoginInfo() == true) {
        goHome(); 
    }

    else {
        error.innerHTML = `<p>all inputs are required<p>`;
    }
}
logInBtn.addEventListener("click", checkLoginInfo);


// ----------------------------------------------------------------------------
function matchLoginInfo() {
    for (var i = 0; i < signUpInfoContainer.length; i++) {

        if (userEmail.value == signUpInfoContainer[i].email && userPassword.value == signUpInfoContainer[i].password) {
            localStorage.setItem('userInputName', signUpInfoContainer[i].name)
            return true;
        }
    }
    return false;
}
// --------------------------back to home page --------------------------------------------------
function goHome() {
    window.location.assign("home.html");
}
// ----------------------------------------------------------------------------
function checkLoginInputs() {
    if (userEmail.value != "" && userPassword.value != "") {
        return true;
    }
    else {
        return false;
    }
};
// ---------------------------home page welcome-------------------------------------------------

    var userInputName = localStorage.getItem('userInputName');
    if (userInputName) {
        document.getElementById('welcome').innerHTML = "welcome " + userInputName;
    }


logOutBtn.addEventListener("click",function(){
    localStorage.removeItem('userInputName');

})
// -------------------------email validation---------------------------------------------------
function validateUserEmail() {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(userEmail.value) == true) {

        emailAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        emailAlert.classList.replace("d-none", "d-block");

        return false;
    }
}
// ------------------------password validation-------------------------------------------------
function validateUserPassword() {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (regex.test(userPassword.value) == true) {

        passwordAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        passwordAlert.classList.replace("d-none", "d-block");

        return false;
    }
}
