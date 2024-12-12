import ContentBox from "../components/common/ContentBox";
import RecruitmentCarousel from "../components/common/recruitment/RecruitmentCarousel";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

const RecruitmentPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.bePartOfMcnus} content={S.bePartOfMcnusDescription} />
            <RecruitmentCarousel />
        </PageLayout>
    )
}

export default RecruitmentPage;