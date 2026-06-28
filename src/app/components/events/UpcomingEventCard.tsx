import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";
import { darkerGrey } from "@/app/resources/colors";
import { TextSm } from "../common/textComponents";
import { BaseEvent } from "@/model/event";
import S from "@/app/resources/strings/constantStrings";
import { isValidDate } from "@/utils/validators";

const UpcomingEventCard: React.FC<{ event: BaseEvent, onClick: (id : number) => void }> = ({ event, onClick }) => {
    const isDateTbc = !isValidDate(event.event_time)

    return (
        <div className="w-full rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col hover:scale-105 hover:shadow-xl" onClick={() => onClick(event.id)} >
            {/* Image container with aspect ratio */}
            <div className="relative w-full pb-[100%]">
                {event.image_url ? 
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