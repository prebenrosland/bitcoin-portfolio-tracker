import express from "express";
import * as pg from 'pg';
import CreateHash from '../modules/hashing.mjs';
const userRouter = express.Router();
const { Client } = pg.default;

const database = process.env.DATABASE_URL;

const credentials = {
    connectionString: database,
    ssl: {
        rejectUnauthorized: false
    }
}

userRouter.post("/login", async (req, res, next) => {
    const newPassword = req.body.password += "salt";
    const hash = CreateHash(newPassword);
    const client = new Client(credentials);
    try {
        await client.connect();
        let result = await client.query('SELECT * FROM users where username = $1 AND password = $2', [req.body.username, hash]);
        let balance = result.rows[0].balance;
        if (result.rowCount > 0 && req.body.username === "admin"){

            let userList = await client.query('SELECT * FROM users');
            let userNames = [];
            for (let i of userList.rows) {
                userNames.push(i.username);
            }
            res.status(200).send({"login":"admin ok", "balance": balance, "users": userNames});
        }
        else if (result.rowCount > 0){
            
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

userRouter.post("/register", async (req, res, next) => {
    const newUsername = req.body.username;
    const newPassword = req.body.password += "salt";
    const hash = CreateHash(newPassword);
    let balance = 0;

    const client = new Client(credentials);
    
    try {
        await client.connect();
        let result = await client.query('SELECT * FROM users WHERE username=$1', [newUsername]);
        if (result.rowCount > 0){
            res.status(400).send({error: 'user already exists'});
            client.end();
            return;
        }
        await client.query('INSERT INTO users("username", "password", "balance") VALUES ($1, $2, $3)', [newUsername, hash, balance]);
        await client.end();
        res.send({"registration": "ok"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'failed to insert user data into the database'});
        client.end();
    }
})

export default userRouter;