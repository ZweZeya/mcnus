import { frangipani } from "../utils/colors"

export default function Navbar() {
    return (
        <div className="flex items-center p-4" style={{backgroundColor: frangipani}}>
            <div>Logo</div>
            <div className="flex gap-x-4 ml-auto">
                <NavItem name="Who We Are" />
                <NavItem name="Events" />
                <NavItem name="Join Us" />
                <NavItem name="Contact Us" />
            </div>
        </div>
    )
}

const NavItem: React.FC<{name: string}> = ({name}) => {
    return (
        <div>{name}</div>
    )
}