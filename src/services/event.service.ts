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
    
    
    async addUpcomingEvent(event: BaseEvent) {
        try {
            if (!event.name) {
                throw new Error("Event name is required");
            }

            if (event.image_file) {
                await uploadImage(event.image_path, event.image_file);
            }

            await addEvent(event);
        } catch (error) {
            console.error("Error in eventService.addUpcomingEvent:", error);
            throw error;
        }
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
};