import FetchBtcLivePrice from './currencyUpdate.mjs';

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
let btc_price;

//Security

//Admin
let admin_div = document.querySelector('#adminDiv');
let user_list = document.querySelector('#user_list');
let manage_users_btn = document.querySelector('#manage_users_btn');

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

const adminDeleteCfg = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    body: {}
}

const adminEditCfg = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: {}
}

loginBtn.addEventListener("click", async function(e){
    loginCfg.body = JSON.stringify({username: userName.value, password: passWord.value});
    
    let resp = await fetch("/users/login", loginCfg);
    let data = await resp.json();
    console.log(data);
    if (data.login === "ok"){
        HideAuthUI();
        userBtcBalance = data.balance;
        localStorage.setItem("username", userName.value);
        if (data.updates < 11){
            btc_price = await FetchBtcLivePrice();
        }
        else{
            console.log("You have spent all you update tokens");
        }
        UpdateBTC();
    }

    else if (data.login === "admin ok"){
        HideAuthUI();
        userBtcBalance = data.balance;
        localStorage.setItem("username", userName.value);
        btc_price = await FetchBtcLivePrice();
        UpdateBTC();
        ShowAdminUI(data.users);
    }
})

registerBtn.addEventListener("click", async function(e){
    registerCfg.body = JSON.stringify({username: userName.value, password: passWord.value});
    
    let resp = await fetch("/users/register", registerCfg);
    let data = await resp.json();
    console.log(data);
})

transactionBtn.addEventListener("click", async function(e){
    transactionCfg.body = JSON.stringify({username: localStorage.getItem("username"), balance: parseFloat(transactionAmount.value)+userBtcBalance});

    let resp = await fetch("/transaction/editBalance", transactionCfg);
    let data = await resp.json();
    console.log(data);

    userBtcBalance = data.balance;
    UpdateBTC();
})

manage_users_btn.addEventListener("click", async function(e){
    user_list.classList.remove("hidden");
})

function HideAuthUI(){
    authDiv.classList.add('hidden');
    applicationUI.classList.remove('hidden');
}

async function ShowAdminUI(userList){
    admin_div.classList.remove('hidden');
    userList.innerHTML = "";
    for (let i of userList){
        let listElement = document.createElement('li');
        let elementDiv = document.createElement('div');
        let elementName = document.createElement('span');
        let elementDelete = document.createElement('button');
        let elementEdit = document.createElement('input');
        

        elementName.innerHTML = i;
        elementDelete.innerHTML = "Delete"
        
        elementDiv.appendChild(elementName);
        elementDiv.appendChild(elementDelete);
        elementDiv.appendChild(elementEdit);
        listElement.appendChild(elementDiv);
        user_list.appendChild(listElement);

        elementDelete.addEventListener("click", async function(e){
            adminDeleteCfg.body = JSON.stringify({username: i});

            let resp = await fetch("/admin/deleteUser", adminDeleteCfg);
            let data = await resp.json();
            console.log(data);
            if (data.delete === "ok"){
                user_list.removeChild(listElement);
            }
        })

        elementEdit.addEventListener("change", async function(e){
            adminEditCfg.body = JSON.stringify({username: i, updates: elementEdit.value});

            let resp = await fetch('/admin/editUserUpdates', adminEditCfg);
            let data = await resp.json();
            console.log(data)
        })
    }
}

function UpdateBTC(){
    btc_balance.innerHTML = userBtcBalance + " ($" + userBtcBalance * btc_price + ")";
}

