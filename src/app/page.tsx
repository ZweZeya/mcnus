import EntranceAnimation from "./components/common/EntranceAnimation";
import ImageCard from "./components/common/ImageCard";
import Hero from "./components/home/Hero";
import JoinUs from "./components/home/JoinUs";
import PageLayout from "./components/layout/PageLayout";
import S from "./resources/strings/constantStrings";
import { Separator } from "@/components/ui/separator"

export default function Home() {
    return (
        <PageLayout>
            <Hero />
            <Separator />
            <EntranceAnimation>
                <ImageCard image="/mission.png" title={S.missionTitle} content={S.mission} />
            </EntranceAnimation>
            <Separator />
            <EntranceAnimation>
                <ImageCard image="/vision.png" title={S.visionTitle} content={S.vision} isImageOnRight />
            </EntranceAnimation>
            <Separator />
            <EntranceAnimation>
                <JoinUs />
            </EntranceAnimation>
        </PageLayout>
    );
}
