import ResponsiveGrid from "../common/ResponsiveGrid"
import S from "@/app/utils/constantString";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";

const ContactDetails = () => {
    return (
        <ResponsiveGrid>
            <ColouredContentBox title={S.unansweredQuestions}>
                <Text>{S.emailUs}</Text>
            </ColouredContentBox>
            <ColouredContentBox title={S.admissioEnquiries}>
                <Text>{S.referToAskAdmissions}</Text>
            </ColouredContentBox>
        </ResponsiveGrid>
    )
}

export default ContactDetails;