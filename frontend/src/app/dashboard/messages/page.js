import DashboardClient from "@/components/dashboard/DashboardClient";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardMessagesPage() {
  return (
    <DashboardShell title="Contact Messages">
      <DashboardClient view="messages" />
    </DashboardShell>
  );
}
