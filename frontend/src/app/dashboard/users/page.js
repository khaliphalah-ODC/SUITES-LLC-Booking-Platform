import DashboardClient from "@/components/dashboard/DashboardClient";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardUsersPage() {
  return (
    <DashboardShell title="Staff & Roles">
      <DashboardClient view="users" />
    </DashboardShell>
  );
}
