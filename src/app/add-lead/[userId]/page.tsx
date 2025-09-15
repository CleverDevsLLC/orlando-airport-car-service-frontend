import Navbar from "@/Components/Common/Navbar/Navbar";
import { MainAddLead } from ".";
interface AddLeadPageProps {
  params: Promise<{
    userId: string;
  }>;
}
export default async function AddLeadPage({ params }: AddLeadPageProps) {
  const { userId } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Create Customer Trip
          </h1>
        </section>
        <MainAddLead userId={userId} />
      </main>
    </div>
  );
}
