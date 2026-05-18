import { BaseEvent } from '@/model/event';
import { addEvent, deleteEventById, fetchAllEvents, fetchEventById, updateEvent } from '@/repositories/event.repository';
import { deleteImage, getPublicImageUrl, updateImage, uploadImage } from '@/storage/image-storage';
import { addUpcomingEventToSupabase, fetchEventsFromSupabase, insertEventToSupabase } from '@/repositories/event.repository';
import { getPublicImageUrl, uploadEventImage } from '@/storage/image-storage';

export const eventService = {
    async getEvents(type: string) : Promise<BaseEvent[]> {
        const events = await fetchAllEvents(type);
        const eventsWithImages = events.map(event => {
            const image_url = getPublicImageUrl(event.image_path)
            return {...event, image_url: image_url}
        }) 
        return eventsWithImages as BaseEvent[]
    },
    
    /** 
    async addUpcomingEvent(event: BaseEvent) {
        if (event.image_file) {
            await uploadImage(event.image_path, event.image_file);
        }
        await addEvent(event);
    },

    async deleteEvent(event: BaseEvent) {
        await deleteEventById(event.id);
        await deleteImage(event.image_path);
    },

    async getEventById(id: number) : Promise<BaseEvent | null> {
        return await fetchEventById(id);
    },

    async updateEventInfo(event: BaseEvent) {
        if (event.image_file) {
            await updateImage(event.image_path, event.image_file);
        }
        await updateEvent(event);
    }
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