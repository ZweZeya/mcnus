import Image from "next/image";
import Title from "../common/Title";
import S from "@/app/utils/constantString";

const Mission = () => {
    return (
        <div className="flex items-center gap-24 w-full">
            <div>
                <Image src="/mission.png" alt="hero" width={500} height={500} objectFit="cover" />
            </div>
            <div className="ml-auto text-center">
                <Title>{S.missionTitle}</Title>
                <p className="text-lg">{S.mission}</p>
            </div>
        </div>
    )
}

export default Mission;