import { fetchEventsFromSupabase } from '@/repositories/event.repository';
import { getPublicImageUrl } from '@/storage/image-storage';

export const eventService = {
    async getEvents(type: string) {
        const events = await fetchEventsFromSupabase(type);
        const eventsWithImages = events.map(event => {
            const image_url = getPublicImageUrl(event.image_path)
            return {...event, image_url: image_url}
        })
        return eventsWithImages
    }
}