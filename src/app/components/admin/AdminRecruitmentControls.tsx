"use client";

import { useMemo, useState, useTransition } from "react";
import { ExternalLink, Link2, Save } from "lucide-react";
import { frangipani, navy } from "@/app/resources/colors";
import { updateRecruitmentDataAction } from "@/actions/recruitment.actions";
import EntranceAnimation from "@/app/components/common/EntranceAnimation";

type RecruitmentPageKey = "exco" | "subcomm";

export type RecruitmentSettings = {
  id: RecruitmentPageKey;
  title: string;
  description: string;
  isOpen: boolean;
  primaryButtonLink: string;
  secondaryButtonLink: string;
};

const initialSettings: RecruitmentSettings[] = [
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

type AdminRecruitmentControlsProps = {
  initialRecruitmentSettings?: RecruitmentSettings[];
};

const AdminRecruitmentControls = ({
  initialRecruitmentSettings = initialSettings,
}: AdminRecruitmentControlsProps) => {
  const [settings, setSettings] = useState(initialRecruitmentSettings);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCount = useMemo(
    () => settings.filter((setting) => setting.isOpen).length,
    [settings]
  );

  const updateSetting = (
    id: RecruitmentPageKey,
    updates: Partial<RecruitmentSettings>
  ) => {
    setSettings((currentSettings) =>
      currentSettings.map((setting) =>
        setting.id === id ? { ...setting, ...updates } : setting
      )
    );
  };

  const handleSave = () => {
    const recruitmentData = settings.map((setting) => ({
      page_name: setting.id,
      is_open: setting.isOpen,
      primary_button_url: setting.primaryButtonLink || null,
      secondary_button_url: setting.secondaryButtonLink || null,
    }));

    setSaveError(null);

    startTransition(async () => {
      const result = await updateRecruitmentDataAction(recruitmentData);

      if (result.success) {
        setLastSavedAt(new Date());
        return;
      }

      setSaveError(result.error || "Failed to update recruitment data");
    });
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-8 text-slate-900 md:px-8">
      <EntranceAnimation>
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Manage Recruitment
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600">
                {openCount} of {settings.length} pages open
              </span>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: navy }}
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {saveError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {saveError}
            </div>
          )}

          {lastSavedAt && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              Recruitment controls saved locally at{" "}
              {lastSavedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              .
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            {settings.map((setting) => (
              <section
                key={setting.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {setting.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {setting.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={setting.isOpen}
                    onClick={() =>
                      updateSetting(setting.id, { isOpen: !setting.isOpen })
                    }
                    className="inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: setting.isOpen ? navy : "#CBD5E1",
                    }}
                  >
                    <span
                      className={`h-6 w-6 rounded-full bg-white shadow-sm transition ${setting.isOpen ? "translate-x-6" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>

                <div
                  className="mt-5 rounded-md border px-4 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: setting.isOpen ? "#ECFDF5" : "#FFF7ED",
                    borderColor: setting.isOpen ? "#A7F3D0" : frangipani,
                    color: setting.isOpen ? "#047857" : "#9A3412",
                  }}
                >
                  Recruitment is currently {setting.isOpen ? "open" : "closed"}.
                </div>

                <div className="mt-6 flex flex-col gap-5">
                  <LinkEditor
                    label="Apply Now"
                    link={setting.primaryButtonLink}
                    onLinkChange={(primaryButtonLink) =>
                      updateSetting(setting.id, { primaryButtonLink })
                    }
                  />

                  <LinkEditor
                    label="View Roles"
                    link={setting.secondaryButtonLink}
                    onLinkChange={(secondaryButtonLink) =>
                      updateSetting(setting.id, { secondaryButtonLink })
                    }
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </EntranceAnimation>
    </div>
  );
};

type LinkEditorProps = {
  label: string;
  link: string;
  onLinkChange: (value: string) => void;
};

const LinkEditor = ({
  label,
  link,
  onLinkChange,
}: LinkEditorProps) => {
  const canOpenLink = link.trim().length > 0;

  return (
    <div className="rounded-md border border-slate-200 p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-700">
        <Link2 className="h-4 w-4" aria-hidden="true" />
        {label}
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Button Link
          </span>
          <input
            type="text"
            value={link}
            onChange={(event) => onLinkChange(event.target.value)}
            placeholder="https://forms.gle/... or /recruitment?tab=exco"
            className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <a
          href={canOpenLink ? link : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!canOpenLink}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition ${canOpenLink
              ? "border-slate-300 text-slate-700 hover:bg-slate-50"
              : "pointer-events-none border-slate-200 text-slate-300"
            }`}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Open
        </a>
      </div>
    </div>
  );
};

export default AdminRecruitmentControls;
