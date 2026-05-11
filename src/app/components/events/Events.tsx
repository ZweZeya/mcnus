import { EventType, isEventType } from "@/model/event";
import { eventService } from "@/services/event.service";
import EventsClient from "./EventsClient";

const Events = async ({ type }: { type?: string }) => {
    const normalizedType = type ?? null;
    const eventType = isEventType(normalizedType) ? normalizedType : EventType.UPCOMING
    const events = await eventService.getEvents(eventType)

    return (
        <EventsClient events={events} eventType={eventType} />
    )
}



export default Events

