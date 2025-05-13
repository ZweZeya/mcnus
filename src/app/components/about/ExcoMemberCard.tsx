import { Text, TextSm } from "../common/textComponents";
import Image from "next/image";
import { darkerGrey } from "@/app/utils/colors";

export interface ExcoMember {
    name: string;
    role: string;
    image: string;
}

const ExcoMemberCard: React.FC<{member: ExcoMember}> = ({member}) => {
    return (
        <div className="relative flex flex-col items-center gap-2">
            <div className="overflow-hidden relative border border-transparent rounded-full w-36 h-36">
                <Image src={member.image} alt={member.name} fill objectFit="cover" />
            </div>
            <Text>{member.name}</Text>
            <TextSm style={{color: darkerGrey}}>{member.role}</TextSm>
        </div>
    )
}

export default ExcoMemberCard;