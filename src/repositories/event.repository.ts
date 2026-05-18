import { supabase } from "@/lib/supabase";
import { BaseEvent } from "@/model/event";

export const fetchAllEvents = async (type: string): Promise<BaseEvent[]> => {
    const { data } = await supabase
        .from('events')
        .select()
        .eq('event_type', type);
    return data as BaseEvent[]
}

export const addEvent = async (event: BaseEvent) => {
    await supabase
        .from('events')
        .insert({
            name: event.name, 
            description: event.description,
            event_time: event.event_time, 
            image_path: event.image_path, 
            registration_link: event.registration_link,
        });
}

export const fetchEventById = async (id: number) : Promise<BaseEvent | null> => {
    const { data } = await supabase
        .from('events')
        .select()
        .eq('id', id);
    if (data && data?.length > 0) {
        return data[0] as BaseEvent
    }
    return null
}

export const deleteEventById = async (id: number) => {
    await supabase  
        .from('events')
        .delete()
        .eq('id', id);
}

export const updateEvent = async (event: BaseEvent) => {
    await supabase
        .from('events')
        .update({
            name: event.name, 
            description: event.description,
            event_time: event.event_time, 
            image_path: event.image_path, 
            registration_link: event.registration_link,
        })
        .eq('id', event.id);
}