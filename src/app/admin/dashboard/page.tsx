import DashboardCard from "@/components/admin/DashboardCard";
import RecentActivity from "@/components/admin/RecentActivity";
import RecentCars from "@/components/admin/RecentCars";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <DashboardCard title="Mobil" value={0} icon="🚗" />
        <DashboardCard title="Brand" value={0} icon="🏷️" />
        <DashboardCard title="Dealer" value={0} icon="🏢" />
        <DashboardCard title="User" value={1} icon="👤" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <RecentActivity />
        <RecentCars />
      </div>

    </div>
  );
}
