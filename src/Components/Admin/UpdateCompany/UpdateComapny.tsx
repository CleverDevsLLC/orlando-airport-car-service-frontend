"use client";

import { useState, useEffect, useReducer } from "react";
import { PlusIcon, XCircleIcon, Upload } from "lucide-react";
import { getCompanyInfo } from "@/Services/GET";
import Image from "next/image";
import { updateCompany } from "@/Services/PATCH";
import { uploadCloudinary } from "@/Services/POST";
import { Switch } from "@/Components/Common/FormComponents/Switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CompanyUpdate({ companyId }: { companyId: string }) {
  const [token, setToken] = useState<string | null>(null);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

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
    active: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("limo-token");
    setToken(storedToken);

    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyInfo(storedToken, companyId);
        setCompanyData(data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
        setSubmitMessage("Error fetching company data. Please try again.");
      }
    };

    fetchCompanyData();
  }, [companyId, update]);

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

  const handleVehicleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const uploadToCloudinary = await uploadCloudinary({
          image: reader.result as string,
        });
        handleVehicleChange(index, "image", uploadToCloudinary.data.url);
      };
      reader.readAsDataURL(file);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await updateCompany(companyData, token, companyId);
      if (response.status === 200) {
        setSubmitMessage("Company updated successfully!");
      } else {
        setSubmitMessage("Error updating company. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Error updating company. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeStatusChange = async (status: boolean) => {
    const payload = {
      active: !status,
    };
    console.log(payload);
    const response = await updateCompany(payload, token, companyId);
    if (response.status === 200) {
      if (!status === true) {
        toast.success("Account Activated!", {
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
        toast.error("Account Deactivated!", {
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
    } else {
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

    forceUpdate();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="space-y-8 p-6 sm:p-10">
            <div className="flex items-center justify-between">
              <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
                Update Company Details
              </h1>
              <div className="flex flex-col items-center justify-center gap-2">
                <Switch
                  id="roundTrip"
                  checked={companyData.active}
                  onCheckedChange={() => activeStatusChange(companyData.active)}
                />
                <span
                  className={`font-semibold ${companyData.active ? "bg-green-500 text-white" : "bg-red-700 text-white"} rounded-3xl px-[10px] py-[1px] text-[13px]`}
                >
                  {companyData.active ? "Active" : "Deactivated"}
                </span>
              </div>
            </div>

            <div>
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Types of Vehicles
              </h2>
              <div className="space-y-6">
                {companyData.typesOfVehicles.map((vehicle, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <label
                          htmlFor={`vehicleType-${index}`}
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Vehicle Type
                        </label>
                        <input
                          type="text"
                          id={`vehicleType-${index}`}
                          value={vehicle.vehicleType}
                          onChange={(e) =>
                            handleVehicleChange(
                              index,
                              "vehicleType",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Sedan, SUV, Van"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={`passengers-${index}`}
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          No. of Passengers
                        </label>
                        <input
                          type="number"
                          id={`passengers-${index}`}
                          value={vehicle.noOfPassengers}
                          onChange={(e) =>
                            handleVehicleChange(
                              index,
                              "noOfPassengers",
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 4"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={`passengers-${index}`}
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Minimum No of Hours
                        </label>
                        <input
                          type="number"
                          id={`minHours-${index}`}
                          value={vehicle.minimumNoOfHours}
                          onChange={(e) =>
                            handleVehicleChange(
                              index,
                              "minimumNoOfHours",
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 4"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Vehicle Image
                      </label>
                      <div className="flex items-center space-x-4">
                        {vehicle.image && (
                          <div className="relative h-20 w-20">
                            <Image
                              src={vehicle.image}
                              alt={vehicle.vehicleType}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                        )}
                        {vehicle.newImage && (
                          <div className="relative h-20 w-20">
                            <Image
                              src={vehicle.newImage}
                              alt={`New ${vehicle.vehicleType}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <label
                            htmlFor={`file-upload-${index}`}
                            className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {vehicle.newImage ? "Change Image" : "Upload Image"}
                          </label>
                          <input
                            id={`file-upload-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleVehicleImageChange(index, e)}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVehicleType(index)}
                      className="mt-4 text-sm text-red-600 transition duration-150 ease-in-out hover:text-red-800 focus:underline focus:outline-none"
                    >
                      Remove Vehicle Type
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addVehicleType}
                className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition duration-150 ease-in-out hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Vehicle Type
              </button>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Service Areas
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    States
                  </h3>
                  {companyData.states.map((state, index) => (
                    <div
                      key={index}
                      className="mb-2 flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={state}
                        onChange={(e) =>
                          handleArrayInputChange(e, index, "states")
                        }
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., California"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "states")}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("states")}
                    className="mt-2 text-sm text-blue-600 transition duration-150 ease-in-out hover:text-blue-800 focus:underline focus:outline-none"
                  >
                    Add State
                  </button>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Airports
                  </h3>
                  {companyData.airports.map((airport, index) => (
                    <div
                      key={index}
                      className="mb-2 flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={airport}
                        onChange={(e) =>
                          handleArrayInputChange(e, index, "airports")
                        }
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., LAX"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "airports")}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("airports")}
                    className="mt-2 text-sm text-blue-600 transition duration-150 ease-in-out hover:text-blue-800 focus:underline focus:outline-none"
                  >
                    Add Airport
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {submitMessage && (
            <div
              className={`p-4 ${submitMessage.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
            >
              {submitMessage}
            </div>
          )}

          <div className="flex justify-end space-x-4 bg-gray-50 px-6 py-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isSubmitting ? "Updating..." : "Update Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
