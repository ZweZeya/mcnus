import ContentBox from "../components/common/ContentBox";
import ContactDetails from "../components/contact/ContactDetails";
import Faq from "../components/contact/Faq";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

  

const ContactPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.contactTitle} content={S.contactDescription} />
            <Faq />
            <ContactDetails />
        </PageLayout>
    )
}

export default ContactPage;