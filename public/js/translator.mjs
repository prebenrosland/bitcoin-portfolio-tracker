import Dictionary from "./dictionary.mjs";

let norsk = document.querySelector('#norsk');
let english = document.querySelector('#english');
let usernameTxt = document.querySelector('#usernameTxt');
let passwordTxt = document.querySelector('#passwordTxt');
let loginBtn = document.querySelector('#loginBtn');
let registerBtn = document.querySelector('#registerBtn');
let h1 = document.querySelector('#h1');
let btcTxt = document.querySelector('#btcTxt');
let manage_users_btn = document.querySelector('#manage_users_btn');

let currentLanguage = "english";

function CheckLanguage(){
    return currentLanguage;
}


norsk.addEventListener("click", function(e){
    currentLanguage = "norsk";

    usernameTxt.innerHTML = Dictionary.no.username;
    passwordTxt.innerHTML = Dictionary.no.password;
    loginBtn.innerHTML = Dictionary.no.login;
    registerBtn.innerHTML = Dictionary.no.register;

    h1.innerHTML = Dictionary.no.h1;
    btcTxt.innerHTML = Dictionary.no.btcTxt;

    manage_users_btn.innerHTML = Dictionary.no.manageUsers;
    
})

english.addEventListener("click", function(e){
    currentLanguage = "english";

    usernameTxt.innerHTML = Dictionary.en.username;
    passwordTxt.innerHTML = Dictionary.en.password;
    loginBtn.innerHTML = Dictionary.en.login;
    registerBtn.innerHTML = Dictionary.en.register;

    h1.innerHTML = Dictionary.en.h1;
    btcTxt.innerHTML = Dictionary.en.btcTxt;

    manage_users_btn.innerHTML = Dictionary.en.manageUsers;


})

export default CheckLanguage;


/*<div id="languageSelection">
<button id="norsk">Norsk</button><button id="english">Engelsk</button>
</div>

<div id="authDiv">
<span>Username:</span><input id="username" aria-label="username">
<br>
<span>Password:</span><input id="password" type="password" aria-label="password">
<br>
<button id="loginBtn">Login</button>
<button id="registerBtn">Register</button>
</div>

<div id="applicationUI" class="hidden">
<h1>Bitcoin Tracker</h1>
<input id="transactionAmount" aria-label="bitcoin tranaction amount"> <button id="transactionBtn">Add</button>
<p>Your BTC balance:</p>
<p id="btc_balance"></p>
</div>

<div id="adminDiv" class="hidden">
<button id="manage_users_btn">Manage users</button>
<ul id="user_list" class="hidden">
    Users:
</ul>
</div>*/