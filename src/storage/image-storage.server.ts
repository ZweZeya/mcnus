import { createClient } from "@/lib/server/supabaseServer";

export const uploadImage = async (imagePath: string, buffer: Buffer, mimeType: string) => {
    const client = await createClient()
    
    const { error } = await client
        .storage
        .from('images')
        .upload(imagePath, buffer, {
            contentType: mimeType,
            upsert: true
        });

    if (error) {
        throw new Error("Supabase file upload failed", { cause: error });
    }
}

export const deleteImage = async (imagePath: string) => {
    const client = await createClient(); 

    const { error } = await client
        .storage
        .from('images')
        .remove([imagePath]);

    if (error) {
        throw new Error("Supabase file deletion failed", { cause: error });
    }
}