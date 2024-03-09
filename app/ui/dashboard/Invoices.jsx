import { fetchInvoices } from "@/app/lib/data"
import { abel } from "../fonts";
import Image from "next/image";

export default async function Invoices() {
    const latestInvoices = await fetchInvoices();
    // console.log(latestInvoices);
    return (
        <div className="w-full flex flex-col md:col-span-4">
            <h2 className={`${abel.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
            <div className="border flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
                <div className="bg-white px-4">
                    {
                        latestInvoices.map((latestInvoice, i) => {
                            return (
                                <div key={latestInvoice.id} className='flex flex-row items-center justify-between py-4 border-b'>
                                    <div className="flex items-center">
                                        <Image src={latestInvoice.image_url} alt="image" width={32} height={32}
                                            className="mr-4 rounded-full"
                                        />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm md:text-base font-semibold">{latestInvoice.name}</p>
                                            <p className="hidden sm:block text-sm text-gray-500">{latestInvoice.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>${latestInvoice.amount}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pb-2 pt-6">
                    <p className="ml-2 text-sm text-gray-500">Updated just now</p>
                </div>
            </div>
        </div>
    )
}
