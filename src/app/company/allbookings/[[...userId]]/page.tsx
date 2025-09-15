// import { useRouter } from "next/router";
import { CompanyBookings } from ".";

interface CompanyBookingsPageProps {
  params: Promise<{
    userId: string[];
  }>;
}

export default async function CompanyBookingsPage({
  params,
}: CompanyBookingsPageProps) {
  const { userId } = await params;
  return <CompanyBookings userId={userId?.length > 0 ? userId[0] : ""} />;
}
