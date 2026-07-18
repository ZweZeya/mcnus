import AdminEvents from "@/app/components/admin/AdminEvents";
import EntranceAnimation from "@/app/components/common/EntranceAnimation";
import PageLayout from "@/app/components/layout/PageLayout";

export default function AdminEventsPage() {
  return (
    <PageLayout>
      <div className="w-screen">
        <EntranceAnimation distance={12}>
          <AdminEvents />
        </EntranceAnimation>
      </div>
    </PageLayout>
  );
}
