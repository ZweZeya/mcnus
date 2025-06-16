import { Metadata } from "next";
import ContentBox from "../components/common/ContentBox";
import ContactDetails from "../components/contact/ContactDetails";
import Faqs from "../components/contact/Faqs";
import PageLayout from "../components/layout/PageLayout"
import S from "../resources/strings/constantStrings";

export const metadata: Metadata = {
  title: 'Contact Us - Myanmar Community @ NUS | Get In Touch',
  description: 'Get in touch with the Myanmar Community @ NUS executive committee. Contact us for inquiries, collaboration opportunities, or to learn more about joining our vibrant community.',
  keywords: 'contact Myanmar Community NUS, executive committee, student organization contact, Myanmar students Singapore contact, community inquiries NUS',
  alternates: {
    canonical: 'https://myanmarcommunitynus.com/contact',
  },
  openGraph: {
    title: 'Contact Us - Myanmar Community @ NUS',
    description: 'Reach out to our executive committee for inquiries, collaborations, or to learn more about joining our Myanmar community at NUS.',
    url: 'https://myanmarcommunitynus.com/contact',
    images: [
      {
        url: 'https://myanmarcommunitynus.com/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Myanmar Community @ NUS - Get In Touch',
      },
    ],
  },
  
  twitter: {
    title: 'Contact Us - Myanmar Community @ NUS',
    description: 'Get in touch with our executive committee for inquiries or to join our community.',
    images: ['https://myanmarcommunitynus.com/images/contact-og.jpg'],
  },
}

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