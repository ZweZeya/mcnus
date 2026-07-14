import AdminEvents from "@/app/components/admin/AdminEvents";
import EntranceAnimation from "@/app/components/common/EntranceAnimation";

export default function AdminEventsPage() {
  return (
    <main>
      <EntranceAnimation distance={12}>
        <AdminEvents />
      </EntranceAnimation>
    </main>
  );
}
