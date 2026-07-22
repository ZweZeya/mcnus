'use client'

import { RecruitmentData } from "@/model/recruitment"
import RecruitmentCarousel from "./RecruitmentCarousel"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

type RecruitmentTab = 'exco' | 'subcomm'

interface RecruitmentSectionProps {
    subcommRoles: React.ReactNode,
    excoRoles: React.ReactNode,
    initialTab?: RecruitmentTab,
    data: RecruitmentData[] | null
}

const getTabFromSearchParams = (tabParam: string | null, initialTab: RecruitmentTab) : RecruitmentTab => {
    if (tabParam === 'exco' || tabParam === 'subcomm') {
        return tabParam;
    }
    return initialTab;
}

const RecruitmentSection = ({ subcommRoles, excoRoles, initialTab = 'exco', data } : RecruitmentSectionProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const activeTab = getTabFromSearchParams(searchParams.get("tab"), initialTab)

    const handleTabChange = (tabItem: RecruitmentTab) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set("tab", tabItem)
        router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-col items-center">
            <RecruitmentCarousel onTabChange={handleTabChange} data={data}/>
            { activeTab == 'exco' ? excoRoles : subcommRoles }
        </div>
    )
}

export default RecruitmentSection