import { RecruitmentData } from "@/model/recruitment"
import { fetchRecruitmentData } from "@/repositories/recruitment.client.repository"

export const recruitmentClientService = {
    async getRecruitmentData() : Promise<RecruitmentData[] | null> {
        try {
             const recruitmentData = await fetchRecruitmentData()

             if (!recruitmentData) {
                return null
             }
            
             return recruitmentData
        } catch (error) {
            throw new Error("recruitmentClientService.getRecruitmentData failed", { cause : error })
        }

    }
}