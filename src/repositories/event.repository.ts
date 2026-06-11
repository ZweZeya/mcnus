import { supabase } from "@/lib/supabase";
import { BaseEvent, NewEvent } from "@/model/event";
import { EventsData } from "@/services/event.service";

const PAGE_SIZE = 8;

export const fetchAllEvents = async (type: string): Promise<BaseEvent[]> => {
    const { data } = await supabase
        .from('events')
        .select(`
            id,
            name,
            description,
            event_time,
            image_path,
            registration_link,
            recap_link,
            created_at,
            type: event_type
        `)
        .eq('event_type', type);
    return data as BaseEvent[]
}

export const addEvent = async (event: NewEvent) => {
    const { error } = await supabase
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
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
    
    if (error) {
        throw new Error("Supabase event deletion failed", { cause : error })
    }
}

export const updateEvent = async (event: BaseEvent) => {
    const { error } = await supabase
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

export const fetchNEvents = async (type: string, index: number): Promise<EventsData> => {
    const { data: events } = await supabase
        .from('events')
        .select()
        .eq('event_type', type)
        .order('event_time', { ascending: false})
        .range(index * PAGE_SIZE, (index + 1) * PAGE_SIZE - 1);

    const { count: totalCount, error } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', type);

    if (error) {
        throw new Error("Supabase event fetch failed", { cause : error });
    }

    return {
        events: events ?? [],
        totalCount: totalCount ?? 0,
        pageSize: PAGE_SIZE,
        firstPage: index * PAGE_SIZE,
        index: index
    } as EventsData;
}