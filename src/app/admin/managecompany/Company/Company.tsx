"use client";
import CompanyDetails from "@/Components/Admin/CompanyInfo/CompanyInfo";
import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import CompanyUpdate from "@/Components/Admin/UpdateCompany/UpdateComapny";
import Navbar from "@/Components/Common/Navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ManageCompany() {
  const [value, setValue] = useState("manage");
  const searchParams = useSearchParams();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);

  const router = useRouter();
  
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("limo-token") : null;
    if (!token) {
      router.push("/admin/login");
    }
    const acc_status = typeof window !== 'undefined' ? localStorage.getItem("acc_status") : null;
    if (acc_status !== "admin") {
      router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    const id = searchParams.get("id");
    const name = searchParams.get("companyName");
    setCompanyId(id);
    setCompanyName(name);
  }, [searchParams]);

  if (!companyId || !companyName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Sidebar title={companyName} value={value} setValue={setValue} />

      {value === "manage" ? (
        <>
          <CompanyUpdate companyId={companyId} />
        </>
      ) : value === "info" ? (
        <>
          <CompanyDetails companyId={companyId}/>
        </>
      ) : null}
    </div>
  );
}
