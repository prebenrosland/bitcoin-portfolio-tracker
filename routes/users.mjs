const { createHmac } = await import('node:crypto');
import express from "express";
import * as pg from 'pg';
const userRouter = express.Router();
const { Client } = pg.default;

const users = [];

const database = process.env.DATABASE_URL || "postgres://lhpmmsqtyhgmcl:936ad6074f4a587a89be473752a1342a4b799748501a7efad67c569488681d96@ec2-34-251-233-253.eu-west-1.compute.amazonaws.com:5432/d7rhv2l98sse2n";


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
    let user = {username: newUsername, password: hash, balance: balance};
    users.push(user);

    const client = new Client(database);
    try {
        await client.connect();
        await client.query('INSERT INTO "users" (username, password) VALUES ("preben", "123")');
        client.end();
        res.send({"status": "ok"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'failed to insert user data into the database'});
        client.end();
    }
})

export default userRouter;