"use client";

interface CompanyInfo {
  additionalPayments?: Array<{
    paymentType: string;
    amount: number;
    paymentLabel: string;
    isTax?: boolean;
    isGratuity?: boolean;
  }>;
  // Add other company info properties as needed
}
// const calculateGrandTotal = (lead: Leads, company: Company) => {
//   let total = lead.price || 0

//   // Apply discount if available
//   if (company.discount && company.discount > 0) {
//     total *= 1 - company.discount / 100
//   }

//   // Add lead additional payments
//   lead.additionalPayments?.forEach((payment) => {
//     if (payment.paymentType === "fixed") {
//       total += payment.amount
//     } else {
//       total += (payment.amount / 100) * total
//     }
//   })

//   // Add company additional payments
//   company?.additionalPayments?.forEach((payment) => {
//     if (payment.paymentType === "fixed") {
//       total += payment.amount
//     } else if (payment.paymentType === "percentage") {
//       total += (payment.amount / 100) * total
//     }
//   })

//   // Add tip
//   if (lead.tip) {
//     total += lead.tip
//   }

//   return total
// }

import type { Leads } from "@/Types";
import {
  XIcon,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Plane,
  Users,
  Car,
  Briefcase,
  FileText,
  Building,
  Tag,
  CalendarIcon,
  Link,
  ArrowRight,
  DollarSign,
  Notebook,
} from "lucide-react";
import { useEffect, useState } from "react";
import PriceInputModal from "./PriceInputModal";
import PriceUpdateModal from "./PriceUpdateModal";
import {
  sendInvoiceService,
  sendManualQuote,
  sendUpdatedQuote,
} from "@/Services/POST";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateLeadInfo } from "@/Services/PATCH";
import axios from "axios";
import { API } from "@/Config/Config";
import { formatDateForSummary } from "@/Utils";
import { getCompanyDetails } from "@/Services/GET";

type LucideIcon = typeof XIcon;

interface LeadDetailsModalProps {
  mainLead: Leads;
  linkedLead: Leads | null | undefined;
  onClose: () => void;
}

type Field = {
  icon: LucideIcon;
  label: string;
  value: string | number | JSX.Element | undefined;
  onChange?: (value: string) => void;
};

type Section = {
  title: string;
  icon: LucideIcon;
  fields: Field[];
};

const serviceTypeOptions = [
  "One-Way Trip to the Airport",
  "One-Way Trip from the Airport",
  "Round Trip Involving an Airport",
  "One-Way Trip Not Involving an Airport",
  "Round Trip Not Involving an Airport",
  "Hourly Trip",
];

