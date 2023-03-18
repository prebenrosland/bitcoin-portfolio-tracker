import express from "express";
import * as pg from 'pg';
const adminRouter = express.Router();
const { Client } = pg.default;

const database = process.env.DATABASE_URL;


const credentials = {
    connectionString: database,
    ssl: {
        rejectUnauthorized: false
    }
}

adminRouter.delete('/deleteUser', async (req, res, next) => {
    
    const client = new Client(credentials);
    try {
        await client.connect();
        await  client.query('DELETE FROM users WHERE username=$1', [req.body.username]);
        client.end();
        res.status(200).send({"delete": "ok"})
    }
    catch{
        res.send({error: 'failed to delete', "username": req.body.username})
    }
})

export default adminRouter;