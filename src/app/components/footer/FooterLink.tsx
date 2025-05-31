"use client";

import { useState } from "react";
import { navy, white } from "@/app/utils/colors";

const FooterLink: React.FC<{ name: string; to: string }> = ({ name, to }) => {
    const [isHover, setHover] = useState(false);

    return (
        <a
            href={to}
            className="transition-colors duration-150"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ color: isHover ? white : navy }}
        >
            {name}
        </a>
    );
};

export default FooterLink;
