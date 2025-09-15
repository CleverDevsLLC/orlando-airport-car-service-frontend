import { Customers } from "@/Components/Company/Customers";
import { Building } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-5 flex items-center justify-start gap-2">
        <Building />
        <h1 className="text-2xl font-bold">Customer Management</h1>
      </div>
      <Customers />
    </div>
  );
}
