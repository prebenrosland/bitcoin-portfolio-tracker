import express from "express";
import * as pg from 'pg';
import credentials from '../Database/connection.mjs'
const adminRouter = express.Router();
const { Client } = pg.default;

adminRouter.delete('/deleteUser', async (req, res, next) => {
    
    const client = new Client(credentials);
    try {
        await client.connect();
        await client.query('DELETE FROM users WHERE username=$1', [req.body.username]);
        res.status(200).send({"delete": "ok"})
    }
    catch{
        res.send({error: 'failed to delete', "username": req.body.username})
    }
    finally {
        client.end();
    }
})

adminRouter.put('/editUserUpdates', async (req, res, next) => {

    const client = new Client(credentials);
    try {
        await client.connect();
        let result = await client.query('UPDATE users SET updates=$1 WHERE username=$2 RETURNING username', [req.body.updates, req.body.username]);
        client.end();
        if (result.rowCount > 0){
            res.status(200).send({"edit": "ok"});
        }
        else{
            res.status(400).send({"error": "user not found"});
        }
    }
    catch{
        res.status(500).send({error: 'failed to edit', "username": req.body.username});
    }
    finally {
        client.end();
    }
})

export default adminRouter;