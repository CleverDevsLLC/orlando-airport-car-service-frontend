"use client";

import React, { useState } from "react";
import {
  Settings,
  DollarSign,
  type LucideIcon,
  PercentCircle,
  Hourglass,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function ManagementCard({
  icon,
  title,
  description,
  actionText,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: CardProps) {
  return (
    <div
      className={`transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ${
        isHovered ? "scale-105 shadow-xl" : ""
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="p-8">
        <div className="mb-4 flex items-center">
          <div className="rounded-full bg-gray-100 p-3">{icon}</div>
          <h2 className="ml-4 text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <p className="mb-6 h-20 text-gray-600">{description}</p>
        <button className="w-full transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700">
          {actionText}
        </button>
      </div>
    </div>
  );
}

interface CardData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  redirect: string;
}

const cardData: CardData[] = [
  {
    id: "defaults",
    icon: Settings,
    title: "Manage Default State",
    description:
      "Configure default settings for vehicle types, pricing, and availability.",
    actionText: "Configure Defaults",
    redirect: "/company/defaultstates",
  },
  {
    id: "charges",
    icon: DollarSign,
    title: "Manage Additional Charges",
    description:
      "Set up and modify extra fees, services, and special requests.",
    actionText: "Manage Charges",
    redirect: "/company/additionalcharges",
  },
  {
    id: "discount",
    icon: PercentCircle,
    title: "Manage Discounts",
    description: "Set up and modify discounts",
    actionText: "Manage Discounts",
    redirect: "/company/discountcharges",
  },
  {
    id: "minHours",
    icon: Hourglass,
    title: "Manage hours",
    description: "Set up and modify hours of cars & limo",
    actionText: "Manage Hours",
    redirect: "/company/manage-hours",
  },
  {
    id: 'tipbox',
    icon: CreditCard,
    title: "Manage Payment Panel",
    description: "Set up and modify your tips, change the visibility of your gratuity section on the payment panel",
    actionText: "Manage Payment Panel",
     redirect: "/company/managetipbox"
  },

];
    
//   {
//     id: 'schedule',
//     icon: Calendar,
//     title: "Scheduling",
//     description: "Manage bookings, view calendar, and optimize your fleet's schedule.",
//     actionText: "Open Schedule"
//   },
//   {
//     id: 'drivers',
//     icon: Users,
//     title: "Driver Management",
//     description: "Assign drivers, manage shifts, and track performance metrics.",
//     actionText: "Manage Drivers"
//   },
//   {
//     id: 'analytics',
//     icon: TrendingUp,
//     title: "Analytics & Reports",
//     description: "View insights, generate reports, and analyze business performance.",
//     actionText: "View Analytics"
//   },
//   {
//     id: 'support',
//     icon: HelpCircle,
//     title: "Support & Resources",
//     description: "Access help documentation, FAQs, and customer support options.",
//     actionText: "Get Help"
//   }


export default function ManagementDashboard() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-800">
            Limo Service Management
          </h1>
          <p className="text-xl text-gray-600">
            Streamline your operations and enhance your service
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card) => (
            <ManagementCard
              key={card.id}
              icon={<card.icon className="h-10 w-10 text-blue-500" />}
              title={card.title}
              description={card.description}
              actionText={card.actionText}
              isHovered={hoveredCard === card.id}
              onHover={() => setHoveredCard(card.id)}
              onLeave={() => setHoveredCard(null)}
              onClick={() => router.push(card.redirect)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
