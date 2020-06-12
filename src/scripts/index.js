import '../styles/index.scss';
'use strict';
//input
let group = document.getElementsByClassName('input-group');
for (let i = 0; i < group.length; i++) {
    group[i].onclick = addLabelActiveClass;
    let input = group[i].getElementsByTagName('input')[0];
    input.onblur = removeLabelActiveClass;
    input.onfocus = callLabelActiveClass;

} //end for loop
function callLabelActiveClass() {
    addLabelActiveClass.call(this.parentNode);
}

function addLabelActiveClass() {
    let label = this.getElementsByTagName('label')[0];
    let input = this.getElementsByTagName('input')[0];
    if (!label.classList.contains('active')) {
        label.classList.add('active');
        input.focus();
    }
}

function removeLabelActiveClass() {
    if (this.value === "") {
        let label = this.parentNode.children[0];
        if (label.classList.contains('active')) {
            label.classList.remove('active');
        }
    }
}

function myFunction(e) {
    if (document.querySelector('.loginForm') !== null) {
        document.querySelector('.loginForm').classList.add('active');
    }
    e.target.className = "active";
}
///*Variables form form inputs*/
let firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    userName = document.getElementById('userName'),
    emailInput = document.getElementById('email'),
    passInput = document.getElementById('password'),
    confirmPass = document.getElementById('confirmPass'),
    submitBtn = document.getElementById('submitBtn'),
    lgnEmail = document.querySelectorAll('#loginForm #email'),
    lgnPass = document.querySelectorAll('#loginForm #password');

var firstNameValid = () => {
    'use strict';
    let firstValue = firstName.value,
        nameFormat = /^[a-zA-Z]{3,16}$/;
    if (firstValue) {
        firstName.style.border = "";
        if (firstValue.match(nameFormat)) {
            firstName.style.border = "";
        } else {
            firstName.style.border = "2px solid #ffa502";
        }
    } else {
        firstName.style.border = "2px solid #ffa502";
    }
};
var lastNameValid = () => {
    let lastValue = lastName.value,
        nameFormat = /^[a-zA-Z]{3,16}$/;
    if (lastValue) {
        lastName.style.border = "";
        if (lastValue.match(nameFormat)) {
            lastName.style.border = "";
        } else {
            lastName.style.border = "2px solid #ffa502";
        }
    } else {
        lastName.style.border = "2px solid #ffa502";
    }
};
var userValid = () => {
    let userValue = userName.value,
        userFormat = /^[a-zA-Z0-9_-]{3,16}$/;
    if (userValue) {
        userName.style.border = "";
        if (userValue.match(userFormat)) {
            userName.style.border = "";
        } else {
            userName.style.border = "2px solid #ffa502";
        }
    } else {
        userName.style.border = "2px solid #ffa502";
    }
};
var emailValidation = () => {
    let value = emailInput.value,
        mailformat = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
    if (value) {
        emailInput.style.border = "";
        if (value.match(mailformat)) {
            emailInput.style.border = "";
        } else {
            emailInput.style.border = "2px solid #ffa502";
        }
    } else {
        emailInput.style.border = "2px solid #ffa502";
    }
};
var passValidation = () => {
    let passValue = passInput.value,
        confirmvalue = confirmPass.value,
        passformat = /^\S*\w{2,}$/;
    if (passValue) {
        passInput.style.border = "";
        if (passValue.match(passformat)) {
            passInput.style.border = "";
            if (confirmvalue) {
                confirmPass.style.border = "";
                if (confirmvalue === passValue) {
                    confirmPass.style.border = "";
                } else {
                    confirmPass.style.border = "2px solid #ffa502";
                }
            } else {
                confirmPass.style.border = "2px solid #ffa502";
            }
        } else {
            passInput.style.border = "2px solid #ffa502";
        }
    } else {
        passInput.style.border = "2px solid #ffa502";
        confirmPass.style.border = "2px solid #ffa502";
    }
};
var localStorageCheck = () => {
    'use strict';
    let localEmail = localStorage.getItem('emailInput'),
        localPass = localStorage.getItem('password');
    if ((localEmail == lgnEmail[0].value) && (localPass == lgnPass[0].value)) {
        let nameShow = localStorage.getItem('firstName');
        
        //alert('Welcome '+ nameShow + ' !');
        
        let workspace = document.getElementById('workSpace');
         workspace.className = 'hide';
          let formLogin = document.getElementById('header'); 
          formLogin.className = 'show';

        let nametoShow = localStorage.getItem('firstName');
        document.getElementById("p1").innerHTML = 'Welcome ' + nametoShow + ' !';
    } else {
        lgnEmail[0].style.border = "2px solid #ffa502";
        lgnPass[0].style.border = "2px solid #ffa502";
        alert('Please check email and password again.');
    }
};
//for signUp Form
let form = document.getElementById("signUpForm");
var handleForm = (event) => {
    event.preventDefault();
    firstNameValid();
    lastNameValid();
    userValid();
    emailValidation();
    passValidation();
    localStorage.setItem("emailInput", emailInput.value);
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("password", passInput.value);
    let mailFromStorage = localStorage.getItem("emailInput");
    let passwordFromStorage = localStorage.getItem("passInput");
    let formSU = document.getElementById('signUpForm');
    alert('You created and account! You can use email address and password for login.');
    formSU.className = 'hide';
    let formLogin = document.getElementById('loginForm');
    formLogin.className = 'show';
};
form.addEventListener('submit', handleForm);
//for Login Form
let formLogin = document.getElementById("loginForm");
var handleFormLogin = (event) => {
    event.preventDefault();
    emailValidation();
    passValidation();
    localStorageCheck();
};
formLogin.addEventListener('submit', handleFormLogin);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let objs = this.responseText;
            var data = JSON.parse(this.responseText);  // convert the response to a json object 
            append_json(data);  // pass the json object to the append_json function 
        }};
            xhttp.open("GET", "../recipes.json", true);
            xhttp.send();
