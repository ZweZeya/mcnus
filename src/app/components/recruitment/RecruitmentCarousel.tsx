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
    const { is_open, primary_button_url, secondary_button_url } = data || {};

    const handleClick = (link: string | null | undefined) => {
        if (link) {
            window.open(link, "_blank")
        }
    }

    return (
        <CarouselItem>
            <ColouredContentBox title={title} className="text-center shadow-none">
                <Text>{content}</Text>
                {is_open && (
                    <div className="flex gap-3 md:gap-5 justify-center items-center mt-auto pt-5">
                        <CustomButton className="w-30 h-10 shadow-md font-bold" onClick={() => handleClick(primary_button_url)}>
                            Apply Now
                        </CustomButton>
                        <CustomButton className="w-30 h-10 shadow-md font-bold" onClick={() => handleClick(secondary_button_url)}>
                            View Roles
                        </CustomButton>
                    </div>
                )}
            </ColouredContentBox>
        </CarouselItem>
    )
}

type RecruitmentTab = 'exco' | 'subcomm'

interface RecruitmentCarouselProps {
    onTabChange: (tabItem : RecruitmentTab) => void,
    data: RecruitmentData[] | null,
    activeTab: RecruitmentTab
}

const slideOrder: RecruitmentTab[] = ['exco', 'subcomm'];

const getRecruitmentDescription = (
    data: RecruitmentData | undefined,
    openDescription: string,
    closedDescription: string
) => {
    return data?.is_open ? openDescription : closedDescription;
}
  
const RecruitmentCarousel = ({ onTabChange, data, activeTab } : RecruitmentCarouselProps) => {
    const buttonClassName = "relative top-auto translate-y-0";
    const [api, setApi] = useState<CarouselApi>()

    const onTabChangeRef = useRef(onTabChange)

    useEffect(() => {
        if (!api) return

        const targetIndex = slideOrder.indexOf(activeTab)
        if (targetIndex !== -1 && api.selectedScrollSnap() !== targetIndex) {
            api.scrollTo(targetIndex, true) 
        }
    }, [api, activeTab])

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
        <ColouredBox className="w-sm sm:w-full shadow-md">
            <Carousel className="flex items-center" setApi={setApi}>
                <CarouselPrevious className={`left-auto ${buttonClassName}`}/>
                <CarouselContent>
                    <RecruitmentCarouselCard
                        title={S.excoTitle}
                        content={getRecruitmentDescription(excoData, S.excoOpenDescription, S.excoClosedDescription)}
                        data={excoData}
                    />
                    <RecruitmentCarouselCard
                        title={S.subcomTitle}
                        content={getRecruitmentDescription(subcommData, S.subcomOpenDescription, S.subcomClosedDescription)}
                        data={subcommData}
                    />
                </CarouselContent>
                <CarouselNext className={`right-auto ${buttonClassName}`}/>
            </Carousel>
        </ColouredBox>
    )
}

export default RecruitmentCarousel;
