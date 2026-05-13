"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { frangipani } from "@/app/resources/colors"

const AdminCard: React.FC<{ name: string, to: string }> = ({ name, to }) => {
    const [isHover, setHover] = useState<boolean>(false)
    
    const router = useRouter()
    const pathname = usePathname()

    const handleCLick = () => {
        if (to != pathname) {
            router.push(to)
        }
    }

    return (
        <div
        className="cursor-pointer w-[340px] h-40 px-4 py-3 rounded-xl shadow-md flex items-center gap-4 justify-center hover:shadow-lg hover:scale-105"
        style={{ backgroundColor: frangipani}}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleCLick}>
            {name}
        </div>
    )
}

export default AdminCard