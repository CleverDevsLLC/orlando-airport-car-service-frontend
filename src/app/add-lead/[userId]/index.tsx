"use client";
import ReservationForm from "@/Components/Reservations/Reservations";
import { getCustomerById } from "@/Services/GET";
import { ICustomers } from "@/Types";
import React from "react";

export const MainAddLead = ({ userId }: { userId: string }) => {
  const [customer, setCustomer] = React.useState<ICustomers>();
  React.useEffect(() => {
    getCustomerById(String(localStorage.getItem("limo-token") ?? ""), userId)
      .then((data) => {
        setCustomer(data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [userId]);
  return (
    <div className="flex flex-col items-center gap-8 md:grid">
      <div className="mb-8 w-full rounded-lg bg-white shadow-lg sm:p-0 md:mb-0 lg:p-6">
        <ReservationForm customer={customer} />
      </div>
    </div>
  );
};
