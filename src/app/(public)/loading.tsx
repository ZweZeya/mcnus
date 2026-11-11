import Loading from "../components/common/Loading";

// Shown instantly while a page's server data (e.g. events from Supabase) is still loading.
export default function PageLoading() {
    return (
        <div role="status" aria-label="Loading" className="flex flex-1 items-center justify-center min-h-[60vh]">
            <Loading />
        </div>
    );
}
