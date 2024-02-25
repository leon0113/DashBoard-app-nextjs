import { CiGlobe } from "react-icons/ci";

export default function Logo() {
    return (
        <div className="flex items-center justify-center leading-none text-white">
            <CiGlobe className="h-12 w-12 rotate-[15deg]" />
            <p className="text-[44px]">Acme</p>
        </div>
    )
}
