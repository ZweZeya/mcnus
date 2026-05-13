import { supabase } from "@/lib/supabase";

export const getPublicImageUrl = (path: string): string => {
    return supabase
        .storage
        .from('images')
        .getPublicUrl(path)
        .data
        .publicUrl;
}

export const uploadEventImage = async (imagePath: string, imageFile: File) => {
    await supabase
        .storage
        .from('images')
        .upload(imagePath, imageFile);
}