"use client"

import ColouredContentBox from "../common/ColouredContentBox";
import S from "@/app/resources/strings/constantStrings";
import ExcoMemberCard from './ExcoMemberCard';
import { ExcoMember } from '@/model/exco';
import { useEffect, useState } from 'react';
import Loading from "../common/Loading";
import EntranceAnimation from "../common/EntranceAnimation";

const ExcoDetails = ()  => {
    const [members, setMembers] = useState<ExcoMember[]>([]);
    const [isFirstTimeLoading, setIsFirstTimeLoading] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/exco?captions=${!isFirstTimeLoading}`).then(res => res.json()).then(data => {
                setMembers(data)
                setIsFirstTimeLoading(false)
            })
        },  1500)

        return () => clearInterval(interval)
    }, [isFirstTimeLoading])

    return (
        <ColouredContentBox className="w-full text-center" title={S.executiveCommittee}>
            <div className="w-full h-full flex flex-wrap justify-center gap-10">
                { isFirstTimeLoading ? <Loading /> : members.map((e, i) => (
                    <EntranceAnimation key={i} delay={Math.min(i, 5) * 0.06}>
                        <ExcoMemberCard member={e} />
                    </EntranceAnimation>
                )) }
            </div>
        </ColouredContentBox>
    )
}

export default ExcoDetails;
