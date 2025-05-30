import ContentBox from "../components/common/ContentBox";
import RecruitmentCarousel from "../components/recruitment/RecruitmentCarousel";
import PageLayout from "../components/layout/PageLayout";
import Roles from "../components/roles/Roles";
import S from "../utils/constantString";

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
