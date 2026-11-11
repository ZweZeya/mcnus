import { Text } from "../common/textComponents";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { ExcoMember } from "@/model/exco";
import CaptionBubble from "./CaptionBubble";
import type { BubbleState } from "@/utils/bubbleSides";


const ExcoMemberCard: React.FC<{member: ExcoMember, bubble?: BubbleState, preload?: boolean}> = ({member, bubble, preload}) => {
    const isCaptionVisible = bubble?.visible ?? false

    return (
        <div className={`relative flex flex-col items-center gap-2 ${isCaptionVisible ? "z-20" : ""}`}>
            <div className="overflow-hidden relative border border-transparent rounded-full w-36 h-36 shadow-md">
                <Image src={member.image} alt={member.name} fill className="object-cover" sizes="144px" preload={preload} />
            </div>
            <CaptionBubble caption={member.caption} isVisible={isCaptionVisible} side={bubble?.side ?? "right"} />
            <Text>{member.name}</Text>
            <Badge>{member.role}</Badge>
        </div>
    )
}

export default ExcoMemberCard;