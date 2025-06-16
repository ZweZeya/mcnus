import ResponsiveGrid from "../common/ResponsiveGrid"
import S from "@/app/resources/strings/constantStrings";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";

const ContactDetails = () => {
    return (
        <ResponsiveGrid>
            <ColouredContentBox className="h-full" title={S.unansweredQuestions}>
                <Text>{S.emailUs}</Text>
            </ColouredContentBox>
            <ColouredContentBox className="h-full" title={S.admissioEnquiries}>
                <Text>{S.referToAskAdmissions}</Text>
            </ColouredContentBox>
        </ResponsiveGrid>
    )
}

export default ContactDetails;