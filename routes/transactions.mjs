import express from "express";
import * as pg from 'pg';
const transactionRouter = express.Router();
const { Client } = pg.default;

const database = process.env.DATABASE_URL;


const credentials = {
    connectionString: database,
    ssl: {
        rejectUnauthorized: false
    }
}

transactionRouter.put("/editBalance", async (req, res, next) => {

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

export default transactionRouter;