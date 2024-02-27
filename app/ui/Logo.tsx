import { CiGlobe } from "react-icons/ci";
import { abel } from "./fonts";

export default function Logo() {
    return (
        <div className="flex items-center justify-center leading-none text-white">
            <CiGlobe className="h-12 w-12 rotate-[35deg]" />
            <p className={`${abel.className} text-[44px]`}>Acme</p>
        </div>
    )
}
