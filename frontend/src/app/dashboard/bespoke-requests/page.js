import DashboardClient from "@/components/dashboard/DashboardClient";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardRequestsPage() {
  return (
    <DashboardShell title="Bespoke Requests">
      <DashboardClient view="requests" />
    </DashboardShell>
  );
}
