import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import S from "@/app/resources/strings/constantStrings";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";
import { promises as fs } from 'fs';
import { Faq } from "@/model/faq";

const Faqs = async () => {
    const filePath = process.cwd() + '/src/data/faq.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data: Faq[] = JSON.parse(file);

    const faqElements = data.map(e => {
        return (
            <AccordionItem key={e.question} value={e.question}>
                <AccordionTrigger>
                    <Text>{e.question}</Text>
                </AccordionTrigger>
                <AccordionContent>
                    <Text>{e.answer}</Text>
                </AccordionContent>
            </AccordionItem>
        )
    })

    return (
        <ColouredContentBox className="w-full" title={S.faqs}>
            <Accordion type="single" collapsible>
                {faqElements}
            </Accordion>
        </ColouredContentBox>
    )
}

export default Faqs;