import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 text-white">
            <Sidebar />
            <div className="ml-64 p-8">
                <DashboardHeader />
                <DashboardContent />
            </div>
        </div>
    );
}
