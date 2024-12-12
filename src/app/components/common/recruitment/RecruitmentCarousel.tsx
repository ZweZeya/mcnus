import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import S from "@/app/utils/constantString";
import ColouredContentBox from "../ColouredContentBox";
import { Text } from "../textComponents";

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
    return (
        <div className="w-full">
            <Carousel>
                <CarouselContent>
                    <RecruitmentCarouselCard title={S.subcomTitle} content={S.subcomDescription} />
                    <RecruitmentCarouselCard title={S.excoTitle} content={S.excoDescription} />
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default RecruitmentCarousel;