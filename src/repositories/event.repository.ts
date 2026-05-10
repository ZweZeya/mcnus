import { supabase } from "@/lib/supabase";
import { BaseEvent } from "@/model/event";

export const fetchEventsFromSupabase = async (type: string): Promise<BaseEvent[]> => {
    const { data } = await supabase
        .from('events')
        .select()
        .eq('event_type', type);
    return data as BaseEvent[]
}