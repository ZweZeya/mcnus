import ColouredContentBox from "../common/ColouredContentBox"
import S from "@/app/utils/constantString";
import { promises as fs } from 'fs';
import EventCard, { Event, EmptyEventCard } from "./EventCard";

const Events = async () => {
    const filePath = process.cwd() + '/src/data/events.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data: Event[] = JSON.parse(file);

    return (
        <ColouredContentBox className="w-full text-center" title={S.upcomingEvents}>
            <div className="flex flex-wrap gap-4 justify-center items-center">
            {data.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
            {data.length % 4 < 2 && <EmptyEventCard />}
            </div>
        </ColouredContentBox>
    )   
}

export default Events