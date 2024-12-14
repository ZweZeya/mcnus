import { frangipani } from "@/app/utils/colors";
import NavItem from "./NavItem"
import Logo from "../Logo"
import S from "@/app/utils/constantString";
import Link from "next/link";
import Menu from "./Menu";

const Navbar = () => {
    return (
        <div className="flex items-center px-6" style={{backgroundColor: frangipani, height: "7vh"}}>
            <Link href="/">
                <Logo size={40} />
            </Link>
            <div className="ml-auto h-full flex items-center">
                <div className="gap-5 items-center h-full hidden md:flex">
                    <NavItem name={S.whoWeAre} to="/about" />
                    <NavItem name={S.events} to="/events"/>
                    <NavItem name={S.joinUs} to="/recruitment"/>
                    <NavItem name={S.contactUs}to="/contact" />
                </div>
                <div className="md:hidden">
                    <Menu />
                </div>
            </div>
        </div>
    )
}

export default Navbar;