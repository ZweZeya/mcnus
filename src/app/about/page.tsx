import ExcoDetails from "../components/about/ExcoDetails";
import ContentBox from "../components/common/ContentBox";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

const AboutPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.exco} content={S.excoTermTime} />
            <ExcoDetails />
        </PageLayout>
    )
}

export default AboutPage;