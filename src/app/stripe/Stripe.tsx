"use client";

import Payment from "@/Components/Stripe/Main";
import { getLeadDetails } from "@/Services/GET";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard } from 'lucide-react';

interface LeadDetails {
  companyName: string;
  companyEmail: string;
  serviceType: string;
  pickupAddress?: string;
  pickupAirport?: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  numberOfPassengers: string;
  pickupDate: string;
  pickupTime: string;
  price: number;
  _id: string;
}

export default function Stripe() {
  const searchParams = useSearchParams();
  const [leadDetails, setLeadDetails] = useState<LeadDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const tip = parseInt(searchParams.get("tip") || "0");

  useEffect(() => {
    const fetchLeadDetails = async () => {
      const id = searchParams.get("id");
      if (!id) {
        setError("No ID provided in search params");
        setLoading(false);
        return;
      }

      try {
        const response = await getLeadDetails(id);
        setLeadDetails(response.data);
      } catch (err) {
        console.error("Error fetching lead details:", err);
        setError("Failed to fetch lead details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-indigo-700">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-700">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-6 flex flex-col">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-indigo-800 mb-6 text-center"
        >
          Complete Your Reservation
        </motion.h1>
        <div className="flex flex-col lg:flex-row gap-6 flex-grow justify-center">
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
            {leadDetails && <Payment leadDetails={leadDetails} tip={tip} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

