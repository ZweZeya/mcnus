'use client'

import RecruitmentCarousel from "./RecruitmentCarousel"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

type RecruitmentTab = 'exco' | 'subcomm'

interface RecruitmentSectionProps {
    subcommRoles: React.ReactNode,
    excoRoles: React.ReactNode,
    initialTab?: RecruitmentTab
}

const getTabFromSearchParams = (tabParam: string | null, initialTab: RecruitmentTab) : RecruitmentTab => {
    if (tabParam === 'exco' || tabParam === 'subcomm') {
        return tabParam;
    }
    return initialTab;
}

const RecruitmentSection = ({ subcommRoles, excoRoles, initialTab = 'exco' } : RecruitmentSectionProps) => {
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
        <>
            <RecruitmentCarousel onTabChange={handleTabChange}/>
            { activeTab == 'exco' ? excoRoles : subcommRoles }
        </>
    )
}

export default RecruitmentSection