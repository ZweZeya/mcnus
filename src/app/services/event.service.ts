import { isEventType, BaseEvent } from '@/model/event';
import { createClient } from '@supabase/supabase-js'
import path from 'path';
import fs from 'fs/promises';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string, 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
);

export const eventService = {
    async getEvents(type: string) {
        const fileName = isEventType(type) ? type + "-events.json" : "upcoming-events.json"
        const filePath = path.join(process.cwd(), `src/data/${fileName}`);
        const events: BaseEvent[] = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        const eventsWithImages = events.map(event => {
            const { data } = supabase.storage.from("images/events").getPublicUrl(event.image);
            return {...event, image: data.publicUrl}
        })
        
        return eventsWithImages
    }
}