// data fetching
import { sql } from '@vercel/postgres'
import { Revenue } from './definitions';

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