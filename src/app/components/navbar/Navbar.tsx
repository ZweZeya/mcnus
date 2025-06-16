import { frangipani } from "@/app/resources/colors";
import NavItem from "./NavItem";
import Logo from "../Logo";
import S from "@/app/resources/strings/constantStrings";
import Link from "next/link";
import Menu, { MenuItem } from "./Menu";

const Navbar = () => {
    const menuItems: MenuItem[] = [
        { name: S.whoWeAre, to: "/about" },
        { name: S.events, to: "/events" },
        { name: S.joinUs, to: "/recruitment" },
        { name: S.contactUs, to: "/contact" }
    ];

    const miniNavMenuItems = [{ name: S.home, to: "/" } as MenuItem].concat(menuItems)

    return (
        <div className="flex items-center px-6" style={{ backgroundColor: frangipani, height: "7vh" }}>
            <Link href="/">
                <Logo size={120} />
            </Link>
            <div className="ml-auto h-full flex items-center">
                <div className="gap-5 items-center h-full hidden md:flex">
                    {menuItems.map((e, i) => <NavItem key={i} name={e.name} to={e.to} />)}
                </div>
                <div className="md:hidden">
                    <Menu items={miniNavMenuItems} />
                </div>
            </div>
        </div>
    )
}

export default Navbar;