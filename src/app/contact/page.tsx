import ContentBox from "../components/common/ContentBox";
import Faq from "../components/contact/Faq";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

  

const ContactPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.contactTitle} content={S.contactDescription} />
            <Faq />
        </PageLayout>
    )
}

export default ContactPage;