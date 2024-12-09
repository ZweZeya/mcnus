import { frangipani } from "@/app/utils/colors";
import NavItem from "./NavItem"
import Logo from "../Logo"

const Navbar = () => {
    return (
        <div className="flex items-center py-4 px-6" style={{backgroundColor: frangipani, height: "7vh"}}>
            <Logo size={40} />
            <div className="flex gap-x-5 ml-auto">
                <NavItem name="Who We Are" />
                <NavItem name="Events" />
                <NavItem name="Join Us" />
                <NavItem name="Contact Us" />
            </div>
        </div>
    )
}

export default Navbar;