import Link from "next/link";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import { FaPowerOff } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            {/* logo section  */}
            <Link href={'/'} className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40 bg-blue-600">
                <div className="w-32 md:w-40">
                    <Logo />
                </div>
            </Link>

            {/* nav items  */}
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                {/* navlink component  */}
                <NavLinks />

                {/* free space  */}
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

                {/* sign out btn  */}
                <form action="">
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:py-2 md:px-3">
                        <FaPowerOff className="w-6" />
                        <p className="hidden md:block">Sign Out</p>
                    </button>
                </form>

            </div>

        </div>
    )
}
