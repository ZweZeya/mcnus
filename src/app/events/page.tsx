import ContentBox from "../components/common/ContentBox";
import Events from "../components/events/Events";
import PageLayout from "../components/layout/PageLayout"
import S from "../utils/constantString";

const EventsPage = () => {
    return (
        <PageLayout>
            <ContentBox title={S.events} content="" />
            <Events />
        </PageLayout>
    )
}

export default EventsPage;