import { BaseEvent, NewEvent } from '@/model/event';
import { fetchAllEvents, fetchEventById, addEvent, updateEvent, deleteEventById, fetchNEvents } from '@/repositories/event.repository';
import { deleteImage, getPublicImageUrl, updateImage, uploadImage } from '@/storage/image-storage';

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
    
    
    async addUpcomingEvent(event: NewEvent) {
        try {
            if (!event.name) {
                throw new Error("Event name is required");
            }

            if (event.image_path && event.image_file) {
                await uploadImage(event.image_path, event.image_file);
            }

            await addEvent(event);
        } catch (error) {
            throw new Error("eventService.addUpcomingEvent failed", { cause : error });
        }
    },

    async deleteEvent(event: BaseEvent) {
        try {
            await deleteEventById(event.id);
            if (event.image_path) {
                await deleteImage(event.image_path);
            }
        } catch (error) {
            throw new Error("eventService.deleteEvent failed", { cause : error })
        }
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

    async updateEventInfo(event: BaseEvent) {
        try {
            if (event.image_file && event.image_path) {
                await updateImage(event.image_path, event.image_file);
            }
            await updateEvent(event);
        } catch (error) {
            throw new Error("eventService.updateEventInfo failed", { cause : error })
        }
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