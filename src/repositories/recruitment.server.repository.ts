import { createClient } from "@/lib/server/supabaseServer";
import { RecruitmentData } from "@/model/recruitment";


export const saveRecruitmentData = async (updatedData: RecruitmentData[]) => {
    const client = await createClient()

    const { error } = await client
        .from('recruitment')
        .upsert(updatedData, { onConflict : "page_name" })
    
    if (error) {
        throw new Error("Supabase recruitment data save failed", { cause : error })
    }
}