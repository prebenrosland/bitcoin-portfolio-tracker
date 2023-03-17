const { createHmac } = await import('node:crypto');
import express from "express";
import * as pg from 'pg';
const userRouter = express.Router();
const { Client } = pg.default;

const users = [];

const database = process.env.DATABASE_URL;


let createDB = new Client(database);
createDB.connect();
await createDB.query('CREATE DATABASE mydatabase');
createDB.close();



userRouter.get("/login", (req, res, next) => {
    res.send({data: "your data"})
})

userRouter.post("/login", (req, res, next) => {
    const newPassword = req.body.password += "salt";
    const hash = createHmac('sha256', newPassword).digest('hex');
    for (let i of users){
        if (i.username === req.body.username && i.password === hash){
            res.status(200).send({"login": "ok", "balance": i.balance}).send;
            return;
        }
    }
    res.status(400).send({"error": "invalid username or password"});
})

userRouter.put("/login", (req, res, next) => {
    for (let i of users){
        if (i.username === req.body.username){
            i.balance += req.body.balance;
            res.status(200).send({"balance": i.balance}).send;
            return;
        }
    }
    res.status(400).send({"error": "invalid username or password"});
})


userRouter.get("/register", (req, res, next) => {
    res.send({data: "your data"})
})

userRouter.post("/register", async (req, res, next) => {
    const client = new Client(database);

    const newUsername = req.body.username;
    for (let i of users){
        if (i.username === newUsername){
            res.status(400).send({"error" : "user already exists"});
            return;
        }
    }

    const newPassword = req.body.password += "salt";
    const hash = createHmac('sha256', newPassword).digest('hex');

    let balance = 0;
    let user = {username: newUsername, password: hash, balance: balance}
    users.push(user);

    try {

        await client.connect();
        await client.query('INSERT INTO "users" (username, password) VALUES ("preben", "123")');
        client.end();

    } catch (error) {
        console.log(error);
    }
    

    //res.send(req.body);
    //res.send(users);
})

export default userRouter;