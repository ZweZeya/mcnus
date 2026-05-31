import { supabase } from "@/lib/supabase";
import { BaseEvent } from "@/model/event";
import { EventsData } from "@/services/event.service";

const PAGE_SIZE = 8;

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

    if (error) throw error;

    return {
        events: events ?? [],
        totalCount: totalCount ?? 0,
        pageSize: PAGE_SIZE,
        firstPage: index * PAGE_SIZE,
        index: index
    } as EventsData;
}