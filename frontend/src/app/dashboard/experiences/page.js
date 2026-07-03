import ContentManager from "@/components/dashboard/ContentManager";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardExperiencesPage() {
  return (
    <DashboardShell title="Manage Experiences">
      <ContentManager type="experiences" />
    </DashboardShell>
  );
}
