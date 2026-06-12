import { BaseEvent } from '@/model/event';
import { fetchAllEvents, fetchEventById, fetchNEvents } from '@/repositories/event.client.repository';
import { getPublicImageUrl } from '@/storage/image-storage';

export type EventsData = {
    events: BaseEvent[],
    firstPage: number, 
    pageSize: number,
    totalCount: number,
    index: number
}

export const eventService = {
    async getEvents(type: string) : Promise<BaseEvent[]> {
        const events = await fetchAllEvents(type);
        const eventsWithImages = events.map(event => {
            let image_url = undefined

            if (event.image_path) {
                image_url = getPublicImageUrl(event.image_path)
            }
            return {...event, image_url: image_url}
        }) 
        return eventsWithImages as BaseEvent[]
    },
    
    async getEventById(id: number) : Promise<BaseEvent | null> {
        const event = await fetchEventById(id)
        if (!event) {
            return null
        }
        let image_url = undefined

        if (event.image_path) {
            image_url = getPublicImageUrl(event.image_path)
        }
        return {...event, image_url: image_url};
    },

    async getNEvents(type: string, index: number): Promise<EventsData> {
        const eventsData = await fetchNEvents(type, index);
        eventsData.events = eventsData.events.map(event => {
            let image_url = undefined

            if (event.image_path) {
                image_url = getPublicImageUrl(event.image_path)
            }
    
            return {...event, image_url: image_url}
        }) 
        return eventsData
    }
};