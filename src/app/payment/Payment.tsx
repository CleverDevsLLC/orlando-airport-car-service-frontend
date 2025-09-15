"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/Components/Common/Navbar/Navbar";
import Payment from "@/Components/Stripe/Main";
import { getLeadDetails } from "@/Services/GET";
import Summary from "./Summary/Summary";
import { motion } from "framer-motion";
import { CreditCard } from 'lucide-react';

export default function Billing() {
  const searchParams = useSearchParams();
  const [leadDetails, setLeadDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      const id = searchParams.get("id");
      if (id) {
        try {
          const response = await getLeadDetails(id);
          setLeadDetails(response.data);
        } catch (error) {
          console.error("Error fetching lead details:", error);
          // Handle error (e.g., show error message to user)
        }
      } else {
        console.error("No ID provided in search params");
        // Handle the case when no ID is provided
      }
      setLoading(false);
    };

    fetchLeadDetails();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Navbar />
      {!loading ? (
        <>
          <div className="flex-grow container mx-auto px-4 py-6 flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-indigo-800 mb-6 text-center"
            >
              Complete Your Reservation
            </motion.h1>
            <div className="flex flex-col lg:flex-row gap-6 flex-grow">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-[60%] rounded-3xl shadow-2xl p-6 transition-all duration-300 hover:shadow-3xl overflow-y-auto"
              >
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-indigo-600" />
                  Payment Details
                </h2>
                {leadDetails && <Payment leadDetails={leadDetails} tip={0} />}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full lg:w-[40%] flex-grow lg:max-h-[calc(100vh-10rem)]"
              >
                {leadDetails && <Summary leadDetails={leadDetails} />}
              </motion.div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-indigo-700">Loading...</h1>
        </div>
      )}
    </div>
  );
}

