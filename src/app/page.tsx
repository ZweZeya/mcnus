import Image from "next/image";
import { frangipani, navy } from "@/app/utils/colors";
import { dynalight } from "./utils/font";
import PageLayout from "./components/layout/PageLayout";

export default function Home() {
    return (
        <PageLayout>
            <div className="relative w-full h-3/5 flex flex-col items-center ">
                <div className="overflow-hidden border border-transparent rounded-[85px] relative w-5/6 h-full">
                    <Image src="/hero.jpg" alt="hero" fill objectFit="cover" />
                </div>
                <div className="absolute top-1/2 w-5/6">
                    <p className={`${dynalight.className} text-center text-[76px]`} style={{color: frangipani, textShadow: `1px 1px 1px ${navy}`}}>
                        Connecting NUS through Myanmar Culture
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 mt-7 px-60">
                <p className="font-extrabold text-5xl">
                    Who We Are
                </p>
                <p className="text-lg text-center">
                    We are a community of current NUS Myanmar students and alumni that aim to provide NUS Myanmar students that organises events and celebrations that bring us closer to our roots. 
                </p>
            </div>
        </PageLayout>
    );
}