export default function CompanyLeadDetailsModal({
  mainLead,
  linkedLead,
  onClose,
}: LeadDetailsModalProps) {
  const [showLinkedLead, setShowLinkedLead] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isPriceUpdateModalOpen, setIsPriceUpdateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(mainLead);
  const [currentPrice, setCurrentPrice] = useState<string | number | undefined>(
    mainLead.price,
  );
  const leadToShow = showLinkedLead && linkedLead ? linkedLead : mainLead;

  const [airportOptions, setAirports] = useState<string[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("limo-token") || "");
    setCompanyId(localStorage.getItem("companyId") || "");
  }, []);

  const getAirports = () => {
    const compId = localStorage.getItem("companyId") || "";
    axios
      .get(`${API.uri}/form/company/${compId}`)
      .then((res) => {
        console.log(res);
        setAirports(res.data.airports);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({});

  const getCompanyInfoHandler = async () => {
    const response = await getCompanyDetails(API.companyId);
    console.log(response);
    setCompanyInfo(response.data);

    console.log(companyInfo);
  };

  useEffect(() => {
    getAirports();
    getCompanyInfoHandler();
  }, [companyId]);

  const sections: Section[] = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        {
          icon: User,
          label: "Name",
          value: isEditing ? editedLead.name : leadToShow.name,
          onChange: (value: string) => handleInputChange("name", value),
        },
        {
          icon: Mail,
          label: "Email",
          value: isEditing ? editedLead.email : leadToShow.email,
          onChange: (value: string) => handleInputChange("email", value),
        },
        {
          icon: Phone,
          label: "Phone",
          value: isEditing ? editedLead.phone : leadToShow.phone,
          onChange: (value: string) => handleInputChange("phone", value),
        },
      ],
    },
    {
      title: "Trip Details",
      icon: Briefcase,
      fields: [
        {
          icon: Tag,
          label: "Service Type",
          value: isEditing ? (
            <select
              value={editedLead.serviceType}
              onChange={(e) => handleInputChange("serviceType", e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-base text-gray-800 focus:border-indigo-500 focus:outline-none"
            >
              {serviceTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            leadToShow.serviceType
          ),
          onChange: (value: string) => handleInputChange("serviceType", value),
        },
        {
          icon: Car,
          label: "Vehicle Type",
          value: isEditing ? editedLead.vehicleType : leadToShow.vehicleType,
          onChange: (value: string) => handleInputChange("vehicleType", value),
        },
        {
          icon: Clock,
          label: "Trip Duration",
          value: isEditing ? editedLead.tripDuration : leadToShow.tripDuration,
          onChange: (value: string) => handleInputChange("tripDuration", value),
        },
        {
          icon: Users,
          label: "Number of Passengers",
          value: isEditing
            ? editedLead.numberOfPassengers
            : leadToShow.numberOfPassengers,
          onChange: (value: string) =>
            handleInputChange("numberOfPassengers", value),
        },
        {
          icon: Users,
          label: "Passenger Names",
          value: isEditing
            ? editedLead.passengerNames
            : leadToShow.passengerNames,
          onChange: (value: string) =>
            handleInputChange("passengerNames", value),
        },
        {
          icon: Briefcase,
          label: "Trip Purpose",
          value: isEditing ? editedLead.tripPurpose : leadToShow.tripPurpose,
          onChange: (value: string) => handleInputChange("tripPurpose", value),
        },
        {
          icon: FileText,
          label: "Additional Notes",
          value: isEditing
            ? editedLead.additionalNotes
            : leadToShow.additionalNotes,
          onChange: (value: string) =>
            handleInputChange("additionalNotes", value),
        },
      ],
    },
    {
      title: "Pickup Details",
      icon: MapPin,
      fields: [
        {
          icon: MapPin,
          label: "Pickup City",
          value: isEditing ? editedLead.pickupCity : leadToShow.pickupCity,
          onChange: (value: string) => handleInputChange("pickupCity", value),
        },
        {
          icon: MapPin,
          label: "Pickup State",
          value: isEditing ? editedLead.pickupState : leadToShow.pickupState,
          onChange: (value: string) => handleInputChange("pickupState", value),
        },
        {
          icon: MapPin,
          label: "Pickup Address",
          value: isEditing
            ? editedLead.pickupAddress
            : leadToShow.pickupAddress,
          onChange: (value: string) =>
            handleInputChange("pickupAddress", value),
        },
        {
          icon: Calendar,
          label: "Pickup Date",
          value: isEditing
            ? editedLead.pickupDate
            : formatDateForSummary(leadToShow.pickupDate),
          onChange: (value: string) => handleInputChange("pickupDate", value),
        },
        {
          icon: Clock,
          label: "Pickup Time",
          value: isEditing ? editedLead.pickupTime : leadToShow.pickupTime,
          onChange: (value: string) => handleInputChange("pickupTime", value),
        },
        {
          icon: Plane,
          label: "Pickup Airport",
          value: isEditing ? (
            <select
              value={editedLead.pickupAirport || ""}
              onChange={(e) =>
                handleInputChange("pickupAirport", e.target.value)
              }
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-base text-gray-800 focus:border-indigo-500 focus:outline-none"
            >
              <option value="" disabled hidden>
                Select an airport
              </option>
              {airportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            leadToShow.pickupAirport || undefined
          ),
          onChange: (value: string) =>
            handleInputChange("pickupAirport", value),
        },
      ],
    },
    {
      title: "Dropoff Details",
      icon: MapPin,
      fields: [
        {
          icon: MapPin,
          label: "Dropoff City",
          value: isEditing ? editedLead.dropoffCity : leadToShow.dropoffCity,
          onChange: (value: string) => handleInputChange("dropoffCity", value),
        },
        {
          icon: MapPin,
          label: "Dropoff State",
          value: isEditing ? editedLead.dropoffState : leadToShow.dropoffState,
          onChange: (value: string) => handleInputChange("dropoffState", value),
        },
        {
          icon: MapPin,
          label: "Dropoff Address",
          value: isEditing
            ? editedLead.dropOffAddress
            : leadToShow.dropOffAddress,
          onChange: (value: string) =>
            handleInputChange("dropOffAddress", value),
        },
        {
          icon: Plane,
          label: "Dropoff Airport",
          value: isEditing ? (
            <select
              value={editedLead.dropoffAirport || ""}
              onChange={(e) =>
                handleInputChange("dropoffAirport", e.target.value)
              }
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-base text-gray-800 focus:border-indigo-500 focus:outline-none"
            >
              <option value="" disabled hidden>
                Select an airport
              </option>
              {airportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            leadToShow.dropoffAirport || undefined
          ),
          onChange: (value: string) =>
            handleInputChange("dropoffAirport", value),
        },
        {
          icon: Clock,
          label: "Dropoff Departure Time",
          value: isEditing
            ? editedLead.dropOffDepartureTime
            : leadToShow.dropOffDepartureTime,
          onChange: (value: string) =>
            handleInputChange("dropOffDepartureTime", value),
        },
      ],
    },
    {
      title: "Airline Information",
      icon: Plane,
      fields: [
        {
          icon: Plane,
          label: "Airline Name",
          value: isEditing ? editedLead.airlineName : leadToShow.airlineName,
          onChange: (value: string) => handleInputChange("airlineName", value),
        },
        {
          icon: Clock,
          label: "Airline Departure Time",
          value: isEditing
            ? editedLead.airlineDepartureTime
            : leadToShow.airlineDepartureTime,
          onChange: (value: string) =>
            handleInputChange("airlineDepartureTime", value),
        },
        {
          icon: Clock,
          label: "Airline Arrival Time",
          value: isEditing
            ? editedLead.airlineArrivalTime
            : leadToShow.airlineArrivalTime,
          onChange: (value: string) =>
            handleInputChange("airlineArrivalTime", value),
        },
        {
          icon: Plane,
          label: "Dropoff Airline",
          value: isEditing
            ? editedLead.dropoffAirline
            : leadToShow.dropoffAirline,
          onChange: (value: string) =>
            handleInputChange("dropoffAirline", value),
        },
        {
          icon: Plane,
          label: "Flight Number",
          value: isEditing ? editedLead.flightNumber : leadToShow.flightNumber,
          onChange: (value: string) => handleInputChange("flightNumber", value),
        },
        {
          icon: Plane,
          label: "Return Flight Number",
          value: isEditing
            ? editedLead.returnFlightNumber
            : leadToShow.returnFlightNumber,
          onChange: (value: string) =>
            handleInputChange("returnFlightNumber", value),
        },
      ],
    },
    {
      title: "Company Information",
      icon: Building,
      fields: [
        {
          icon: Building,
          label: "Company Name",
          value: leadToShow.companyName,
        },
        { icon: Mail, label: "Company Email", value: leadToShow.companyEmail },
        {
          icon: Phone,
          label: "Company Phone Number",
          value: leadToShow.companyPhoneNumber,
        },
      ],
    },
    {
      title: "Lead Information",
      icon: Tag,
      fields: [
        { icon: Tag, label: "Status", value: leadToShow.status },
        {
          icon: CalendarIcon,
          label: "Lead Received",
          value: leadToShow.leadRecieved
            ? new Date(leadToShow.leadRecieved).toLocaleString()
            : undefined,
        },
        {
          icon: CalendarIcon,
          label: "Replied On",
          value: leadToShow.repliedOn
            ? new Date(leadToShow.repliedOn).toLocaleString()
            : undefined,
        },
        {
          icon: CalendarIcon,
          label: "Paid On",
          value: leadToShow.paidOn
            ? new Date(leadToShow.paidOn).toLocaleString()
            : undefined,
        },
        {
          icon: DollarSign,
          label: "Price Quoted",
          value: currentPrice ? (
            <div className="flex w-[100%] items-center justify-between gap-2">
              <span>{currentPrice || "na"}</span>
              <button
                onClick={() => setIsPriceUpdateModalOpen(true)}
                className="ml-2 rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
              >
                Change Price
              </button>
            </div>
          ) : undefined,
        },
        {
          icon: DollarSign,
          label: "Price Breakdown",
          value: leadToShow.price ? (
            <div className="space-y-1 text-sm">
              {leadToShow?.discount &&
              leadToShow.discount > 0 &&
              leadToShow.price ? (
                <>
                  <div>
                    <span className="line-through">
                      ${leadToShow.price.toFixed(2)}
                    </span>{" "}
                    <span>
                      $
                      {(
                        leadToShow.price *
                        (1 - leadToShow.discount / 100)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div>Discount: {leadToShow.discount}%</div>
                </>
              ) : (
                <div>Base Price: ${leadToShow.price?.toFixed(2) ?? "N/A"}</div>
              )}
              {leadToShow.additionalPayments
                ?.filter((payment) => payment.paymentType === "fixed")
                .map((payment, index) => (
                  <div key={`lead-fixed-${index}`}>
                    {payment.paymentLabel}: ${payment.amount.toFixed(2)}
                  </div>
                ))}
              {leadToShow?.companyPayments
                ?.filter(
                  (payment) =>
                    payment.paymentType === "fixed" &&
                    !payment.isTax &&
                    !payment.isGratuity,
                )
                .map((payment, index) => (
                  <div key={`company-fixed-${index}`}>
                    {payment.paymentLabel}: ${payment.amount.toFixed(2)}
                  </div>
                ))}
              {leadToShow.additionalPayments
                ?.filter((payment) => payment.paymentType === "percentage")
                .map((payment, index) => (
                  <div key={`lead-percentage-${index}`}>
                    {payment.paymentLabel}: $
                    {(
                      (payment.amount / 100) *
                      (leadToShow?.discount &&
                      leadToShow.discount > 0 &&
                      leadToShow.price
                        ? leadToShow.price * (1 - leadToShow.discount / 100)
                        : (leadToShow.price ?? 0))
                    ).toFixed(2)}{" "}
                    ({payment.amount}%)
                  </div>
                ))}
              {leadToShow?.companyPayments
                ?.filter(
                  (payment) =>
                    payment.paymentType === "percentage" &&
                    !payment.isTax &&
                    !payment.isGratuity,
                )
                .map((payment, index) => {
                  const basePrice =
                    leadToShow?.discount &&
                    leadToShow.discount > 0 &&
                    leadToShow.price
                      ? leadToShow.price * (1 - leadToShow.discount / 100)
                      : (leadToShow.price ?? 0);
                  const amount = (payment.amount / 100) * basePrice;
                  return (
                    <div key={`company-percentage-${index}`}>
                      {payment.paymentLabel}: ${amount.toFixed(2)} (
                      {payment.amount}%)
                    </div>
                  );
                })}
              {leadToShow?.companyPayments
                ?.filter((payment) => payment.isTax)
                .map((payment, index) => (
                  <div key={`tax-${index}`}>
                    {payment.paymentLabel}:{" "}
                    {payment.paymentType === "percentage"
                      ? (
                          (payment.amount / 100) *
                          (leadToShow?.discount &&
                          leadToShow.discount > 0 &&
                          leadToShow.price
                            ? leadToShow.price * (1 - leadToShow.discount / 100)
                            : (leadToShow.price ?? 0))
                        ).toFixed(2)
                      : payment.amount.toFixed(2)}
                    {payment.paymentType === "percentage" &&
                      ` (${payment.amount}%)`}
                  </div>
                ))}
              {leadToShow?.companyPayments
                ?.filter((payment) => payment.isGratuity)
                .map((payment, index) => (
                  <div key={`gratuity-${index}`}>
                    {payment.paymentLabel}:{" "}
                    {payment.paymentType === "percentage"
                      ? (
                          (payment.amount / 100) *
                          (leadToShow?.discount &&
                          leadToShow.discount > 0 &&
                          leadToShow.price
                            ? leadToShow.price * (1 - leadToShow.discount / 100)
                            : (leadToShow.price ?? 0))
                        ).toFixed(2)
                      : payment.amount.toFixed(2)}
                    {payment.paymentType === "percentage" &&
                      ` (${payment.amount}%)`}
                  </div>
                ))}
              {leadToShow.tip ? (
                <>
                  {leadToShow.tip > 0 && (
                    <div>Additional Gratuity: ${leadToShow.tip.toFixed(2)}</div>
                  )}
                </>
              ) : null}
              {leadToShow.meetAndGreetPrice && (
                <div>
                  Meet and Greet: $
                  {parseFloat(leadToShow.meetAndGreetPrice).toFixed(2)}
                </div>
              )}

              <div className="mt-2 border-t pt-1 font-semibold">
                Grand Total: $
                {leadToShow.grandTotal
                  ? parseFloat(
                      (
                        parseFloat(leadToShow?.grandTotal ?? "0") +
                        parseFloat(leadToShow?.meetAndGreetPrice ?? "0")
                      ).toString(),
                    ).toFixed(2)
                  : 0}
              </div>
            </div>
          ) : undefined,
        },
        {
          icon: Notebook,
          label: "Send Invoice",
          value:
            currentPrice && leadToShow.status === "paid" ? (
              <div className="flex w-[100%] items-center justify-between gap-2">
                <button
                  onClick={() => handleSendInvoice(leadToShow._id)}
                  className="mt-2 rounded bg-indigo-600 px-2 py-1 text-xs text-white hover:bg-indigo-700"
                >
                  Send Invoice
                </button>
              </div>
            ) : undefined,
        },
      ],
    },
    {
      title: "Linked Lead",
      icon: Link,
      fields:
        linkedLead &&
        (mainLead.serviceType === "Round Trip Not Involving an Airport" ||
          mainLead.serviceType === "Round Trip Involving an Airport")
          ? [
              { icon: Tag, label: "Order ID", value: linkedLead.orderId },
              { icon: User, label: "Name", value: linkedLead.name },
              { icon: Mail, label: "Email", value: linkedLead.email },
              { icon: Phone, label: "Phone", value: linkedLead.phone },
              {
                icon: Calendar,
                label: "Pickup Date",
                value: formatDateForSummary(linkedLead.pickupDate),
              },
              {
                icon: Clock,
                label: "Pickup Time",
                value: linkedLead.pickupTime,
              },
            ]
          : [],
    },
  ];

  interface AdditionalPayment {
    paymentType: "percentage" | "fixed";
    amount: number;
    paymentLabel: string;
  }

  const handleSendInvoice = async (id: string | null) => {
    const response = await sendInvoiceService(id);
    if (response.status === 200) {
      setIsPriceModalOpen(false);
      toast.success("Invoice Sent Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      console.error("Failed to send invoice");
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleSendQuote = async (
    price: number,
    additionalPayment: AdditionalPayment[],
  ) => {
    try {
      const response = await sendManualQuote(
        mainLead._id,
        price,
        additionalPayment,
      );
      if (response.status === 200) {
        console.log("Quote sent successfully");
        setIsPriceModalOpen(false);
        toast.success("Email Sent Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Failed to send quote");
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handlePriceUpdate = async (
    newPrice: number,
    additionalPayments: AdditionalPayment[],
  ) => {
    try {
      const response = await sendUpdatedQuote(
        mainLead._id,
        newPrice,
        additionalPayments,
      );
      if (response.status === 200) {
        setCurrentPrice(newPrice.toString());
        setIsPriceUpdateModalOpen(false);
        toast.success("Price Updated & Email Sent Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Failed to update price");
        toast.error("Failed to update price. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error updating price:", error);
      toast.error("Failed to update price. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedLead(leadToShow);
  };

  const handleSave = async () => {
    try {
      const response = await updateLeadInfo(editedLead, token, mainLead._id);
      if (response.status === 200) {
        setIsEditing(false);
        // Update the mainLead state with the edited values
        Object.assign(mainLead, editedLead);
        toast.success("Lead updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        throw new Error("Failed to update lead");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleInputChange = (key: keyof Leads, value: string) => {
    setEditedLead((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
      <ToastContainer />
      <div className="max-h-[90vh] w-full max-w-6xl transform overflow-y-auto rounded-3xl bg-gradient-to-br from-white to-indigo-50 p-8 shadow-2xl transition-all duration-300 ease-in-out">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-indigo-800">Lead Details</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-indigo-600 transition-colors duration-200 hover:bg-indigo-200 hover:text-indigo-800"
          >
            <XIcon size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between pb-3">
          {(mainLead.serviceType === "Round Trip Not Involving an Airport" ||
            mainLead.serviceType === "Round Trip Involving an Airport") && (
            <span className="flex gap-1 font-semibold text-indigo-600">
              <ArrowRight />{" "}
              {showLinkedLead ? "Showing Linked Trip" : "Showing Current Trip"}
            </span>
          )}

          {(mainLead.serviceType === "Round Trip Not Involving an Airport" ||
            mainLead.serviceType === "Round Trip Involving an Airport") && (
            <button
              onClick={() => setShowLinkedLead(!showLinkedLead)}
              className="rounded-full bg-indigo-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-indigo-700"
              disabled={!linkedLead}
            >
              {showLinkedLead ? "Show Current Trip" : "Show Linked Trip"}
            </button>
          )}
        </div>

        <div className="mb-5 flex justify-start">
          <button
            onClick={() => setIsPriceModalOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Send quote manually
          </button>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="ml-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Edit
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleSave}
              className="ml-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map(
            (section, sectionIndex) =>
              (section.title !== "Linked Lead" ||
                mainLead.serviceType ===
                  "Round Trip Not Involving an Airport" ||
                mainLead.serviceType === "Round Trip Involving an Airport") && (
                <div
                  key={sectionIndex}
                  className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-indigo-700">
                    <section.icon className="mr-2 h-6 w-6 text-indigo-600" />
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.fields.map(
                      (item, index) =>
                        (isEditing || item.value) && (
                          <div
                            key={index}
                            className="flex items-start space-x-3 rounded-lg bg-white bg-opacity-60 p-2"
                          >
                            <item.icon className="mt-1 h-5 w-5 text-indigo-500" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-indigo-600">
                                {item.label}
                              </span>
                              {isEditing &&
                              section.title !== "Company Information" &&
                              section.title !== "Lead Information" ? (
                                item.label === "Service Type" ||
                                item.label === "Pickup Airport" ||
                                item.label === "Dropoff Airport" ? (
                                  item.value
                                ) : (
                                  <input
                                    type="text"
                                    value={
                                      typeof item.value === "string"
                                        ? item.value
                                        : ""
                                    }
                                    onChange={(e) =>
                                      item.onChange?.(e.target.value)
                                    }
                                    className="border-b border-gray-300 bg-transparent text-base text-gray-800 focus:border-indigo-500 focus:outline-none"
                                  />
                                )
                              ) : (
                                <span className="text-base text-gray-800">
                                  {typeof item.value === "string" ||
                                  item.label === "Price Quoted" ||
                                  item.label === "Send Invoice" ||
                                  item.label === "Price Breakdown" ||
                                  typeof item.value === "number"
                                    ? item.value
                                    : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
      <PriceInputModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onSubmit={handleSendQuote}
      />
      <PriceUpdateModal
        isOpen={isPriceUpdateModalOpen}
        onClose={() => setIsPriceUpdateModalOpen(false)}
        onSubmit={handlePriceUpdate}
        currentPrice={Number.parseFloat(leadToShow.price?.toString() || "0")}
        currentAdditionalPayments={leadToShow.additionalPayments}
      />
    </div>
  );
}
