import { NewEvent, BaseEvent } from "@/model/event";
import { createClient } from "@/lib/server/supabaseServer";

export const addEvent = async (event: NewEvent) => {
    const client = await createClient();

    const { error } = await client
        .from('events')
        .upsert({
            name: event.name,
            description: event.description,
            event_time: event.event_time,
            image_path: event.image_path,
            registration_link: event.registration_link,
            event_type: event.type,
            created_at: event.created_at,
            recap_link: event.recap_link
        });
    
    if (error) {
        throw new Error("Supabase event insertion failed", { cause : error })
    }
}

export const deleteEventById = async (id: number) => {
    const client = await createClient();

    const { error } = await client
        .from('events')
        .delete()
        .eq('id', id);
    
    if (error) {
        throw new Error("Supabase event deletion failed", { cause : error })
    }
}

export const updateEvent = async (event: BaseEvent) => {
    const client = await createClient();

    const { error } = await client
        .from('events')
        .update({
            name: event.name,
            description: event.description,
            event_time: event.event_time,
            image_path: event.image_path,
            registration_link: event.registration_link,
        })
        .eq('id', event.id);

    if (error) {
        throw new Error("Supabase event update failed", { cause: error })
    }
}