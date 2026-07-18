import AdminRecruitmentControls, {
  RecruitmentSettings,
} from "@/app/components/admin/AdminRecruitmentControls";
import PageLayout from "@/app/components/layout/PageLayout";
import { RecruitmentData } from "@/model/recruitment";
import recruitmentClientService from "@/services/recruitment.client.service";

const defaultRecruitmentSettings: RecruitmentSettings[] = [
  {
    id: "exco",
    title: "ExCo Recruitment",
    description: "Controls for the executive committee recruitment page.",
    isOpen: false,
    primaryButtonLink: "",
    secondaryButtonLink: "/recruitment?tab=exco",
  },
  {
    id: "subcomm",
    title: "Subcommittee Recruitment",
    description: "Controls for the subcommittee recruitment page.",
    isOpen: false,
    primaryButtonLink: "",
    secondaryButtonLink: "/recruitment?tab=subcomm",
  },
];

const buildRecruitmentSettings = (
  recruitmentData: RecruitmentData[] | null
): RecruitmentSettings[] => {
  return defaultRecruitmentSettings.map((defaultSetting) => {
    const data = recruitmentData?.find(
      (item) => item.page_name === defaultSetting.id
    );

    if (!data) {
      return defaultSetting;
    }

    return {
      ...defaultSetting,
      isOpen: data.is_open,
      primaryButtonLink: data.primary_button_url || "",
      secondaryButtonLink:
        data.secondary_button_url || defaultSetting.secondaryButtonLink,
    };
  });
};

export default async function AdminRecruitmentPage() {
  let recruitmentData: RecruitmentData[] | null = null;

  try {
    recruitmentData = await recruitmentClientService.getRecruitmentData();
  } catch (error) {
    console.error("Failed to load recruitment admin controls:", error);
  }

  const initialRecruitmentSettings = buildRecruitmentSettings(recruitmentData);

  return (
    <PageLayout>
      <AdminRecruitmentControls
        initialRecruitmentSettings={initialRecruitmentSettings}
      />
    </PageLayout>
  );
}
