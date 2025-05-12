import { formatDate } from "@/app/utils/dateUtils";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { navy } from "@/app/utils/colors";
import { Text } from "../common/textComponents";


export interface Event {
    name: string, 
    date: Date, 
    image: string, 
    link: string
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <div className="w-72 h-[390px] rounded-xl shadow-md overflow-hidden bg-white text-left flex flex-col">
            <div className="relative w-full h-64 border border-transparent">
                <Image src={event.image} alt={event.name} fill className="object-fit" />
            </div>
            <div className="flex flex-col flex-1 px-3 py-2">
                <h2 className="text-base font-semibold text-gray-800">{event.name}</h2>
                <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                <div className="mt-auto pt-2">
                    <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full text-sm px-3 py-2 text-white rounded-md"
                        style={{backgroundColor: navy}}
                    >
                        Join
                        <GoLinkExternal size={16} />
                    </a>
                </div>
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