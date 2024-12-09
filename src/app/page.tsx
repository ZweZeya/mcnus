import Hero from "./components/home/Hero";
import JoinUs from "./components/home/JoinUs";
import Mission from "./components/home/Mission";
import Vision from "./components/home/Vision";
import PageLayout from "./components/layout/PageLayout";

export default function Home() {
    return (
        <PageLayout>
            <Hero />
            <Mission />
            <Vision />
            <JoinUs />
        </PageLayout>
    );
}
