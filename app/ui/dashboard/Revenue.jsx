import { fetchRevenue } from "@/app/lib/data"
import { abel } from "../fonts";
import { generateYAxis } from "@/app/lib/utils";

export default async function Revenue() {
    const revenues = await fetchRevenue();
    const charHeight = 350;
    const { yAxisLabel, topLebel } = generateYAxis(revenues)
    return (
        <div className='w-full md:col-span-4'>
            <h2 className={`${abel.className} mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>
            {/* chart  */}
            <div className="rounded-xl bg-gray-100 p-4">
                <div className="custom-grid-column mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                    {/* months  */}
                    <div className=" mb-6 hidden sm:flex sm:flex-col  justify-between text-sm text-gray-400"
                        style={{ height: `${charHeight}px` }}
                    >
                        {
                            yAxisLabel.map((label) => (
                                <p key={label}>{label}</p>
                            ))
                        }
                    </div>

                    {/* chart bar  */}
                    {
                        revenues.map((revenue) => (
                            <div key={revenue.month} className="flex flex-col items-center gap-1.5">
                                <div className="w-full rounded-md bg-blue-300 text-center text-gray-300 text-sm"
                                    style={{ height: `${(charHeight / topLebel) * revenue.revenue}px` }}
                                >
                                    <p className="">{(revenue.revenue / 1000)}</p>
                                </div>
                                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">{revenue.month}</p>
                            </div>
                        ))
                    }

                </div>
                <div className="pb-2 pt-6">
                    <p className="ml-2 text-sm text-gray-500">Last 12 months</p>
                </div>
            </div>
        </div>
    )
}
