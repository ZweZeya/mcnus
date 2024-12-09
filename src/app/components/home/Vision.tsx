import Image from "next/image";
import Title from "../common/Title";
import S from "@/app/utils/constantString";

const Vision = () => {
    return (
        <div className="flex items-center gap-24 w-full">
        <div className="text-center">
            <Title>{S.visionTitle}</Title>
            <p className="text-lg">{S.vision}</p>
        </div>
        <div className="ml-auto">
            <Image src="/vision.png" alt="hero" width={500} height={500} objectFit="cover" />
        </div>
    </div>
    )
}

export default Vision;