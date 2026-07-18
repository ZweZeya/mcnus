import { Metadata } from "next";
import ContentBox from "../../components/common/ContentBox";
import PageLayout from "../../components/layout/PageLayout";
import S from "../../resources/strings/constantStrings";
import RecruitmentSection from "@/app/components/recruitment/RecruitmentSection";
import Roles from "@/app/components/roles/Roles";
import ExcoRoles from "@/app/components/roles/ExcoRoles";
import recruitmentClientService from "@/services/recruitment.client.service";
import { RecruitmentData } from "@/model/recruitment";
import EntranceAnimation from "../../components/common/EntranceAnimation";

export const metadata: Metadata = {
  title: 'Join Our Team - Myanmar Community @ NUS | Executive Committee Recruitment',
  description: 'Join the Myanmar Community @ NUS executive committee! Discover leadership opportunities, make a difference in our community, and help organize cultural events and student support programs.',
  keywords: 'Myanmar Community NUS recruitment, executive committee positions, student leadership NUS, Myanmar student organization jobs, community volunteer opportunities Singapore',
  alternates: {
    canonical: 'https://myanmarcommunitynus.com/recruitment',
  },
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

type RecruitmentPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
  }>;
};

const RecruitmentPage = async ({ searchParams }: RecruitmentPageProps) => {
  const { tab } = await searchParams
  const tabParam = Array.isArray(tab) ? tab[0] : tab;
  const initialTab: 'exco' | 'subcomm' = tabParam === 'subcomm' ? 'subcomm' : 'exco';

  let dbData : RecruitmentData[] | null = [];
  try {
    dbData = await recruitmentClientService.getRecruitmentData();
  } catch (error) {
    console.error("Failed to load recruitment live links:", error);
  }
  
  return (
    <PageLayout>
      <EntranceAnimation>
        <ContentBox title={S.bePartOfMcnus} content={S.bePartOfMcnusDescription} />
      </EntranceAnimation>
      
      <EntranceAnimation>
        <RecruitmentSection data={dbData} subcommRoles={<Roles />} excoRoles={<ExcoRoles />} initialTab={initialTab} />
      </EntranceAnimation>
    </PageLayout>
  );
};

export default RecruitmentPage;
