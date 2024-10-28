"use client";
import { useState } from "react"
import { navy, white } from "../../utils/colors"

const NavItem: React.FC<{name: string}> = ({name}) => {
    const [isHover, setHover] = useState<boolean>();

    return (
        <div 
            className="cursor-pointer"
            style={{color: isHover ? white : navy}} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
        >
            {name}
        </div>
    )
}

export default NavItem;