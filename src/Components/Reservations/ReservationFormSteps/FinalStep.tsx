"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { Button } from "@/Components/Common/FormComponents/Button";
import { FormData, ICustomers } from "@/Types";
import { useRouter } from "next/navigation";

interface FinalStepProps {
  formData: FormData;
  setStep: (step: number) => void;
  setCompletedForm: (val: boolean) => void;
  customer?: ICustomers;
}

export const ThankYouPage = ({
  formData,
  setStep,
  setCompletedForm,
  customer,
}: FinalStepProps) => {
  const router = useRouter();
  return (
    <div className="mt-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>
        <h1 className="text-center text-xl font-bold text-gray-600">
          Order ID #{formData.orderId}
        </h1>

        <h1 className="text-center text-2xl font-bold text-gray-800">
          Thank You {formData.name} for Requesting a Quote!
        </h1>

        <div className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-3 text-gray-700"
          >
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Your request has been recieved!</span>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-3 text-gray-700"
          >
            <Clock className="h-5 w-5 text-blue-500" />
            <span>Our team is reviewing your details!</span>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center space-x-3 text-gray-700"
          >
            <span>
              We look forward to serving you!
              <br />
              <br />{" "}
              <span className="font-semibold text-indigo-500">
                Check your spam/junk folder if our email doesn&apos;t appear in
                your inbox.
              </span>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            className="w-full bg-black text-white transition-colors hover:bg-gray-800"
            onClick={() => {
              if (customer) {
                router.back();
                return;
              }
              setCompletedForm(false);
              setStep(1);
            }}
          >
            {customer ? "Get Back To Customers" : "Get Another Quote"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
