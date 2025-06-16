"use client"

import { FaBars } from "react-icons/fa";
import SelectableIcon from "../common/SelectableIcon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"; 
import S from "@/app/resources/strings/constantStrings"; 

export interface MenuItem {
    name: string;
    to: string
}

const Menu: React.FC<{items: MenuItem[]}> = ({items}) => {
    const router = useRouter();

    const menuElements = items.map((e, i) => 
        <DropdownMenuItem onClick={() => router.push(e.to)} key={i}>{e.name}</DropdownMenuItem>
    );

    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <SelectableIcon>
                <FaBars size={30} />
            </SelectableIcon>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{S.menu}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            { menuElements }
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu;