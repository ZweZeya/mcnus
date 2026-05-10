import { supabase } from "@/lib/supabase";

export const getPublicImageUrl = (path: string): string => {
    return supabase
        .storage
        .from('images')
        .getPublicUrl(path)
        .data
        .publicUrl;
}