import Image from "next/image";
import { dynalight } from "@/app/utils/font";
import { frangipani } from "@/app/utils/colors";
import S from "@/app/utils/constantString";
import ContentBox from "../common/ContentBox";

const Hero = () => {
    return (
<div>
    <div className="relative w-full h-[60vh] flex flex-col items-center">
        <div className="overflow-hidden border border-transparent rounded-[85px] relative w-full h-full">
            <Image
                src="/hero.jpg"
                alt="hero"
                width={5000}
                height={550}
                className="object-cover w-full h-full"
            />
        </div>
        <div className="absolute top-1/3 lg:top-1/2 w-5/6">
            <p
                className={`${dynalight.className} text-center text-[32px] sm:text-[42px] md:text-[64px] lg:text-[80px] xl:text-[96px] leading-tight`}
                style={{ color: frangipani }}
            >
                {S.motto}
            </p>
        </div>
    </div>
    <div className="flex flex-col items-center gap-5 mt-7">
        <ContentBox title={S.whoWeAre} content={S.whoWeAreDescription} />
    </div>
</div>
    )
}

export default Hero;