import { formatDate } from "@/utils/dateUtils";
import { BaseEvent } from "@/model/event";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { darkerGrey, navy } from "@/app/resources/colors";
import { TextSm } from "../common/textComponents";
import { Button } from "@/components/ui/button";
import S from "@/app/resources/strings/constantStrings";

const PastEventCard: React.FC<{ event: BaseEvent }> = ({ event }) => {

    const handleClick = (link: string) => {
        window.open(link, "_blank")
    }

    return (
         <div className="w-full rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col">
            {/* Image container with aspect ratio */}
            <div className="relative w-full pb-[100%]">
                <Image 
                    src={event.image} 
                    alt={event.name} 
                    fill 
                    className="object-cover" 
                />
            </div>
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <h2 className="text-sm sm:text-base font-semibold line-clamp-2">{event.name}</h2>
                <TextSm style={{color: darkerGrey}} className="mt-1 mb-4">{formatDate(event.date)}</TextSm>
                <Button 
                    className="mt-auto w-full pt-2 text-white flex items-center justify-center gap-2" 
                    style={{backgroundColor: navy}}
                    onClick={() => handleClick(event.photos)} 
                >
                    {S.viewPhotos} <GoLinkExternal size={16} />
                </Button>
            </div>
        </div>
    )
}

export default PastEventCard;