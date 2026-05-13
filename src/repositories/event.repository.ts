import { supabase } from "@/lib/supabase";
import { BaseEvent } from "@/model/event";

export const fetchEventsFromSupabase = async (type: string): Promise<BaseEvent[]> => {
    const { data } = await supabase
        .from('events')
        .select()
        .eq('event_type', type);
    return data as BaseEvent[]
}

export const addUpcomingEventToSupabase = async (event: BaseEvent) => {
    await supabase
        .from('events')
        .upsert({
            name: event.name, 
            description: event.description,
            event_time: event.event_time, 
            image_path: event.image_path, 
            registration_link: event.registration_link,
        });
}