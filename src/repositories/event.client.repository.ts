import { supabase } from "@/lib/supabase";
import { BaseEvent } from "@/model/event";
import { EventsData } from "@/services/event.client.service";

const PAGE_SIZE = 8;

export const fetchAllEvents = async (type: string): Promise<BaseEvent[]> => {
    const { data, error } = await supabase
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

    if (error) {
        console.error("Supabase error:", error);
        return [];
    }
    
    return data as BaseEvent[]
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