import { Metadata } from "next";
import ContentBox from "../components/common/ContentBox";
import PageLayout from "../components/layout/PageLayout"
import S from "../resources/strings/constantStrings";
import FlappyBird from "../components/games/flappybird/FlappyBird";

export const metadata: Metadata = {
  title: 'Games - Myanmar Community @ NUS | Cultural Celebrations & Activities',
  description: 'Join our vibrant cultural events! From traditional Myanmar festivals to networking sessions, discover upcoming activities that celebrate our heritage and strengthen our NUS Myanmar community.',
  keywords: 'Myanmar events NUS, cultural celebrations, Thingyan festival, Myanmar new year, student activities Singapore, networking events, cultural exchange NUS',
  alternates: {
    canonical: 'https://myanmarcommunitynus.com/games',
  },
  openGraph: {
    title: 'Games - Myanmar Community @ NUS',
    description: 'Discover upcoming Myanmar cultural events, festivals, and community activities at NUS. Join us in celebrating our heritage and building connections.',
    url: 'https://myanmarcommunitynus.com/games',
  },
  
  twitter: {
    title: 'Games - Myanmar Community @ NUS',
    description: 'Join our cultural events and community activities celebrating Myanmar heritage at NUS.',
    // images: ['https://myanmarcommunitynus.com/images/events-og.jpg'],
  },
}

const GamesPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.games} content="" />
            <FlappyBird />
        </PageLayout>
    )
}

export default GamesPage;