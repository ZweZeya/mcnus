'use client'

import { RecruitmentData } from "@/model/recruitment"
import RecruitmentCarousel from "./RecruitmentCarousel"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

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
    
    const tabFromUrl = getTabFromSearchParams(searchParams.get("tab"), initialTab);
    const activeTab = (tabFromUrl === 'exco' || tabFromUrl === 'subcomm') 
        ? tabFromUrl 
        : initialTab;

    const handleTabChange = (tabItem: RecruitmentTab) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set("tab", tabItem)
        router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-col items-center w-full">
            <RecruitmentCarousel onTabChange={handleTabChange} data={data} activeTab={activeTab}/>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                >
                    { activeTab === 'exco' ? excoRoles : subcommRoles }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default RecruitmentSection