import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import S from "@/app/utils/constantString";
import ColouredContentBox from "../common/ColouredContentBox";
import { Text } from "../common/textComponents";
import ColouredBox from "../common/ColouredBox";

const RecruitmentCarouselCard: React.FC<{title: string, content: string}> = ({title, content}) => {
    return (
        <CarouselItem>
            <ColouredContentBox title={title} className="text-center">
                <Text>{content}</Text>
            </ColouredContentBox>
        </CarouselItem>
    )
}
  
const RecruitmentCarousel = () => {
    const buttonClassName = "relative top-auto translate-y-0";

    return (
        <ColouredBox className="w-full">
            <Carousel className="flex items-center">
                <CarouselPrevious className={`left-auto ${buttonClassName}`} />
                <CarouselContent>
                    <RecruitmentCarouselCard title={S.subcomTitle} content={S.subcomDescription} />
                    <RecruitmentCarouselCard title={S.excoTitle} content={S.excoDescription} />
                </CarouselContent>
                <CarouselNext className={`right-auto ${buttonClassName}`} />
            </Carousel>
        </ColouredBox>
    )
}

export default RecruitmentCarousel;