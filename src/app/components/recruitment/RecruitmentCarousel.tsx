import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import S from "@/app/resources/strings/constantStrings";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";
import ColouredBox from "../common/ColouredBox";
import CustomButton from "../common/CustomButton";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { RecruitmentData } from "@/model/recruitment";

const RecruitmentCarouselCard: React.FC<{ title: string, content: string, data: RecruitmentData | undefined }> = ({ title, content, data }) => {
    const { primary_button_url, secondary_button_url } = data || {};

    const handleClick = (link: string | null | undefined) => {
        if (link) {
            window.open(link, "_blank")
        }
    }

    return (
        <CarouselItem>
            <ColouredContentBox title={title} className="text-center">
                <Text>{content}</Text>
                <div className="flex gap-5 w-full justify-center items-center mt-auto pt-5">
                    <CustomButton className="w-40 h-10 shadow-md font-bold" onClick={() => handleClick(primary_button_url)}>
                        Apply Now
                    </CustomButton>
                    <CustomButton className="w-40 h-10 shadow-md font-bold" onClick={() => handleClick(secondary_button_url)}>
                        View Roles
                    </CustomButton>
                </div>
            </ColouredContentBox>
        </CarouselItem>
    )
}

type RecruitmentTab = 'exco' | 'subcomm'

interface RecruitmentCarouselProps {
    onTabChange: (tabItem : RecruitmentTab) => void,
    data: RecruitmentData[] | null
}

const slideOrder: RecruitmentTab[] = ['exco', 'subcomm'];
  
const RecruitmentCarousel = ({ onTabChange, data } : RecruitmentCarouselProps) => {
    const buttonClassName = "relative top-auto translate-y-0";
    const [api, setApi] = useState<CarouselApi>()

    const onTabChangeRef = useRef(onTabChange)

    useEffect(() => {
        if (!api) return
        

        const handleSelect = () => {
            const index = api.selectedScrollSnap()
            onTabChangeRef.current(slideOrder[index])
        }

        handleSelect()
        api.on("select", handleSelect)

        return () => {
            api.off("select", handleSelect)
        }
    }, [api])

    const excoData = data?.find(item => item.page_name === 'exco');
    const subcommData = data?.find(item => item.page_name === 'subcomm');

    return (
        <ColouredBox className="w-full">
            <Carousel className="flex items-center" setApi={setApi}>
                <CarouselPrevious className={`left-auto ${buttonClassName}`}/>
                <CarouselContent>
                    <RecruitmentCarouselCard title={S.excoTitle} content={S.excoDescription} data={excoData}/>
                    <RecruitmentCarouselCard title={S.subcomTitle} content={S.subcomDescription} data={subcommData}/>
                </CarouselContent>
                <CarouselNext className={`right-auto ${buttonClassName}`}/>
            </Carousel>
        </ColouredBox>
    )
}

export default RecruitmentCarousel;