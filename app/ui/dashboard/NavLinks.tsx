'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlinePeopleAlt } from "react-icons/md";

const links = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: <IoHomeOutline />
    },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: <LiaFileInvoiceSolid />
    },
    {
        name: 'Customers',
        href: '/dashboard/customers',
        icon: <MdOutlinePeopleAlt />
    },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {
                links.map(({ name, href, icon }) => {

                    return (<Link
                        href={href}
                        key={name}
                        className={`flex h-[48px] grow justify-center gap-2 rounded-md items-center bg-gray-50 p-3 text-sm font-medium hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:py-2 md:px-3 ${pathname === href ? "bg-sky-200 text-blue-600" : ''}`}
                    >
                        <span className="w-5">{icon}</span>
                        <p className="hidden md:block">{name}</p>
                    </Link>)
                })
            }
        </>
    )
}
