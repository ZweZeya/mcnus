import AdminCard from "@/app/components/admin/AdminCard"
import EntranceAnimation from "@/app/components/common/EntranceAnimation"
import PageLayout from "@/app/components/layout/PageLayout"
import { frangipani, navy } from "@/app/resources/colors"

const AdminPage = () => {
    const adminPages = [
        {
            name: "Events",
            to: "/admin/events",
            description: "Create events, update event details, and manage registration or recap links.",
            icon: "events" as const,
        },
        {
            name: "Recruitment",
            to: "/admin/recruitment",
            description: "Open or close recruitment and update Apply Now and View Roles links.",
            icon: "recruitment" as const,
        },
    ]

    return (
        <PageLayout>
            <div className="min-h-[72vh] px-4 py-8 text-slate-900 md:px-8">
                <div className="mx-auto flex max-w-6xl flex-col gap-8">
                    <EntranceAnimation>
                        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-6 md:px-8">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                    MC@NUS Admin
                                </p>
                                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold" style={{ color: navy }}>
                                            Dashboard
                                        </h1>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                            Choose a workspace to update public site content and controls.
                                        </p>
                                    </div>
                                    <div
                                        className="w-fit rounded-md px-3 py-2 text-sm font-semibold"
                                        style={{ backgroundColor: `${frangipani}55`, color: navy }}
                                    >
                                        {adminPages.length} workspaces
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
                                {adminPages.map((page, i) => (
                                    <EntranceAnimation key={page.to} delay={i * 0.06}>
                                        <AdminCard
                                            key={page.to}
                                            name={page.name}
                                            to={page.to}
                                            description={page.description}
                                            icon={page.icon}
                                        />
                                    </EntranceAnimation>
                                ))}
                            </div>
                        </section>
                    </EntranceAnimation>
                </div>
            </div>
        </PageLayout>
    )
}

export default AdminPage
