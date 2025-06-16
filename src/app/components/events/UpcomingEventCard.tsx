import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { darkerGrey, navy } from "@/app/resources/colors";
import { TextSm } from "../common/textComponents";
import { Button } from "@/components/ui/button";
import { BaseEvent } from "@/model/event";
import S from "@/app/resources/strings/constantStrings";
import { isNotEmptyString, isValidDate } from "@/utils/validators";

const UpcomingEventCard: React.FC<{ event: BaseEvent }> = ({ event }) => {
    const isEnabled = isNotEmptyString(event.link)
    const isDateTbc = !isValidDate(event.date)
    const isImageAvailable = isNotEmptyString(event.image)

    const handleClick = (link: string) => {
        window.open(link, "_blank")
    }

    return (
        <div className="w-full rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col">
            {/* Image container with aspect ratio */}
            <div className="relative w-full pb-[100%]">
                {isImageAvailable ? 
                    <Image 
                        src={event.image} 
                        alt={event.name} 
                        fill 
                        className="object-cover" /> :
                    <ComingSoonImage />
                }
            </div>
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <h2 className="text-sm sm:text-base font-semibold line-clamp-2">{event.name}</h2>
                <TextSm style={{color: darkerGrey}} className="mt-1 mb-4">{isDateTbc ? S.dateToBeConfirmed : formatDate(event.date)}</TextSm>
                <Button 
                    className="mt-auto w-full pt-2 text-white flex items-center justify-center gap-2" 
                    disabled={!isEnabled} 
                    onClick={() => handleClick(event.link)} 
                    style={{backgroundColor: navy}}
                >
                    {S.join} <GoLinkExternal size={16} />
                </Button>
            </div>
        </div>
    );
};

const ComingSoonImage = () => {
    return (
       <Image 
        src="/coming-soon.png" 
        alt="coming-soon" 
        fill 
        className="object-cover" />
    )
}

export default UpcomingEventCard;