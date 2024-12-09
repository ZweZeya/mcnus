import { frangipani } from "@/app/utils/colors";
import NavItem from "./NavItem"
import Logo from "../Logo"
import S from "@/app/utils/constantString";

const Navbar = () => {
    return (
        <div className="flex items-center py-4 px-6" style={{backgroundColor: frangipani, height: "7vh"}}>
            <Logo size={40} />
            <div className="flex gap-x-5 ml-auto">
                <NavItem name={S.whoWeAre} />
                <NavItem name={S.events} />
                <NavItem name={S.joinUs} />
                <NavItem name={S.contactUs} />
            </div>
        </div>
    )
}

export default Navbar;