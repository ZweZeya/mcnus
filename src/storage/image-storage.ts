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
    const { error } = await supabase
        .storage
        .from('images')
        .upload(imagePath, imageFile);

    if (error) {
        throw new Error("Supabase file insertion failed", { cause : error })
    }
}

export const deleteImage = async (imagePath: string) => {
    const { error } = await supabase
        .storage
        .from('images')
        .remove([imagePath]);

    if (error) {
        throw new Error("Supabase file deletion failed", { cause : error })
    }
}

export const updateImage = async (imagePath: string, imageFile: File) => {
    const { error } = await supabase
        .storage
        .from('images')
        .update(imagePath, imageFile);

    if (error) {
        throw new Error("Supabase file update failed", { cause: error })
    }
}