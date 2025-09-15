"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Common/FormComponents/Card";
import {
  companyDataType,
  FormData,
  ICustomers,
  initialFormData,
  ServiceType,
  Vehicle,
} from "@/Types";
import { Step1 } from "./ReservationFormSteps/Step1";
import { Step2 } from "./ReservationFormSteps/Step2";
import { Step3 } from "./ReservationFormSteps/Step3";
import axios from "axios";
import { API, DISCOUNTS } from "@/Config/Config";
import { FileWarningIcon } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThankYouPage } from "./ReservationFormSteps/FinalStep";
import { IAdditionalPayment } from "../Common/AdditionalCharges";

type VehicleDataType = {
  _id: string;
  vehicleType: string;
  noOfPassengers: number;
  description: string;
  image: string;
  minimumNoOfHours?: number;
};

export default function ReservationForm({
  serviceType,
  customer,
}: {
  serviceType?: ServiceType;
  customer?: ICustomers;
}) {
  console.log({ customer });
  const [price, setPrice] = useState("");
  const [additionalPayments, setAdditionalPayments] = useState<
    IAdditionalPayment[]
  >([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [airport, setAirports] = useState([]);
  const [states, setStates] = useState([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState(false);
  const [finalData, setFinalData] = useState<FormData>(initialFormData);
  const [completedForm, setCompletedForm] = useState(false);
  const discount = DISCOUNTS[API.companyId] || 10;
  const [loader, setLoader] = useState(false);

  console.log(errors);

  const [companyData, setCompanyData] = useState<companyDataType>({
    email: "",
    companyName: "",
    phoneNumber: "",
  });

  const [formError, setFormError] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const formRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const convertTo12hrs = (time: string) => {
    if (time !== "") {
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      return `${hour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    } else {
      return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const payload = {
      serviceType: formData.serviceType,
      roundTripFirstLeg: formData.roundTripFirstLeg,
      pickupCity: formData.pickupCity,
      pickupState: formData.pickupState,
      dropoffAirport: formData.dropoffAirport,
      dropoffCity: formData.dropoffCity,
      dropoffState: formData.dropoffState,
      pickupAirport: formData.pickupAirport,
      tripDuration: formData.tripDuration,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      pickupDate: formData.pickupDate,
      pickupTime: convertTo12hrs(formData.pickupTime),
      pickupAddress: formData.pickupAddress,
      airlineName: formData.airlineName,
      airlineDepartureTime: convertTo12hrs(formData.airlineDepartureTime),
      airlineArrivalTime: convertTo12hrs(formData.airlineArrivalTime),
      extraStops: formData.extraStops,
      numberOfPassengers: formData.numberOfPassengers,
      passengerNames: formData.passengerNames,
      vehicleType: formData.vehicleType,
      returnDate: formData.returnDate,
      returnTime: convertTo12hrs(formData.returnTime),
      returnPickupAddress: formData.returnPickupAddress,
      returnDropoffAddress: formData.returnDropoffAddress,
      tripPurpose: formData.tripPurpose,
      additionalNotes: formData.additionalNotes,
      dropOffAddress: formData.dropOffAddress,
      returnDepartureTime: convertTo12hrs(formData.returnDepartureTime),
      dropOffDepartureTime: convertTo12hrs(formData.dropOffDepartureTime),
      returnDropoffAirport: formData.returnDropoffAirport,
      dropoffAirline: formData.dropoffAirline,
      returnAirline: formData.returnAirline,
      itinerary: formData.itinerary,
      companyId: API.companyId,
      companyName: companyData.companyName,
      companyEmail: companyData.email,
      companyPhoneNumber: companyData.phoneNumber,
      leadRecieved: new Date(),
      flightNumber: formData.flightNumber,
      returnFlightNumber: formData.returnFlightNumber,
      returnPickupAirport: formData.returnPickupAirport,
      price,
      additionalPayments,
      // meetAndGreetPrice: formData?.meetAndGreetPrice,
    };
    axios
      .post(`${API.uri}/leads`, payload)
      .then((res) => {
        setFinalData(res.data);
        setCompletedForm(true);
        setFormData({
          ...initialFormData,
          pickupState: formData.pickupState,
          dropoffState: formData?.dropoffState,
        });
        setFormError(false);
        if (customer) {
          if (linkRef.current) {
            linkRef.current.href = `https://test-payment-nine.vercel.app/paymentcompany?id=${res.data?._id}&companyId=${API.companyId}`;
            console.log("linkRef");
            linkRef.current.click();
            // window.open(
            //   `https://test-payment-nine.vercel.app/paymentcompany?id=${res.data?._id}&companyId=${API.companyId}`,
            //   "_blank",
            // );
          }
          // setTimeout(() => {
          //   router.push("/company/customers");
          // }, 3500);
        }
      })
      .catch((e) => {
        console.log(e);
        setFormError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const renderProgressBar = () => {
    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    return (
      <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full bg-[#2563EB] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFormInfo = () => {
    axios
      .get(`${API.uri}/form/company/${API.companyId}`)
      .then((res) => {
        console.error("HERE");
        if (res.data.defaultState) {
          handleSelectChange("pickupState", res.data.defaultState);
          handleSelectChange("dropoffState", res.data.defaultState);
        }

        const vehicleData = res.data.typesOfVehicles.map(
          (item: VehicleDataType) => {
            return {
              id: item._id,
              name: item.vehicleType,
              passengers: item.noOfPassengers,
              description: `Ideal for group transportation, accommodating up to ${item.noOfPassengers} passengers.`,
              image: item.image,
              minimumNoOfHours: item.minimumNoOfHours,
            };
          },
        );
        setVehicles([...vehicleData]);
        setAirports(res.data.airports);
        setStates(res.data.states);
        setCompanyData(res.data);
        setError(false);
      })
      .catch((e) => {
        console.log(e.response.status);
        if (e.response.status === 416) {
          setError(true);
        }
      });
  };

  useEffect(() => {
    getFormInfo();
    if (customer) {
      console.log("if", customer);

      setFormData((prev) => ({
        ...prev,
        name: customer?.name,
        email: customer?.email,
        phone: customer?.phoneNumber,
      }));
    }
  }, [customer]);

  // useEffect(() => {
  //   if (
  //     companyData.meetAndGreetPrice &&
  //     formData?.serviceType?.toLowerCase().includes("from the airport")
  //   ) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       meetAndGreetPrice: companyData.meetAndGreetPrice,
  //     }));
  //   }
  // }, [companyData.meetAndGreetPrice, formData?.serviceType]);

  useEffect(() => {
    function sendHeight() {
      const height = document.body.scrollHeight;
      window.parent.postMessage(height, "*");
    }

    // Send height on mount
    sendHeight();

    // Send height when window is resized
    window.addEventListener("resize", sendHeight);

    // Send height when form data changes
    if (airport.length > 0 && states.length > 0 && vehicles.length > 0) {
      sendHeight();
    }

    if (Object.keys(errors).length > 0) {
      sendHeight();
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", sendHeight);
    };
  }, [airport, states, vehicles, step]);

  useEffect(() => {
    if (!isInitialRender && formRef.current) {
      const yOffset = -200; // 200px above the element
      const y =
        formRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      setIsInitialRender(false);
    }
  }, [step, isInitialRender]);
  console.log({ formData });

  return (
    <>
      <ToastContainer />
      <a
        href={"#"}
        target="_blank"
        // rel="noopener noreferrer"
        ref={linkRef}
        hidden
      >
        Open Link
      </a>

      <Card
        className={`mx-auto w-full ${formData.serviceType === "Hourly Trip" ? "hourly-media" : ""}`}
        id="myForm"
        ref={formRef}
      >
        {formError && (
          <CardHeader className="bg-red-500">
            <CardTitle className="text-white">Something went wrong!</CardTitle>
          </CardHeader>
        )}

        <CardHeader>
          <CardTitle>  Get {discount}% Off Online Quotes</CardTitle>
        </CardHeader>
        {!error ? (
          <>
            <CardContent>
              {renderProgressBar()}
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <Step1
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    setStep={setStep}
                    airports={airport}
                    states={states}
                    serviceType={serviceType}
                  />
                )}
                {step === 2 && (
                  <>
                    <Step2
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleSelectChange={handleSelectChange}
                      setStep={setStep}
                      airports={airport}
                      states={states}
                      vehicles={vehicles}
                      customer={customer}
                      additionalPayments={additionalPayments}
                      setAdditionalPayments={setAdditionalPayments}
                      price={price}
                      setPrice={setPrice}
                      onDone={() => {
                        setFormData((prev) => ({
                          ...prev,
                          price,
                          additionalPayments,
                        }));
                      }}
                    />
                  </>
                )}

                {completedForm === true && step === 3 ? (
                  <>
                    <ThankYouPage
                      formData={finalData}
                      setStep={setStep}
                      setCompletedForm={setCompletedForm}
                      customer={customer}
                    />
                  </>
                ) : step === 3 ? (
                  <>
                    <Step3
                      formData={formData}
                      setStep={setStep}
                      loader={loader}
                    />
                  </>
                ) : null}
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent>
              <p>
                <b className="text-red-500">
                  <FileWarningIcon color="red" /> ATTENTION:
                </b>{" "}
                Your access to the reservation system has been revoked, please
                contact the admin for more information.
              </p>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
