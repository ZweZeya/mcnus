import ImageCard from "./components/common/ImageCard";
import Hero from "./components/home/Hero";
import JoinUs from "./components/home/JoinUs";
import PageLayout from "./components/layout/PageLayout";
import S from "./utils/constantString";
import { Separator } from "@/components/ui/separator"

export default function Home() {
    return (
        <PageLayout>
            <Hero />
            <Separator />
            <ImageCard image="/mission.png" title={S.missionTitle} content={S.mission} />
            <Separator />
            <ImageCard image="/vision.png" title={S.visionTitle} content={S.vision} isImageOnRight />
            <Separator />
            <JoinUs />
        </PageLayout>
    );
}
