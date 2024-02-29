const { db } = require("@vercel/postgres")
const bcrypt = require("bcrypt")

//seed users
async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        //create user table
        const createTable = await client.sql`
           CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_V4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
           )
           `

    } catch (error) {
        console.log("Failed to seed users", error);
    }
}

async function main() {
    const client = await db.connect();


    await client.end();
}

main().then(console.log("Connected successfully")).catch((error) => console.log(error))