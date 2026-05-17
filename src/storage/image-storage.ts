import { supabase } from "@/lib/supabase";

export const getPublicImageUrl = (path: string): string => {
    return supabase
        .storage
        .from('images')
        .getPublicUrl(path)
        .data
        .publicUrl;
}

export const uploadImage = async (imagePath: string, imageFile: File) => {
    await supabase
        .storage
        .from('images')
        .upload(imagePath, imageFile);
}

export const deleteImage = async(imagePath: string) => {
    await supabase
        .storage
        .from('images')
        .remove([imagePath]);
}
export const updateImage = async (imagePath: string, imageFile: File) => {
    await supabase
        .storage
        .from('images')
        .update(imagePath, imageFile);
}