import { abel } from '../ui/fonts'
import Revenue from '../ui/dashboard/Revenue'
import Invoices from '../ui/dashboard/Invoices'
import Cards from '../ui/dashboard/Cards'
import { fetchCardData } from '../lib/data'

export default async function Dashboard() {
    const { numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices } = await fetchCardData();
    console.log(numberOfCustomers);
    return (
        <main>
            <div className={`${abel.className} mb-4 text-xl md:text-2xl`}>Dashboard</div>
            {/* cards  */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Cards title={'Collected'} value={totalPaidInvoices} />
                <Cards title={'Pending'} value={totalPendingInvoices} />
                <Cards title={'Total Invoices'} value={numberOfInvoices} />
                <Cards title={'Total Customers'} value={numberOfCustomers} />
            </div>

            {/* Recent revenue and Latest Invoices */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Revenue />
                <Invoices />
            </div>

        </main>
    )
}
