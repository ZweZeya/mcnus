import { Text } from "../common/textComponents";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { ExcoMember } from "@/model/exco";
import CaptionBubble from "./CaptionBubble";
import { isNotEmptyString } from "@/app/utils/validators";


const ExcoMemberCard: React.FC<{member: ExcoMember}> = ({member}) => {
    const isCaptionVisible = isNotEmptyString(member.caption)

    return (
        <div className="relative flex flex-col items-center gap-2">
            <div className="overflow-hidden relative border border-transparent rounded-full w-36 h-36">
                <Image src={member.image} alt={member.name} fill objectFit="cover" />
            </div>
            <CaptionBubble caption={member.caption} isVisible={isCaptionVisible} />
            <Text>{member.name}</Text>
            <Badge>{member.role}</Badge>
        </div>
    )
}

export default ExcoMemberCard;