const database = process.env.DATABASE_URL;


const credentials = {
    connectionString: database,
    ssl: {
        rejectUnauthorized: false
    }
}

export default credentials;