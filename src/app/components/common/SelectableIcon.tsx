"use client"

import { useState } from "react";
import { navy, white } from "@/app/utils/colors";

const SelectableIcon = (props: React.PropsWithChildren) => {
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <div 
            className="cursor-pointer" 
            style={{color: isHover ? white : navy}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {props.children}
        </div>
    )
}

export default SelectableIcon;