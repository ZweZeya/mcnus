"use client"

import { useRouter, usePathname } from "next/navigation"
import { CalendarDays, ChevronRight, LucideIcon, UsersRound } from "lucide-react"
import { frangipani, navy } from "@/app/resources/colors"

type AdminCardIcon = "events" | "recruitment"

type AdminCardProps = {
    name: string
    to: string
    description: string
    icon: AdminCardIcon
}

const iconMap: Record<AdminCardIcon, LucideIcon> = {
    events: CalendarDays,
    recruitment: UsersRound,
}

const AdminCard: React.FC<AdminCardProps> = ({ name, to, description, icon }) => {
    const router = useRouter()
    const pathname = usePathname()
    const Icon = iconMap[icon]
    const isActive = pathname === to

    const handleClick = () => {
        if (!isActive) {
            router.push(to)
        }
    }

    return (
        <button
            type="button"
            className="group flex min-h-44 w-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
            onClick={handleClick}
            aria-current={isActive ? "page" : undefined}
        >
            <div className="flex items-start justify-between gap-4">
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-md"
                    style={{ backgroundColor: `${frangipani}55`, color: navy }}
                >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                        isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                    }`}
                >
                    {isActive ? "Current" : "Open"}
                </span>
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-950">{name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold" style={{ color: navy }}>
                <span>Manage {name.toLowerCase()}</span>
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </div>
        </button>
    )
}

export default AdminCard
