import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Header from "../common/Header";
import S from "@/app/utils/constantString";

const Faq = () => {
    return (
        <div className="w-full">
            <Header>{S.faqs}</Header>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>{S.faqQuestion1}</AccordionTrigger>
                    <AccordionContent>{S.faqAnswer1}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>{S.faqQuestion2}</AccordionTrigger>
                    <AccordionContent>{S.faqAnswer2}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>{S.faqQuestion3}</AccordionTrigger>
                    <AccordionContent>{S.faqAnswer3}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Faq;