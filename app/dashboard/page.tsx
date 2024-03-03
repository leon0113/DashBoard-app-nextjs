import { abel } from '../ui/fonts'
import Revenue from '../ui/dashboard/Revenue'

export default function Dashboard() {
    return (
        <main>
            <div className={`${abel.className} mb-4 text-xl md:text-2xl`}>Dashboard</div>
            {/* cards  */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="w-72 h-44 bg-slate-200"></div>
                <div className="w-72 h-44 bg-slate-200"></div>
                <div className="w-72 h-44 bg-slate-200"></div>
                <div className="w-72 h-44 bg-slate-200"></div>
            </div>

            {/* Recent revenue and Latest Invoices */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Revenue />
                <div className=''>Latest Invoices</div>
            </div>
        </main>
    )
}
