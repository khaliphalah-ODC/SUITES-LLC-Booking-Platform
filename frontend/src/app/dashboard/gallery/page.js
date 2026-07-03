import ContentManager from "@/components/dashboard/ContentManager";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardGalleryPage() {
  return (
    <DashboardShell title="Manage Gallery">
      <ContentManager type="gallery" />
    </DashboardShell>
  );
}
