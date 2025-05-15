import { formatDate, isPast } from "@/app/utils/dateUtils";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { darkerGrey, navy } from "@/app/utils/colors";
import { Text, TextSm } from "../common/textComponents";
import { Event } from "@/app/api/events/route";
import { Button } from "@/components/ui/button";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const isClosed = isPast(event.date)
    
    const handleClick = (link: string) => {
        window.open(link, "_blank")
    }

    return (
        <div className="w-72 h-[390px] rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col">
            <div className="relative w-full h-64 border border-transparent">
                <Image src={event.image} alt={event.name} fill className="object-fit" />
            </div>
            <div className="flex flex-col flex-1 px-3 py-2">
                <h2 className="text-base font-semibold">{event.name}</h2>
                <TextSm style={{color: darkerGrey}}>{formatDate(event.date)}</TextSm>
                <Button className="mt-auto pt-2 text-white" disabled={isClosed} onClick={() => handleClick(event.link)} style={{backgroundColor: navy}}>
                    Join <GoLinkExternal size={16} />
                </Button>
            </div>
        </div>
    );
};

export const EmptyEventCard = () => {
    return (
        <div className="w-72 h-[390px] rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col items-center justify-center">
            <Text>Coming Soon</Text>
        </div>
    );
};

export default EventCard;