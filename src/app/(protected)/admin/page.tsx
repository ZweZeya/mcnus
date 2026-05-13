import AdminCard from "@/app/components/admin/AdminCard"

const AdminPage = () => {
    const adminPages = [
        { name: "Events", to: "/admin/events"}
    ]

    return (
        <div className="flex justify-center items-center h-full m-auto">
            <div className="grid-rows-3">
                {adminPages.map((e, i) => <AdminCard key={i} name={e.name} to={e.to} />)}
            </div>
        </div>
    )
}

export default AdminPage