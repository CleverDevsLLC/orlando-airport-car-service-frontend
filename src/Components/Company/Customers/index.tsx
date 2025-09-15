"use client";

import React, { useState, useEffect } from "react";
import type { ICustomers, Leads, SortConfig } from "@/Types";
import {
  // ChevronDown,
  // ChevronUp,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/Components/Common/FormComponents/Input";
import { Button } from "@/Components/Common/FormComponents/Button";
import { getCustomers } from "@/Services/GET";
import { useDebounce } from "@/hooks/debounce";
import Link from "next/link";
import { ThreeDotMenu } from "@/Components/ui";

const itemsPerPage = 10;
export const Customers = () => {
  const [query, setQuery] = React.useState("");
  const { debouncedValue } = useDebounce({
    value: query,
    delay: 1000,
  });
  const [, setSortConfig] = useState<SortConfig>({
    key: "pickupDate",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = React.useState<{
    data: ICustomers[];
    totalPages: number;
    currentPage: number;
    totalRecords: number;
  }>({
    data: [],
    totalPages: 0,
    currentPage: 0,
    totalRecords: 0,
  });
  const dateError = false;

  const handleSort = (key: keyof Leads) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("limo-token");
    console.log({ token });
    getCustomers(String(token ?? ""), {
      query: debouncedValue,
      page: currentPage,
      limit: itemsPerPage,
    })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, debouncedValue]);

  return (
    <div className="space-y-6 rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-2xl sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative w-full sm:w-64 md:w-72 lg:w-96">
            <Input
              type="text"
              placeholder="Search customers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border-2 border-indigo-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg focus:border-indigo-500 focus:outline-none sm:text-base"
            />
            <Search
              className="absolute left-3 top-2.5 text-indigo-400 sm:top-3"
              size={18}
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
          <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  {["Name", "Email", "Phone", "No of Leads", "Action"].map(
                    (header, index) => (
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
                          {/* {sortConfig.key ===
                          header.toLowerCase().replace(" ", "") &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          ))} */}
                        </button>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.data.map((customer, index) => {
                  return (
                    <tr
                      key={customer._id}
                      className={`${
                        index % 2 === 0 ? "bg-indigo-50" : "bg-white"
                      } transition-colors duration-150 ease-in-out hover:bg-indigo-100`}
                    >
                      <td className="whitespace-nowrap px-2 py-2 text-xs font-medium text-gray-900 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        <div className="flex flex-col">{customer.name}</div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {customer.phoneNumber}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        {customer.leads.length}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs font-medium sm:px-4 sm:py-3 sm:text-sm md:px-6 md:py-4">
                        <ThreeDotMenu>
                          <Link
                            href={`/company/allbookings/${customer._id}`}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            Trip History
                          </Link>
                          <Link
                            href={`/add-lead/${customer._id}`}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            Create New Order
                          </Link>
                        </ThreeDotMenu>
                        <div className="flex flex-col gap-2"></div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="text-xs font-medium text-gray-700 sm:text-sm">
              Showing {Math.min(itemsPerPage * currentPage, data.totalRecords)}{" "}
              of {data.totalRecords} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </Button>
              <span className="text-xs font-medium text-gray-700 sm:text-sm">
                Page {currentPage} of{" "}
                {Math.ceil(data.totalRecords / itemsPerPage)}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={
                  currentPage === Math.ceil(data.totalRecords / itemsPerPage)
                }
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
