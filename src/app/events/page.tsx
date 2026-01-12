import { Metadata } from "next";
import { Suspense } from "react";
import ContentBox from "../components/common/ContentBox";
import Events from "../components/events/Events";
import PageLayout from "../components/layout/PageLayout"
import S from "../resources/strings/constantStrings";

export const metadata: Metadata = {
  title: 'Events - Myanmar Community @ NUS | Cultural Celebrations & Activities',
  description: 'Join our vibrant cultural events! From traditional Myanmar festivals to networking sessions, discover upcoming activities that celebrate our heritage and strengthen our NUS Myanmar community.',
  keywords: 'Myanmar events NUS, cultural celebrations, Thingyan festival, Myanmar new year, student activities Singapore, networking events, cultural exchange NUS',
  alternates: {
    canonical: 'https://myanmarcommunitynus.com/events',
  },
  openGraph: {
    title: 'Events - Myanmar Community @ NUS',
    description: 'Discover upcoming Myanmar cultural events, festivals, and community activities at NUS. Join us in celebrating our heritage and building connections.',
    url: 'https://myanmarcommunitynus.com/events',
    images: [
      {
        url: 'https://myanmarcommunitynus.com/images/events-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Myanmar Community @ NUS Events - Cultural Celebrations and Activities',
      },
    ],
  },
  
  twitter: {
    title: 'Events - Myanmar Community @ NUS',
    description: 'Join our cultural events and community activities celebrating Myanmar heritage at NUS.',
    images: ['https://myanmarcommunitynus.com/images/events-og.jpg'],
  },
}

const EventsPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.events} content="" />
            <Suspense>
              <Events />
            </Suspense>
        </PageLayout>
    )
}

export default EventsPage;