import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Users,
  Car,
  Briefcase,
  Building,
  Tag,
  BadgeDollarSign,
  ServerCrash,
  ScissorsIcon,
  CircleDollarSignIcon,
  NotebookIcon,
  PointerIcon as TipIcon,
} from "lucide-react";
import { Input } from "@/Components/Common/FormComponents/Input";
import Link from "next/link";
import { API } from "@/Config/Config";

const SummaryItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center space-x-2 text-sm"
  >
    <Icon className="h-4 w-4 flex-shrink-0 text-indigo-500" />
    <span className="font-medium text-indigo-600">{label}:</span>
    <span className="truncate text-gray-800">{value}</span>
  </motion.div>
);

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

const Summary = ({ leadDetails }: { leadDetails: LeadDetails }) => {
  const [tip, setTip] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(leadDetails.price);

  useEffect(() => {
    setTotalPayable(leadDetails.price + tip);
  }, [leadDetails.price, tip]);

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tipValue = parseFloat(e.target.value) || 0;
    setTip(tipValue);
  };

  const sections = [
    {
      title: "Trip Details",
      icon: Briefcase,
      fields: [
        { icon: Tag, label: "Service", value: leadDetails.serviceType },
        { icon: Car, label: "Vehicle", value: leadDetails.vehicleType },
        {
          icon: Users,
          label: "Passengers",
          value: leadDetails.numberOfPassengers,
        },
        { icon: Calendar, label: "Date", value: leadDetails.pickupDate },
        { icon: Clock, label: "Time", value: leadDetails.pickupTime },
        {
          icon: MapPin,
          label: "Pickup",
          value:
            leadDetails.pickupAddress || leadDetails.pickupAirport || "N/A",
        },
      ],
    },
    {
      title: "Customer",
      icon: User,
      fields: [
        { icon: User, label: "Name", value: leadDetails.name },
        { icon: Mail, label: "Email", value: leadDetails.email },
        { icon: Phone, label: "Phone", value: leadDetails.phone },
      ],
    },
    {
      title: "Company",
      icon: Building,
      fields: [
        { icon: Building, label: "Name", value: leadDetails.companyName },
        { icon: Mail, label: "Email", value: leadDetails.companyEmail },
      ],
    },
    {
      title: "Total",
      icon: NotebookIcon,
      fields: [
        {
          icon: CircleDollarSignIcon,
          label: "Amount",
          value: "$" + leadDetails.price.toFixed(2),
        },
        { icon: ServerCrash, label: "Tax", value: "$0.00" },
        { icon: ScissorsIcon, label: "Discount", value: "$0.00" },
        {
          icon: BadgeDollarSign,
          label: "Total Payable",
          value: "$" + totalPayable.toFixed(2),
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-h-[calc(100vh-0rem)] space-y-4 overflow-y-auto rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-2xl"
    >
      <h2 className="mb-2 text-xl font-semibold text-indigo-800">
        Reservation Summary
      </h2>
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
          className="rounded-xl border border-indigo-200 bg-white bg-opacity-50 p-3 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <h3 className="text-md mb-2 flex items-center font-semibold text-indigo-700">
            <section.icon className="mr-2 h-5 w-5 text-indigo-600" />
            {section.title}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {section.fields.map((item, index) => (
              <SummaryItem
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="rounded-xl border-2 border-indigo-400 bg-indigo-50 p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <h3 className="mb-3 flex items-center text-lg font-semibold text-indigo-700">
          <TipIcon className="mr-2 h-6 w-6 text-indigo-600" />
          Leave a Tip
        </h3>
        <div className="flex items-center justify-around space-x-4 flex-wrap gap-2">
          <div className="w-[80%]">
            <Input
              type="number"
              min="0"
              step="1"
              value={tip}
              onChange={handleTipChange}
              className="w-32 text-right text-lg font-semibold"
              placeholder="Enter tip amount"
            />
            <span className="text-lg font-semibold text-indigo-700">
              Total with Tip: ${totalPayable.toFixed(2)}
            </span>
            <p className="mt-2 text-sm text-indigo-600">
              Your generosity is appreciated! Add a tip to thank your driver for
              their excellent service.
            </p>
          </div>

          <div>
            <Link
              href={`${API.websiteURL}/stripe?id=${leadDetails._id}&tip=${tip}`}
              className="inline-block flex h-[45px] w-[150px] items-center justify-center rounded-md bg-black text-white"
            >
              Continue
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Summary;
