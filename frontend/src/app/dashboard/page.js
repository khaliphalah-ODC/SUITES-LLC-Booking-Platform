import DashboardClient from "@/components/dashboard/DashboardClient";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell title="Operations Overview">
      <DashboardClient view="overview" />
    </DashboardShell>
  );
}