var append_json = (data) => {
    let cardWrapper = document.getElementById('cardWrapper');
    data.forEach(function (object) {
        let inHTML = document.createElement('div');
            //Used dummy image because it seems like images paths are broken at json file
        inHTML.innerHTML = '<div class="card col"><input id="toggle-heart_' + object.id + '" type="checkbox" /><label for="toggle-heart_' + object.id + '"> ❤</label><div class="card-image"><img src="' + 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' + '" /></div>' + '<div class="card-body"><div class="card-firstTitle"><h1>' + object.name + '</h1></div>' 
                        + '<div class="card-title"><h3>' + object.headline + '</h3></div>' 
                        + '<div class="card-excerpt"><div class="infos"><span>©' + object.calories + '</span> <span>⏲' + object.time + '</span></div><p>' + object.description + '</p>' 
                        + '<div id="rate_' + object.id + '"class="rating"><span class="hidden-rating">' + object.rating + '</span><input type="radio" name="rating_' + object.id + '" id="r1_' + object.id + '"><label for="r1_' + object.id + '"></label>' 
                        + '<input type="radio" name="rating_' + object.id + '" id="r2_' + object.id + '"><label for="r2_' + object.id + '"></label>' 
                        + '<input type="radio" name="rating_' + object.id + '" id="r3_' + object.id + '"><label for="r3_' + object.id + '"></label>'
                        + '<input type="radio" name="rating_' + object.id + '" id="r4_' + object.id + '"><label for="r4_' + object.id + '"></label>' 
                        + '<input type="radio" name="rating_' + object.id + '" id="r5_' + object.id + '"><label for="r5_' + object.id + '"></label></div>'
                        + '</div>' 
                        + '</div>';
        cardWrapper.appendChild(inHTML);
    });
};