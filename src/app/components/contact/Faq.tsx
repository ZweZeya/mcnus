import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import S from "@/app/utils/constantString";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";

const Faq = () => {
    return (
        <div className="w-full">
            <ColouredContentBox title={S.faqs}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Text>{S.faqQuestion1}</Text>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Text>{S.faqAnswer1}</Text>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <Text>{S.faqQuestion2}</Text>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Text>{S.faqAnswer2}</Text>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            <Text>{S.faqQuestion3}</Text>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Text>{S.faqAnswer3}</Text>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ColouredContentBox>
        </div>
    )
}

export default Faq;