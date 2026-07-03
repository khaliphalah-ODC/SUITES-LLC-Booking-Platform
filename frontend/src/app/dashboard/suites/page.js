import ContentManager from "@/components/dashboard/ContentManager";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardSuitesPage() {
  return (
    <DashboardShell title="Manage Suites">
      <ContentManager type="suites" />
    </DashboardShell>
  );
}
