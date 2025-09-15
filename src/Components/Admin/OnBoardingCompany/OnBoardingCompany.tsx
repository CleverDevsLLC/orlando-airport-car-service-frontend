"use client";

import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { addNewCompany } from "@/Services/POST";
import { useRouter } from "next/navigation";

export default function CompanyOnboarding() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("limo-token"));
  }, []);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("limo-token") : null;
    if (!token) {
      router.push("/admin/login");
    }
    const acc_status =
      typeof window !== "undefined" ? localStorage.getItem("acc_status") : null;
    if (acc_status !== "admin") {
      router.push("/admin/login");
    }
  }, [router]);

  const [companyData, setCompanyData] = useState({
    companyName: "",
    typesOfVehicles: [
      {
        vehicleType: "",
        image: "",
        newImage: "",
        noOfPassengers: 0,
        minimumNoOfHours: 0,
      },
    ],
    states: [""],
    airports: [""],
    minimumHours: 0,
    maxHours: 0,
    email: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedVehicles = [...companyData.typesOfVehicles];
    updatedVehicles[index] = { ...updatedVehicles[index], [field]: value };
    setCompanyData((prev) => ({ ...prev, typesOfVehicles: updatedVehicles }));
  };

  const addVehicleType = () => {
    setCompanyData((prev) => ({
      ...prev,
      typesOfVehicles: [
        ...prev.typesOfVehicles,
        {
          vehicleType: "",
          image: "",
          newImage: "",
          noOfPassengers: 0,
          minimumNoOfHours: 0,
        },
      ],
    }));
  };

  const removeVehicleType = (index: number) => {
    setCompanyData((prev) => ({
      ...prev,
      typesOfVehicles: prev.typesOfVehicles.filter((_, i) => i !== index),
    }));
  };

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "states" | "airports",
  ) => {
    const updatedArray = [...companyData[field]];
    updatedArray[index] = e.target.value;
    setCompanyData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayField = (field: "states" | "airports") => {
    setCompanyData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (index: number, field: "states" | "airports") => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleCancel = () => {
    router.push("/admin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await addNewCompany(companyData, token);
      if (response.status === 201) {
        setSubmitMessage("Company onboarded successfully!");
        setCompanyData({
          companyName: "",
          typesOfVehicles: [
            {
              vehicleType: "",
              image: "",
              newImage: "",
              noOfPassengers: 0,
              minimumNoOfHours: 0,
            },
          ],
          states: [""],
          airports: [""],
          minimumHours: 0,
          maxHours: 0,
          email: "",
          phoneNumber: "",
        });
      } else {
        setSubmitMessage("Error onboarding company. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Error onboarding company. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl">
          Onboard New Company
        </h1>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-4 shadow-md sm:p-8"
        >
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="companyName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyData.companyName}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Types of Vehicles
            </label>
            {companyData.typesOfVehicles.map((vehicle, index) => (
              <div
                key={index}
                className="mb-4 flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
              >
                <input
                  type="text"
                  placeholder="Vehicle Type"
                  value={vehicle.vehicleType}
                  onChange={(e) =>
                    handleVehicleChange(index, "vehicleType", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/3"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={vehicle.image}
                  onChange={(e) =>
                    handleVehicleChange(index, "image", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/3"
                />
                <input
                  type="number"
                  placeholder="No. of Passengers"
                  value={vehicle.noOfPassengers}
                  onChange={(e) =>
                    handleVehicleChange(
                      index,
                      "noOfPassengers",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/4"
                />

                <input
                  type="number"
                  placeholder="Minimum No of Hours"
                  value={vehicle.minimumNoOfHours}
                  onChange={(e) =>
                    handleVehicleChange(
                      index,
                      "minimumNoOfHours",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/4"
                />

                <button
                  type="button"
                  onClick={() => removeVehicleType(index)}
                  className="mt-2 rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 focus:outline-none sm:mt-0"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVehicleType}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <PlusIcon className="mr-1 h-4 w-4" /> Add Vehicle Type
            </button>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              States
            </label>
            {companyData.states.map((state, index) => (
              <div key={index} className="mb-2 flex items-center space-x-4">
                <input
                  type="text"
                  value={state}
                  onChange={(e) => handleArrayInputChange(e, index, "states")}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "states")}
                  className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 focus:outline-none"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("states")}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <PlusIcon className="mr-1 h-4 w-4" /> Add State
            </button>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Airports
            </label>
            {companyData.airports.map((airport, index) => (
              <div key={index} className="mb-2 flex items-center space-x-4">
                <input
                  type="text"
                  value={airport}
                  onChange={(e) => handleArrayInputChange(e, index, "airports")}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "airports")}
                  className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 focus:outline-none"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("airports")}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <PlusIcon className="mr-1 h-4 w-4" /> Add Airport
            </button>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-6 sm:grid-cols-2 sm:gap-6">
            <div>
              <label
                htmlFor="minimumHours"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Minimum Hours
              </label>
              <input
                type="number"
                id="minimumHours"
                name="minimumHours"
                value={companyData.minimumHours}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="maxHours"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Maximum Hours
              </label>
              <input
                type="number"
                id="maxHours"
                name="maxHours"
                value={companyData.maxHours}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-6 sm:grid-cols-2 sm:gap-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={companyData.email}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={companyData.phoneNumber}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {submitMessage && (
            <div
              className={`mb-4 p-2 ${submitMessage.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} rounded`}
            >
              {submitMessage}
            </div>
          )}

          <div className="mt-6 sm:mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md bg-black px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isSubmitting ? "Onboarding..." : "Onboard Company"}
            </button>
          </div>
          <div className="mt-2 sm:mt-8">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCancel}
              className={`w-full rounded-md bg-red-800 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
