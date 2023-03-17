//const { createHmac } = await import('node:crypto');

let userName = document.querySelector('#username');
let passWord = document.querySelector('#password');
let loginBtn = document.querySelector('#loginBtn');
let registerBtn = document.querySelector('#registerBtn');
let authDiv = document.querySelector('#authDiv');
let applicationUI = document.querySelector('#applicationUI');

//Transaction
let transactionAmount = document.querySelector('#transactionAmount');
let transactionBtn = document.querySelector('#transactionBtn');
let btc_balance = document.querySelector('#btc_balance');

//Security

let currentUsername;


let userBtcBalance = 0;

const loginCfg = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: {}
}

const registerCfg = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: {}
}

const transactionCfg = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: {}
}

loginBtn.addEventListener("click", async function(e){
    loginCfg.body = JSON.stringify({username: userName.value, password: passWord.value});
    currentUsername = userName.value;
    
    let resp = await fetch("/users/login", loginCfg);
    let data = await resp.json();
    console.log(data);
    if (data.login === "ok"){
        HideAuthUI();
        userBtcBalance = data.balance;
        localStorage.setItem("username", userName.value);
        UpdateBTC();
    }
})

registerBtn.addEventListener("click", async function(e){
    registerCfg.body = JSON.stringify({username: userName.value, password: passWord.value});
    
    let resp = await fetch("/users/register", registerCfg);
    let data = await resp.json();
    console.log(data);
})

transactionBtn.addEventListener("click", async function(e){
    transactionCfg.body = JSON.stringify({username: currentUsername, balance: parseFloat(transactionAmount.value)+userBtcBalance});

    let resp = await fetch("/users/login", transactionCfg);
    let data = await resp.json();
    console.log(data);

    userBtcBalance = data.balance;
    UpdateBTC();
})

function HideAuthUI(){
    authDiv.classList.add('hidden');
    applicationUI.classList.remove('hidden');
}

function UpdateBTC(){
    btc_balance.innerHTML = userBtcBalance + " ($" + userBtcBalance * 25000 + ")";
}