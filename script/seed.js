const { db } = require("@vercel/postgres")
const bcrypt = require("bcrypt");
const { users, invoices, customers } = require("../app/lib/placeholder-data");


//seed users
async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        //create user table
        const createUserTable = await client.sql`
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
            createUserTable,
            users: insertedUsers
        }

    } catch (error) {
        console.log("Failed to seed users ", error);
    }
}


async function seedInvoices(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        //create invoices table
        const createInvoicesTalble = await client.sql`
     CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_V4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
     );
     `;
        console.log('created invoices table');

        const insertedInvoices = await Promise.all(
            invoices.map((invoice) => {
                return client.sql`
            INSERT INTO invoices(customer_id, amount, status, date)
            VALUES(${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
            ON CONFLICT (id) DO NOTHING;
            `;
            })
        )
        console.log(`Seeded ${insertedInvoices.length} invoices`);

        return {
            createInvoicesTalble,
            insertedInvoices
        }


    } catch (error) {
        console.log("Failed to seed invoices ", error);
    }
}

async function seedCustomers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        //create invoices table
        const createCustomerTable = await client.sql`
     CREATE TABLE IF NOT EXISTS customers (
            id UUID DEFAULT uuid_generate_V4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL,
            image_url VARCHAR(255) NOT NULL
     );
     `;
        console.log('created Customers table');

        const insertedCustomers = await Promise.all(
            customers.map((customer) => {
                return client.sql`
            INSERT INTO customers(id, name, email, image_url)
            VALUES(${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
            ON CONFLICT (id) DO NOTHING;
            `;
            })
        )
        console.log(`Seeded ${insertedCustomers.length} customers`);

        return {
            createCustomerTable,
            insertedCustomers
        }


    } catch (error) {
        console.log("Failed to seed invoices ", error);
    }
}





async function main() {
    const client = await db.connect();
    await seedUsers(client)
    await seedInvoices(client)
    await seedCustomers(client)

    await client.end();
}

main().then(console.log("Connected successfully")).catch((error) => console.log(error))