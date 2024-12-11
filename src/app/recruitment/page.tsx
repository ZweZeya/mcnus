import ContentBox from "../components/common/ContentBox";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

const RecruitmentPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.bePartOfMcnus} content={S.bePartOfMcnusDescription} />
        </PageLayout>
    )
}

export default RecruitmentPage;