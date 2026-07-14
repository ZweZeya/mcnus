import AdminCard from "@/app/components/admin/AdminCard"
import EntranceAnimation from "@/app/components/common/EntranceAnimation"

const AdminPage = () => {
    const adminPages = [
        { name: "Events", to: "/admin/events"}
    ]

    return (
        <div className="flex justify-center items-center h-full m-auto">
            <div className="grid-rows-3">
                {adminPages.map((e, i) => (
                    <EntranceAnimation key={e.to} delay={i * 0.06}>
                        <AdminCard name={e.name} to={e.to} />
                    </EntranceAnimation>
                ))}
            </div>
        </div>
    )
}

export default AdminPage
