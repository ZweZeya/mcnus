import { EventType, isEventType } from "@/model/event";
import { eventService } from "@/services/event.service";
import EventsClient from "./EventsClient";

const Events = async ({ type, page }: { type?: string, page?: string }) => {
    const normalizedType = type ?? null;
    const eventType = isEventType(normalizedType) ? normalizedType : EventType.UPCOMING
    const pageIndex = page ? parseInt(page) : 0
    const data = await eventService.getNEvents(eventType, pageIndex)

    return (
        <EventsClient data={data} eventType={eventType} />
    )
}



export default Events

