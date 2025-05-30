import ContentBox from "../components/common/ContentBox";
import ContactDetails from "../components/contact/ContactDetails";
import Faqs from "../components/contact/Faqs";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

  

const ContactPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.contactTitle} content={S.contactDescription} />
            <Faqs />
            <ContactDetails />
        </PageLayout>
    )
}

export default ContactPage;