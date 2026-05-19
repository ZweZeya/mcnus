import { formatDate } from "@/utils/dateUtils";
import { BaseEvent } from "@/model/event";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { darkerGrey, navy } from "@/app/resources/colors";
import { TextSm } from "../common/textComponents";
import { Button } from "@/components/ui/button";
import S from "@/app/resources/strings/constantStrings";

const PastEventCard: React.FC<{ event: BaseEvent, onClick: (id : number) => void }> = ({ event, onClick }) => {

    const handleClick = (link: string) => {
        window.open(link, "_blank")
    }

    return (
         <div className="w-full rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col hover:scale-105 hover:shadow-xl" onClick={() => onClick(event.id)}>
            {/* Image container with aspect ratio */}
            <div className="relative w-full pb-[100%]">
                <Image 
                    src={event.image_url} 
                    alt={event.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover" 
                />
            </div>
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <h2 className="text-sm sm:text-base font-semibold line-clamp-2">{event.name}</h2>
                <TextSm style={{color: darkerGrey}} className="mt-1 mb-4">{formatDate(event.event_time)}</TextSm>
                {/* <Button 
                    className="mt-auto w-full pt-2 text-white flex items-center justify-center gap-2" 
                    style={{backgroundColor: navy}}
                    disabled={event.recap_link == ""}
                    onClick={() => handleClick(event.recap_link)} 
                >
                    {S.viewPhotos} <GoLinkExternal size={16} />
                </Button> */}
            </div>
        </div>
    )
}

export default PastEventCard;