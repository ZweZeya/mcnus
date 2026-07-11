import { RecruitmentData } from "@/model/recruitment";
import { saveRecruitmentData } from "@/repositories/recruitment.server.repository";

const recruitmentServerService = {
    async updateRecruitmentData(recruitmentData : RecruitmentData[]) {
        try {
            await saveRecruitmentData(recruitmentData)
        } catch (error) {
            throw new Error("recruitmentServce.updateRecruitmentData failed", { cause : error })
        }
    }
}

export default recruitmentServerService