import DashboardClient from "@/components/dashboard/DashboardClient";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardSettingsPage() {
  return (
    <DashboardShell title="Settings">
      <DashboardClient view="settings" />
    </DashboardShell>
  );
}
