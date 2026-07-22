import ResponsiveGrid from "../common/ResponsiveGrid"
import S from "@/app/resources/strings/constantStrings";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";

const ContactDetails = () => {
    return (
        <ResponsiveGrid>
            <ColouredContentBox className="h-full" title={S.unansweredQuestions}>
                <Text>
                    Email us at {" "} 
                    <a href={`mailto:${S.emailUs}`} className="text-blue-600 hover:text-blue-800">
                        {S.emailUs}
                    </a>
                    {" "}or slide into our dms.
                </Text>
            </ColouredContentBox>
            <ColouredContentBox className="h-full" title={S.admissioEnquiries}>
                <Text>
                    Refer to the {" "}
                    <a href={S.referToAskAdmissions} className="text-blue-600 hover:text-blue-800">
                        NUS admissions website
                    </a>
                    {" "} for more information
                </Text>
            </ColouredContentBox>
        </ResponsiveGrid>
    )
}

export default ContactDetails;