'use client'

import { frangipani } from "@/app/resources/colors"
import Logo from "../Logo"
import Link from "next/link"
import CustomButton from "../common/CustomButton"

const AdminHeader = () => {
    return (
        <div className="flex items-center px-6" style={{ backgroundColor: frangipani, height: "7vh" }}>
            <Link href="/admin">
                <Logo size={120} />
            </Link>
            <div className="ml-auto h-full flex items-center">
                <CustomButton 
                    onClick={() => { }} 
                    className="flex items-center justify-center px-4 py-2 border-1 border-black font-semibold text-nowrap">
                    Sign out
                </CustomButton>
            </div>
        </div>
    )
}

export default AdminHeader