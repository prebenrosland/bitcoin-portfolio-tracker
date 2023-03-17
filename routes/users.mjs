const { createHmac } = await import('node:crypto');
import express from "express";
import * as pg from 'pg';
const userRouter = express.Router();
const { Client } = pg.default;

const users = [];

const database = process.env.DATABASE_URL || "postgres://lhpmmsqtyhgmcl:936ad6074f4a587a89be473752a1342a4b799748501a7efad67c569488681d96@ec2-34-251-233-253.eu-west-1.compute.amazonaws.com:5432/d7rhv2l98sse2n";

const credentials = {
    connectionString: database,
    ssl: {
        rejectUnauthorized: false
    }
}


userRouter.post("/login", async (req, res, next) => {
    const newPassword = req.body.password += "salt";
    const hash = createHmac('sha256', newPassword).digest('hex');
    /*for (let i of users){
        if (i.username === req.body.username && i.password === hash){
            res.status(200).send({"login": "ok", "balance": i.balance}).send;
            return;
        }
    }*/
    const client = new Client(credentials);
    try {
        await client.connect();
        let result = await client.query('SELECT * FROM users where username = $1 AND password = $2', [req.body.username, hash]);
        if (result.rowCount > 0){
            let balance = result.rows[0].balance;
            res.status(200).send({"login":"ok", "balance": balance});
        }
        else{
            res.send({error: "Wrong username or password"});
        }
        await client.end();
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'failed to login'});
        client.end();
    }
})

userRouter.put("/login", async (req, res, next) => {
    /*for (let i of users){
        if (i.username === req.body.username){
            i.balance += req.body.balance;
            res.status(200).send({"balance": i.balance}).send;
            return;
        }
    }*/
    const client = new Client(credentials);
    try {
        await client.connect();
        let result = await client.query('UPDATE users SET balance=$1 WHERE username=$2 RETURNING balance', [req.body.balance, req.body.username]);

        let balance = result.rows[0].balance;
        res.send({"transaction": "ok", "balance": balance});

        await client.end();
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'failed to login'});
        client.end();
    }
})


userRouter.post("/register", async (req, res, next) => {
    const newUsername = req.body.username;
    /*for (let i of users){
        if (i.username === newUsername){
            res.status(400).send({"error" : "user already exists"});
            return;
        }
    }*/

    const newPassword = req.body.password += "salt";
    const hash = createHmac('sha256', newPassword).digest('hex');
    let balance = 0;
    let user = {username: newUsername, password: hash, balance: balance};
    users.push(user);

    const client = new Client(credentials);
    try {
        await client.connect();
        await client.query('INSERT INTO users("username", "password", "balance") VALUES ($1, $2, $3)', [newUsername, hash, balance]);
        await client.end();
        res.send({"status": "ok"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'failed to insert user data into the database'});
        client.end();
    }
})

export default userRouter;