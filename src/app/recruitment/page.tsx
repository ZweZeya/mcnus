import { Metadata } from "next";
import ContentBox from "../components/common/ContentBox";
import RecruitmentCarousel from "../components/recruitment/RecruitmentCarousel";
import PageLayout from "../components/layout/PageLayout";
import Roles from "../components/roles/Roles";
import S from "../utils/constantString";

export const metadata: Metadata = {
  title: 'Join Our Team - Myanmar Community @ NUS | Executive Committee Recruitment',
  description: 'Join the Myanmar Community @ NUS executive committee! Discover leadership opportunities, make a difference in our community, and help organize cultural events and student support programs.',
  keywords: 'Myanmar Community NUS recruitment, executive committee positions, student leadership NUS, Myanmar student organization jobs, community volunteer opportunities Singapore',
  
  openGraph: {
    title: 'Join Our Team - Myanmar Community @ NUS',
    description: 'Exciting leadership opportunities await! Join our executive committee and help shape the future of Myanmar community at NUS.',
    url: 'https://myanmarcommunitynus.com/recruitment',
    images: [
      {
        url: 'https://myanmarcommunitynus.com/images/recruitment-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Join Myanmar Community @ NUS Executive Committee - Leadership Opportunities',
      },
    ],
  },
  
  twitter: {
    title: 'Join Our Team - Myanmar Community @ NUS',
    description: 'Leadership opportunities available! Join our executive committee and make a difference in our community.',
    images: ['https://myanmarcommunitynus.com/images/recruitment-og.jpg'],
  },
}

const RecruitmentPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.bePartOfMcnus} content={S.bePartOfMcnusDescription} />
            <RecruitmentCarousel />
            <Roles />
        </PageLayout>
    );
};

export default RecruitmentPage;
