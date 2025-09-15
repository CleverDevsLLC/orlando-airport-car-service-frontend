"use client";

import { useState, useEffect } from "react";
import LeadsTable from "@/Components/Admin/AllBookings/LeadsTable"
import Navbar from "@/Components/Common/Navbar/Navbar";
import { getAdminLeads, getCompanyNames } from "@/Services/GET"
import { ArrowLeftCircle } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";

type companyNameType = {
  companyName: string
}

export default function AllBookings() {
  const [leads, setLeads] = useState([]);
  const [companyNamesArr, setCompanyNamesArr] = useState<string[]>([]);
  const [loader, setLoader] = useState(true);

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
    const fetchData = async () => {
      const token = localStorage.getItem("limo-token");
      if (!token) {
        // Handle the case where there's no token, e.g., redirect to login
        return;
      }

      try {
        const response = await getAdminLeads(token);
        setLeads(response.data);        
        
        const companyNames = await getCompanyNames(token);
        const namesArr = companyNames.data.map((item: companyNameType) => item.companyName);
        setCompanyNamesArr(namesArr);

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show error message to user
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-start gap-2 mb-5">
          <Link href={"/admin"}>
            <ArrowLeftCircle className="cursor-pointer"/>
          </Link>
          <h1 className="text-2xl font-bold">Leads Management</h1>
        </div>
        {!loader && <LeadsTable leads={leads} companyNamesArr={companyNamesArr}/>}
      </div>
    </>
  )
}

