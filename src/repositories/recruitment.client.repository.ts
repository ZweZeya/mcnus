import { supabase } from "@/lib/supabase"
import { RecruitmentData } from "@/model/recruitment"


export const fetchRecruitmentData = async () : Promise<RecruitmentData[]> => {
    const { data, error } = await supabase
        .from('recruitment')
        .select(`
            page_name,
            is_open,
            primary_button_url,
            secondary_button_url
            `)
        .order(`page_name`, { ascending: true })

    if (error) {
        console.error("Supabase error:", error)
        return []
    }

    return data as RecruitmentData[]
}

