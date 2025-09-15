"use client";

import { useState, useEffect } from "react";
// import Navbar from "@/Components/Common/Navbar/Navbar";
import { getCompanyLeads, getCustomerById } from "@/Services/GET";
import { Building } from "lucide-react";
import CompanyLeadsTable from "@/Components/Company/Leads/CompanyLeadsTable";
import { ICustomers } from "@/Types";

export const CompanyBookings = ({ userId }: { userId?: string }) => {
  const [leads, setLeads] = useState([]);
  const [loader, setLoader] = useState(true);
  const [customer, setCustomer] = useState<ICustomers>();

  useEffect(() => {
    if (userId) {
      getCustomerById(String(localStorage.getItem("limo-token") ?? ""), userId)
        .then((data) => {
          setCustomer(data);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [userId]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("limo-token");
      if (!token) {
        return;
      }

      const companyId = localStorage.getItem("companyId");

      try {
        const response = await getCompanyLeads(token, companyId, userId);
        setLeads(response.data);

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <Navbar/> */}
      <div className="container mx-auto py-10">
        <div className="mb-5 flex items-center justify-start gap-2">
          <Building />
          <h1 className="text-2xl font-bold">
            {customer
              ? `Trip history for ${customer.name}`
              : "Leads Management"}
          </h1>
        </div>
        {!loader && <CompanyLeadsTable leads={leads} />}
      </div>
    </>
  );
};
