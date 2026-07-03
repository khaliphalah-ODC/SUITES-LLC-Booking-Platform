import ContentManager from "@/components/dashboard/ContentManager";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardAmenitiesPage() {
  return (
    <DashboardShell title="Manage Amenities">
      <ContentManager type="amenities" />
    </DashboardShell>
  );
}
