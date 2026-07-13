"use server";

import { RecruitmentData } from "@/model/recruitment";
import recruitmentServerService from "@/services/recruitment.server.service";
import { revalidatePath } from "next/cache";

export async function updateRecruitmentDataAction(
  recruitmentData: RecruitmentData[]
) {
  try {
    await recruitmentServerService.updateRecruitmentData(recruitmentData);

    revalidatePath("/admin/recruitment");
    revalidatePath("/recruitment");

    return { success: true };
  } catch (error) {
    console.error("updateRecruitmentDataAction failed", error);
    return { success: false, error: "Failed to update recruitment data" };
  }
}
