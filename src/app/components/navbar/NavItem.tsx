"use client";
import { useState } from "react"
import { navy, white } from "../../utils/colors"
import { useRouter } from "next/navigation";

const NavItem: React.FC<{name: string, to: string}> = ({name, to}) => {
    const [isHover, setHover] = useState<boolean>();
    const router = useRouter()

    const handleClick = () => {
        router.push(to)
    }

    return (
        <div 
            className="cursor-pointer"
            style={{color: isHover ? white : navy}} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
        >
            {name}
        </div>
    )
}

export default NavItem;