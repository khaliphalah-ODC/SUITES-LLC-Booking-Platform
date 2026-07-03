import PublicLayout from "@/components/layout/PublicLayout";
import BookingForm from "@/components/booking/BookingForm";
import { getSuites } from "@/lib/api";

export default async function BookingPage({ searchParams }) {
  const params = await searchParams;
  const { suites } = await getSuites({ limit: 50 });

  return (
    <PublicLayout>
      <main className="mx-auto max-w-container px-5 pb-[120px] pt-32 md:px-16">
        <BookingForm suites={suites} defaults={params || {}} />
      </main>
    </PublicLayout>
  );
}
