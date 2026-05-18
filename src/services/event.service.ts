import { BaseEvent } from '@/model/event';
import { addUpcomingEventToSupabase, fetchEventsFromSupabase, insertEventToSupabase } from '@/repositories/event.repository';
import { getPublicImageUrl, uploadEventImage } from '@/storage/image-storage';

export const eventService = {
    async getEvents(type: string): Promise<BaseEvent[]> {
        const events = await fetchEventsFromSupabase(type);
        const eventsWithImages = events.map(event => {
            const image_url = getPublicImageUrl(event.image_path)
            return {...event, image_url: image_url}
        }) 
        return eventsWithImages as BaseEvent[]
    },
    
    /** 
    async addUpcomingEvent(event: BaseEvent) {
        await addUpcomingEventToSupabase(event);
        if (event.image_file) {
            await uploadEventImage(event.image_path, event.image_file);
        }
    },

    async createNewEvent(eventData: BaseEvent) {
        try {
            if (!eventData.name) throw new Error("Event name is required");

            const newEvent = await insertEventToSupabase(eventData);
      
            return newEvent;
        } catch (err) {
            console.error("Error in eventService.createNewEvent:", err);
            throw err;
        }
    },
    */

    async createEvent(event: BaseEvent) {
        try {
            if (!event.name) {
                throw new Error("Event name is required");
            }

            if (event.image_file) {
                await uploadEventImage(event.image_path, event.image_file);
            }

            const newEvent = await insertEventToSupabase(event);
            return newEvent;
        } catch (err) {
            console.error("Error in eventService.createEvent: ", err);
            throw err;
        }
    }
};