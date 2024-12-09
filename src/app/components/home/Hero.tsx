import Image from "next/image";
import { dynalight } from "@/app/utils/font";
import { frangipani } from "@/app/utils/colors";
import Title from "../common/Title";
import S from "@/app/utils/constantString";

const Hero = () => {
    return (
        <div style={{height: "86vh"}}>
            <div className="relative w-full h-3/5 flex flex-col items-center ">
                <div className="overflow-hidden border border-transparent rounded-[85px] relative w-full h-full">
                    <Image src="/hero.jpg" alt="hero" fill objectFit="cover" />
                </div>
                <div className="absolute top-1/2 w-5/6">
                    <p className={`${dynalight.className} text-center text-[76px]`} style={{color: frangipani}}>
                        {S.motto}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 mt-7 px-60">
                <Title>{S.whoWeAre}</Title>
                <p className="text-lg text-center">
                    {S.whoWeAreDescription}
                </p>
            </div>
        </div>
    )
}

export default Hero;