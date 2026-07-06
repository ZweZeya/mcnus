'use client'

import { useState } from "react"
import RecruitmentCarousel from "./RecruitmentCarousel"

type RecruitmentTab = 'exco' | 'subcomm'

interface RecruitmentSectionProps {
    subcommRoles: React.ReactNode,
    excoRoles: React.ReactNode
}

const RecruitmentSection = ({ subcommRoles, excoRoles } : RecruitmentSectionProps) => {
    const [activeTab, setActiveTab] = useState<RecruitmentTab>('exco')

    return (
        <>
            <RecruitmentCarousel onTabChange={setActiveTab}/>
            { activeTab == 'exco' ? excoRoles : subcommRoles }
        </>
    )
}

export default RecruitmentSection