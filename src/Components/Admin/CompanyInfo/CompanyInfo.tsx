"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/Common/FormComponents/Card";
import { MapPin, Plane, Mail, Phone, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { CompaniesForAllCompaniesType } from "@/Types";
import Image from "next/image";
import { getCompanyInfo } from "@/Services/GET";

export default function CompanyDetails({ companyId }: {companyId: string}) {
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [company, setCompany] = useState<CompaniesForAllCompaniesType>({
    companyName: "",
    typesOfVehicles: [{ vehicleType: "", image: "", noOfPassengers: 0 }],
    states: [""],
    airports: [""],
    minimumHours: 0,
    maxHours: 0,
    email: "",
    phoneNumber: "",
    id: 0,
  });

  useEffect(() => {
    setToken(localStorage.getItem("limo-token"));
  }, []);

  const companyInfo = async () => {
    if (!token) return;
    const response = await getCompanyInfo(token, companyId);
    if (response.status === 200) {
      setCompany(response.data);
    }
  };

  useEffect(() => {
    if (token) {
      companyInfo();
    }
  }, [token, companyId]);

  const nextVehicle = () => {
    setCurrentVehicleIndex(
      (prevIndex) => (prevIndex + 1) % company.typesOfVehicles.length,
    );
  };

  const prevVehicle = () => {
    setCurrentVehicleIndex(
      (prevIndex) =>
        (prevIndex - 1 + company.typesOfVehicles.length) %
        company.typesOfVehicles.length,
    );
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card className="overflow-hidden rounded-2xl bg-white shadow-xl">
        <CardContent className="p-0">
          <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">
                {company.companyName}
              </h1>
            </div>
          </div>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Company Information
                </h2>
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{company.states?.join(", ")}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Plane className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{company.airports?.join(", ")}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{company.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="mr-2 h-5 w-5 text-blue-500" />
                  <span>{company.phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  <span>
                    Min {company.minimumHours}h - Max {company.maxHours}h
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Quick View
                </h2>
                <div className="relative rounded-xl bg-gray-100 p-4">
                  {company.typesOfVehicles?.length > 0 && (
                    <>
                      <div className="relative mb-4 h-48">
                        <Image
                          src={
                            company.typesOfVehicles[currentVehicleIndex].image
                          }
                          alt={
                            company.typesOfVehicles[currentVehicleIndex]
                              .vehicleType
                          }
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {
                              company.typesOfVehicles[currentVehicleIndex]
                                .vehicleType
                            }
                          </h3>
                          <p className="flex items-center text-gray-600">
                            <Users className="mr-1 h-4 w-4" />
                            {
                              company.typesOfVehicles[currentVehicleIndex]
                                .noOfPassengers
                            }{" "}
                            passengers
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={prevVehicle}
                            className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
                          >
                            <ChevronLeft className="h-6 w-6 text-gray-600" />
                          </button>
                          <button
                            onClick={nextVehicle}
                            className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
                          >
                            <ChevronRight className="h-6 w-6 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                All Vehicles
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {company.typesOfVehicles?.map((vehicle, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-100 p-3 transition-shadow hover:shadow-md"
                  >
                    <div className="relative mb-2 h-24">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.vehicleType}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <h3 className="truncate font-medium text-gray-800">
                      {vehicle.vehicleType}
                    </h3>
                    <p className="flex items-center text-sm text-gray-600">
                      <Users className="mr-1 h-3 w-3" />
                      {vehicle.noOfPassengers}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

