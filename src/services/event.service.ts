import { BaseEvent } from '@/model/event';
import { addUpcomingEventToSupabase, fetchEventsFromSupabase } from '@/repositories/event.repository';
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

    async addUpcomingEvent(event: BaseEvent) {
        await addUpcomingEventToSupabase(event);
        if (event.image_file) {
            await uploadEventImage(event.image_path, event.image_file);
        }
    }
}