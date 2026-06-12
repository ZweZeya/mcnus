import { eventService } from "@/services/event.service"
import AdminEventsTable from "./AdminEventsTable"


export default async function AdminEvents() {
    const types = ["upcoming", "past"]
    const promises = types.map(type => eventService.getEvents(type))
    const results = await Promise.all(promises)
    const eventData = results.flat()

    console.log(eventData)

    return (
        <AdminEventsTable initialEvents={eventData}/>
    )
}