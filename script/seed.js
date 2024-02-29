const { db } = require("@vercel/postgres")
const bcrypt = require("bcrypt");
const { users } = require("../app/lib/placeholder-data");


//seed users
async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        //create user table
        const createTable = await client.sql`
           CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_V4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
           );
           `;
        console.log("created users table");

        // insert data on user table 
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                INSERT INTO users(id, name, email, password)
                VALUES(${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
                `;
            })
        );
        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers
        }

    } catch (error) {
        console.log("Failed to seed users", error);
    }
}



async function main() {
    const client = await db.connect();
    await seedUsers(client)

    await client.end();
}

main().then(console.log("Connected successfully")).catch((error) => console.log(error))