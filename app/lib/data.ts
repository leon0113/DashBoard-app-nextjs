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
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await sql<LatestInvoiceRaw>`
        SELECT invoices.amount, customers.name, customers.image_url, customers_email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT  5
        `;
        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount)
        }))
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch invoice data")
    }
}