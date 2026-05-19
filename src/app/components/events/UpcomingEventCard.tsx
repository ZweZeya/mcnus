import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { darkerGrey, navy } from "@/app/resources/colors";
import { TextSm } from "../common/textComponents";
import { Button } from "@/components/ui/button";
import { BaseEvent } from "@/model/event";
import S from "@/app/resources/strings/constantStrings";
import { isNotEmptyString, isValidDate } from "@/utils/validators";

const UpcomingEventCard: React.FC<{ event: BaseEvent, onClick: (id : number) => void }> = ({ event, onClick }) => {
    const isEnabled = isNotEmptyString(event.registration_link)
    const isDateTbc = !isValidDate(event.event_time)
    const isImageAvailable = isNotEmptyString(event.image_url)

    const handleClick = (link: string) => {
        window.open(link, "_blank")
    }

    return (
        <div className="w-full rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col" onClick={() => onClick(event.id)} >
            {/* Image container with aspect ratio */}
            <div className="relative w-full pb-[100%]">
                {isImageAvailable ? 
                    <Image 
                        src={event.image_url} 
                        alt={event.name} 
                        fill 
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover" /> :
                    <ComingSoonImage />
                }
            </div>
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <h2 className="text-sm sm:text-base font-semibold line-clamp-2">{event.name}</h2>
                <TextSm style={{color: darkerGrey}} className="mt-1 mb-4">{isDateTbc ? S.dateToBeConfirmed : formatDate(event.event_time)}</TextSm>
                {/* <Button 
                    className="mt-auto w-full pt-2 text-white flex items-center justify-center gap-2" 
                    disabled={!isEnabled} 
                    onClick={() => handleClick(event.registration_link)} 
                    style={{backgroundColor: navy}}
                >
                    {isEnabled ? <>{S.join} <GoLinkExternal size={16} /></> : <>{S.comingSoon}</>}
                </Button> */}
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