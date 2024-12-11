import { frangipani } from "@/app/utils/colors";
import NavItem from "./NavItem"
import Logo from "../Logo"
import S from "@/app/utils/constantString";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex items-center py-4 px-6" style={{backgroundColor: frangipani, height: "7vh"}}>
            <Link href="/">
                <Logo size={40} />
            </Link>
            <div className="flex gap-x-5 ml-auto">
                <NavItem name={S.whoWeAre} to="/about" />
                <NavItem name={S.events} to="/"/>
                <NavItem name={S.joinUs} to="/recruitment"/>
                <NavItem name={S.contactUs}to="/contact" />
            </div>
        </div>
    )
}

export default Navbar;