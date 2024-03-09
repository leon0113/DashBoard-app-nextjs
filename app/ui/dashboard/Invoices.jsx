import { fetchInvoices } from "@/app/lib/data"

export default function Invoices() {
    const invoices = fetchInvoices();
    console.log(invoices);
    return (
        <div className="border-2 bg-sky-300"></div>
    )
}
