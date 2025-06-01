import type { Metadata } from "next";
import ExcoDetails from "../components/about/ExcoDetails";
import ContentBox from "../components/common/ContentBox";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";
import { darkerGrey } from "../utils/colors";

export const metadata: Metadata = {
  title: 'About Us - Myanmar Community @ NUS | Our Mission & Vision',
  description: 'Learn about the Myanmar Community at NUS - our mission to foster cultural exchange, our vision for unity, and the passionate students building bridges between Myanmar heritage and NUS life.',
  keywords: 'Myanmar Community NUS, about us, mission vision, Myanmar students Singapore, Burmese community history, student organization NUS',
  
  openGraph: {
    title: 'About Us - Myanmar Community @ NUS',
    description: 'Discover our mission to foster cultural exchange and build a vibrant Myanmar student community at NUS through shared experiences and lasting bonds.',
    url: 'https://myanmarcommunitynus.com/about',
    images: [
      {
        url: 'https://myanmarcommunitynus.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Myanmar Community @ NUS - About Our Mission and Vision',
      },
    ],
  },
  
  twitter: {
    title: 'About Us - Myanmar Community @ NUS',
    description: 'Learn about our mission to foster cultural exchange and build unity among Myanmar students at NUS.',
    images: ['https://myanmarcommunitynus.com/images/about-og.jpg'],
  },
}

const AboutPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.exco} content={S.excoTermTime} contentStyle={{color: darkerGrey}} />
            <ExcoDetails />
        </PageLayout>
    )
}

export default AboutPage;