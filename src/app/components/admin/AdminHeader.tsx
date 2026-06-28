'use client'

import { frangipani } from "@/app/resources/colors"
import Logo from "../Logo"
import Link from "next/link"

const AdminHeader = () => {
    return (
        <div className="flex items-center px-6" style={{ backgroundColor: frangipani, height: "7vh" }}>
            <Link href="/admin">
                <Logo size={120} />
            </Link>
        </div>
    )
}

export default AdminHeader