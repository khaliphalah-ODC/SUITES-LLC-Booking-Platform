import DashboardClient from "@/components/dashboard/DashboardClient";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardBookingsPage() {
  return (
    <DashboardShell title="Manage Bookings">
      <DashboardClient view="bookings" />
    </DashboardShell>
  );
}
