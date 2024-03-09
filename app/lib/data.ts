// data fetching
import { sql } from '@vercel/postgres'
import { Invoice, LatestInvoiceRaw, Revenue } from './definitions';
import { formatCurrency } from './utils';

export const fetchRevenue = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const data = await sql<Revenue>`SELECT * FROM revenues`;
        return data.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch revenue data")
    }
}

export const fetchInvoices = async () => {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await sql<LatestInvoiceRaw>`
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5;

        `;
        // console.log(data.rows);
        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount)
        }))
        return latestInvoices;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch invoice data")
    }
}

export const fetchCardData = async () => {
    try {
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices
        `;
        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise
        ]);
        // console.log(data[2].rows[0].pending);
        const numberOfInvoices = Number(data[0].rows[0].count ?? 0);
        const numberOfCustomers = Number(data[1].rows[0].count ?? 0);
        const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? 0);
        const totalPendingInvoices = Number(data[2].rows[0].pending ?? 0);
        return {
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices,
            totalPendingInvoices
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch Card data")
    }
}
