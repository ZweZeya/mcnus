import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import S from "@/app/resources/strings/constantStrings";
import ColouredContentBox from "../common/ColouredContentBox";
import { darkerGrey, frangipani, navy } from "@/app/resources/colors";
import { promises as fs } from 'fs';
import { Faq } from "@/model/faq";

const Faqs = async () => {
    const filePath = process.cwd() + '/src/data/faq.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data: Faq[] = JSON.parse(file);

    const faqElements = data.map(e => {
        return (
            <AccordionItem key={e.question} value={e.question}>
                <AccordionTrigger
                    className="group gap-4 py-5 text-base font-semibold hover:no-underline md:text-lg xl:text-xl [&>svg]:size-5 [&>svg]:text-[#093653]"
                    style={{ color: navy }}
                >
                    <span className="transition-colors group-hover:text-[#1D5A7D]">{e.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                    <p
                        className="border-l-4 pl-4 text-sm font-normal leading-relaxed md:text-base xl:text-lg"
                        style={{ borderColor: frangipani, color: darkerGrey }}
                    >
                        {e.answer}
                    </p>
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