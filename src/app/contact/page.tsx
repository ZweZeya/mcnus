import ContentBox from "../components/common/ContentBox";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

const ContactPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.contactTitle} content={S.contactDescription} />
        </PageLayout>
    )
}

export default ContactPage;