"use client";
import { useState, useEffect } from "react"
import { frangipani, navy, white } from "../../utils/colors"
import { useRouter, usePathname } from "next/navigation";

const NavItem: React.FC<{name: string, to: string}> = ({name, to}) => {
    const [isHover, setHover] = useState<boolean>();
    const [isSelected, setSelected] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setSelected(pathname == to);
    }, [pathname, to])

    const handleClick = () => {
        if (to != pathname) {
            router.push(to);
        }
    }

    return (
        <div 
            className="cursor-pointer h-full flex flex-col justify-center px-3"
            style={{color: !isSelected && isHover ? white : navy, backgroundColor: isSelected ? white : frangipani}} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
        >
            {name}
        </div>
    )
}

export default NavItem;