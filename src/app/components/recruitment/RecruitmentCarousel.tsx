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

const RecruitmentCarouselCard: React.FC<{title: string, content: string}> = ({title, content}) => {
    return (
        <CarouselItem>
            <ColouredContentBox title={title} className="text-center">
                <Text>{content}</Text>
                <div className="flex gap-5 w-full justify-center items-center mt-auto pt-5">
                    <CustomButton className="w-40 h-10 shadow-md font-bold">Apply Now</CustomButton>
                    <CustomButton className="w-40 h-10 shadow-md font-bold">View Roles</CustomButton>
                </div>
            </ColouredContentBox>
        </CarouselItem>
    )
}

type RecruitmentTab = 'exco' | 'subcomm'

interface RecruitmentCarouselProps {
    onTabChange: (tabItem : RecruitmentTab) => void,
}

const slideOrder: RecruitmentTab[] = ['exco', 'subcomm'];
  
const RecruitmentCarousel = ({ onTabChange } : RecruitmentCarouselProps) => {
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

    return (
        <ColouredBox className="w-full">
            <Carousel className="flex items-center" setApi={setApi}>
                <CarouselPrevious className={`left-auto ${buttonClassName}`}/>
                <CarouselContent>
                    <RecruitmentCarouselCard title={S.excoTitle} content={S.excoDescription}/>
                    <RecruitmentCarouselCard title={S.subcomTitle} content={S.subcomDescription}/>
                </CarouselContent>
                <CarouselNext className={`right-auto ${buttonClassName}`}/>
            </Carousel>
        </ColouredBox>
    )
}

export default RecruitmentCarousel;