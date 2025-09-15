"use client";

import { useState, useEffect } from "react";
import type { Leads, SortConfig } from "@/Types";
import LeadDetailsModal from "./CompanyLeadDetails";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/Components/Common/FormComponents/Input";
import { generateInvoicePDF } from "@/Utils/generateInvoice";
import { Button } from "@/Components/Common/FormComponents/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Common/FormComponents/Select";
import { changeLeadStatus } from "@/Services/PATCH";
import { formatDateForSummary } from "@/Utils";
import PaymentMethodModal from "./PaymentMethodModal";

interface LeadsTableProps {
  leads: Leads[];
}

export default function CompanyLeadsTable({
  leads: initialLeads,
}: LeadsTableProps) {
  const [leads, setLeads] = useState<Leads[]>(initialLeads);
  const [paymentMethodModel, setPaymentMethodModel] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "pickupDate",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<{
    mainLead: Leads;
    linkedLead: Leads | null | undefined;
    status?: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "unpaid" | "paid" | "new" | string
  >("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  let dateError = false;

  const itemsPerPage = 10;

  const parseDateTime = (date?: string, time?: string) => {
    if (!date || !time) return null;
    const [hours, minutes] = time.slice(0, -3).split(":").map(Number);
    const isPM = time.slice(-2).toLowerCase() === "pm";
    let adjustedHours = hours;
    if (isPM && hours !== 12) {
      adjustedHours += 12;
    } else if (!isPM && hours === 12) {
      adjustedHours = 0;
    }
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day, adjustedHours, minutes);
  };

  const filterByDate = (lead: Leads): boolean => {
    if (!lead.pickupDate || !lead.pickupTime) return true;

    if (startDate !== "" && endDate !== "") {
      if (startDate > endDate) {
        console.log("Invalid date");
        dateError = true;
        return true;
      }
    }

    dateError = false;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const thisWeekEnd = new Date(today);
    thisWeekEnd.setDate(today.getDate() + (7 - today.getDay()));
    const nextWeekEnd = new Date(today);
    nextWeekEnd.setDate(today.getDate() + (14 - today.getDay()));
    const thisMonthEnd = new Date(today);
    thisMonthEnd.setMonth(today.getMonth() + 1, 0);

    const pickupDateTime = parseDateTime(lead.pickupDate, lead.pickupTime);

    if (!pickupDateTime) return true; // If parsing fails, include the lead

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set to end of day
      return pickupDateTime >= start && pickupDateTime <= end;
    }

    switch (dateFilter) {
      case "all":
        return true;
      case "today":
        return (
          pickupDateTime.getFullYear() === today.getFullYear() &&
          pickupDateTime.getMonth() === today.getMonth() &&
          pickupDateTime.getDate() === today.getDate()
        );
      case "tomorrow":
        return (
          pickupDateTime.getFullYear() === tomorrow.getFullYear() &&
          pickupDateTime.getMonth() === tomorrow.getMonth() &&
          pickupDateTime.getDate() === tomorrow.getDate()
        );
      case "this-week":
        return pickupDateTime >= today && pickupDateTime <= thisWeekEnd;
      case "next-week":
        return pickupDateTime > thisWeekEnd && pickupDateTime <= nextWeekEnd;
      case "this-month":
        return pickupDateTime >= today && pickupDateTime <= thisMonthEnd;
      case "new-leads":
        return true;
      default:
        return true;
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (dateFilter === "new-leads") {
      return (
        new Date(b.leadRecieved).getTime() - new Date(a.leadRecieved).getTime()
      );
    }

    const now = new Date();
    const dateTimeA = parseDateTime(a.pickupDate, a.pickupTime);
    const dateTimeB = parseDateTime(b.pickupDate, b.pickupTime);

    if (!dateTimeA && !dateTimeB) return 0;
    if (!dateTimeA) return 1;
    if (!dateTimeB) return -1;

    const isExpiredA = dateTimeA < now;
    const isExpiredB = dateTimeB < now;
    const isDeclinedA = a.status === "declined";
    const isDeclinedB = b.status === "declined";

    if (isDeclinedA && isDeclinedB) {
      return dateTimeB.getTime() - dateTimeA.getTime(); // Most recent declined first
    } else if (isDeclinedA) {
      return 1; // Declined orders go to the bottom
    } else if (isDeclinedB) {
      return -1; // Declined orders go to the bottom
    } else if (isExpiredA && isExpiredB) {
      return dateTimeB.getTime() - dateTimeA.getTime(); // Most recent expired first
    } else if (!isExpiredA && !isExpiredB) {
      return dateTimeA.getTime() - dateTimeB.getTime(); // Closest future date first
    } else {
      return isExpiredA ? 1 : -1; // Future dates before expired dates
    }
  });

  const filteredLeads = sortedLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.orderId?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    const isWithinDateRange = filterByDate(lead);

    return matchesSearch && matchesStatus && isWithinDateRange;
  });

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const handleSort = (key: keyof Leads) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleDownloadInvoice = (lead: Leads) => {
    generateInvoicePDF(lead);
  };

  const findLinkedLead = (currentLead: Leads) => {
    if (currentLead.linked && currentLead.linkedOrderId) {
      return leads.find((lead) => lead.orderId === currentLead.linkedOrderId);
    } else if (currentLead.serviceType.toLowerCase().includes("round trip")) {
      return leads.find((lead) => lead.linkedOrderId === currentLead.orderId);
    }
    return null;
  };

  const handleLeadSelect = (lead: Leads) => {
    const linkedLead = findLinkedLead(lead);
    setSelectedLead({ mainLead: lead, linkedLead });
  };

  const leadStatusUpdate = async (
    leadId: string,
    newStatus: "priced" | "refunded" | "paid" | "new" | "declined",
  ) => {
    try {
      const response = await changeLeadStatus(leadId, newStatus);
      if (response.status === 200) {
        const updatedLeads = leads.map((lead) =>
          lead._id === leadId ? { ...lead, status: newStatus } : lead,
        );
        setLeads(updatedLeads);
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleStatusChange = async (
    leadId: string,
    newStatus: "priced" | "refunded" | "paid" | "new" | "declined",
  ) => {
    const lead = paginatedLeads.find((lead) => lead._id === leadId);
    if (lead && lead.status === "priced" && newStatus === "paid") {
      const linkedLead = findLinkedLead(lead);
      setSelectedLead({ mainLead: lead, linkedLead, status: newStatus });
      setPaymentMethodModel(true);
      return;
    }
    await leadStatusUpdate(leadId, newStatus);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, startDate, endDate]);

  return (
    <div className="space-y-6 rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-2xl sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative w-full sm:w-64 md:w-72 lg:w-96">
            <Input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border-2 border-indigo-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg focus:border-indigo-500 focus:outline-none sm:text-base"
            />
            <Search
              className="absolute left-3 top-2.5 text-indigo-400 sm:top-3"
              size={18}
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full rounded-full border-2 border-indigo-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg focus:border-indigo-500 focus:outline-none sm:text-base">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
            <Filter
              className="absolute left-3 top-2.5 text-indigo-400 sm:top-3"
              size={18}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="startDate"
              className="text-sm font-medium text-gray-700"
            >
              Pickup Date From
            </label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setDateFilter("custom");
              }}
              className="rounded-full border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg focus:border-indigo-500 focus:outline-none sm:text-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-700"
            >
              Pickup Date To
            </label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setDateFilter("custom");
              }}
              className="rounded-full border-2 border-indigo-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg focus:border-indigo-500 focus:outline-none sm:text-base"
            />
          </div>
        </div>
      </div>

      {dateError ? (
        <>
          <div className="m-auto flex w-[90%] items-center justify-center gap-3 rounded-md bg-red-600 p-5 text-[17px] text-white shadow-xl">
            <AlertCircle className="w-[50px]" />
            <p>
              The start date cannot be after the end date. Please adjust your
              date range to ensure the start date is before or equal to the end
              date.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {[
                { key: "all", label: "All" },
                { key: "today", label: "Today" },
                { key: "tomorrow", label: "Tomorrow" },
                { key: "this-week", label: "This Week" },
                { key: "next-week", label: "Next Week" },
                { key: "this-month", label: "This Month" },
                { key: "new-leads", label: "New Leads" },
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  size="sm"
                  variant={dateFilter === key ? "default" : "outline"}
                  onClick={() => {
                    setDateFilter(key);
                    const today = new Date();
                    const yesterdayDate = new Date();
                    yesterdayDate.setDate(today.getDate() + 1);
                    switch (key) {
                      case "today":
                        setStartDate(today.toISOString().split("T")[0]);
                        setEndDate(yesterdayDate.toISOString().split("T")[0]);
                        break;
                      case "tomorrow":
                        const tomorrow = new Date(today);
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        const currentDate = new Date(tomorrow);
                        currentDate.setDate(tomorrow.getDate() + 1);

                        setStartDate(tomorrow.toISOString().split("T")[0]);
                        setEndDate(currentDate.toISOString().split("T")[0]);
                        break;
                      case "this-week":
                        const startOfWeek = new Date(today);
                        startOfWeek.setDate(today.getDate() - today.getDay());
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(endOfWeek.getDate() + 6);
                        setStartDate(startOfWeek.toISOString().split("T")[0]);
                        setEndDate(endOfWeek.toISOString().split("T")[0]);
                        break;
                      case "next-week":
                        const startOfNextWeek = new Date(today);
                        startOfNextWeek.setDate(
                          today.getDate() - today.getDay() + 7,
                        );
                        const endOfNextWeek = new Date(startOfNextWeek);
                        endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);
                        setStartDate(
                          startOfNextWeek.toISOString().split("T")[0],
                        );
                        setEndDate(endOfNextWeek.toISOString().split("T")[0]);
                        break;
                      case "this-month":
                        const startOfMonth = new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          1,
                        );
                        const endOfMonth = new Date(
                          today.getFullYear(),
                          today.getMonth() + 1,
                          0,
                        );
                        setStartDate(startOfMonth.toISOString().split("T")[0]);
                        setEndDate(endOfMonth.toISOString().split("T")[0]);
                        break;
                      case "new-leads":
                        setStartDate("");
                        setEndDate("");
                        break;
                      default:
                        setStartDate("");
                        setEndDate("");
                    }
                  }}
                  className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm ${
                    dateFilter === key
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-600 hover:bg-indigo-100"
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateFilter("all");
                setStartDate("");
                setEndDate("");
              }}
              className="ml-auto"
            >
              <RotateCcw size={14} className="mr-2" />
              Reset Filters
            </Button>
          </div>
          <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "Pickup Date",
                    "Lead Received",
                    "Status",
                    "Company",
                    "Action",
                    "Invoice",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white sm:px-4 md:px-6"
                    >
                      <button
                        onClick={() =>
                          handleSort(
                            header
                              .toLowerCase()
                              .replace(" ", "") as keyof Leads,
                          )
                        }
                        className="flex items-center space-x-1 transition-colors duration-200 hover:text-indigo-200"
                      >
                        <span>{header}</span>
                        {sortConfig.key ===
                          header.toLowerCase().replace(" ", "") &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          ))}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedLeads.map((lead, index) => {
                  const now = new Date();
                  const pickupDateTime = parseDateTime(
                    lead.pickupDate,
                    lead.pickupTime,
                  );

                  let isExpired = false;
                  const displayDate = lead.pickupDate;
                  const displayTime = lead.pickupTime;

                  if (pickupDateTime) {
                    isExpired = pickupDateTime < now;
                  }

                  return (
                    <tr
                      key={lead._id}
                      className={`${
                        index % 2 === 0 ? "bg-indigo-50" : "bg-white"
                      } transition-colors duration-150 ease-in-out hover:bg-indigo-100 ${
                        isExpired || lead.status === "declined"
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-2 py-2 text-xs font-medium text-gray-900 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        <div className="flex flex-col">
                          {!lead.linked && (
                            <span className="mb-1 text-xs font-semibold text-gray-600">
                              Order #{lead.orderId}
                            </span>
                          )}

                          {lead.linked && (
                            <span className="mb-1 w-[fit-content] rounded-lg bg-indigo-600 px-2 text-xs font-semibold text-white">
                              Linked with #{lead.linkedOrderId}
                            </span>
                          )}
                          {lead.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {lead.email}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {lead.phone}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {formatDateForSummary(displayDate)} {displayTime}
                        {isExpired && (
                          <span className="ml-2 text-xs font-semibold text-red-600">
                            (Expired)
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {new Date(lead.leadRecieved).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                        <Select
                          value={lead.status}
                          onValueChange={(
                            newStatus:
                              | "paid"
                              | "new"
                              | "refunded"
                              | "priced"
                              | "declined",
                          ) => handleStatusChange(lead._id, newStatus)}
                        >
                          <SelectTrigger
                            className={`w-[100px] font-semibold ${
                              lead.status === "unpaid"
                                ? "text-orange-400"
                                : lead.status === "paid"
                                  ? "text-[#44895F]"
                                  : lead.status === "refunded" ||
                                      lead.status === "declined"
                                    ? "text-red-600"
                                    : lead.status === "new"
                                      ? "text-blue-600"
                                      : "text-orange-400"
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="priced">Priced</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {lead.companyName}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs font-medium sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        <button
                          onClick={() => handleLeadSelect(lead)}
                          className="font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs font-medium sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {lead.status === "paid" && lead.price && (
                          <button
                            onClick={() => handleDownloadInvoice(lead)}
                            className="flex items-center font-semibold text-green-600 transition-colors duration-200 hover:text-green-900"
                          >
                            <Download size={14} className="mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Invoice</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="text-xs font-medium text-gray-700 sm:text-sm">
              Showing{" "}
              {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of{" "}
              {filteredLeads.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </Button>
              <span className="text-xs font-medium text-gray-700 sm:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}

      {!paymentMethodModel && selectedLead && (
        <LeadDetailsModal
          mainLead={selectedLead.mainLead}
          linkedLead={selectedLead.linkedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
      {paymentMethodModel && selectedLead && (
        <PaymentMethodModal
          mainLead={selectedLead.mainLead}
          linkedLead={selectedLead.linkedLead}
          onClose={() => {
            setPaymentMethodModel(false);
            setSelectedLead(null);
          }}
          onOk={async () => {
            await leadStatusUpdate(
              selectedLead.mainLead._id,
              selectedLead.status as
                | "priced"
                | "refunded"
                | "paid"
                | "new"
                | "declined",
            );
            setPaymentMethodModel(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
}
