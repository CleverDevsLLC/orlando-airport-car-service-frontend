import React, { useEffect, useState } from "react";
import { Label } from "../../Common/FormComponents/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Common/FormComponents/Select";
import { Input } from "../../Common/FormComponents/Input";
import { Button } from "../../Common/FormComponents/Button";
import { FormData, ServiceType } from "@/Types";
import axios from "axios";
import { API } from "@/Config/Config";

interface Step1Props {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
  setStep: (step: number) => void;
  airports: string[];
  states: string[];
  serviceType?: ServiceType;
}

export const Step1: React.FC<Step1Props> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  setStep,
  states,
  airports,
  serviceType,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [defaultState, setDefaultState] = useState("");

  if (serviceType) {
    formData.serviceType = serviceType;
  }

  const getFormInfo = () => {
    axios
      .get(`${API.uri}/form/company/${API.companyId}`)
      .then((res) => {
        console.log(res);

        if (res.data.defaultState) {
          console.log("here");
          setDefaultState(res.data.defaultState);
        }
      })
      .catch((e) => {
        console.log(e.response.status);
      });
  };

  useEffect(() => {
    getFormInfo();
  }, []);

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.serviceType) {
      newErrors.serviceType = "Service type is required";
    }

    if (
      formData.serviceType === "Round Trip Involving an Airport" &&
      !formData.roundTripFirstLeg
    ) {
      newErrors.roundTripFirstLeg =
        "Please select the first leg of your round trip";
    }
    console.log({ formData });

    if (
      formData.serviceType === "One-Way Trip to the Airport" ||
      (formData.serviceType === "Round Trip Involving an Airport" &&
        formData.roundTripFirstLeg === "To Airport")
    ) {
      if (!formData.pickupCity)
        newErrors.pickupCity = "Pickup city is required";
      if (!formData.pickupState)
        newErrors.pickupState = "Pickup state is required";
      if (!formData.dropoffAirport)
        newErrors.dropoffAirport = "Drop-off airport is required";
    }

    if (
      formData.serviceType === "One-Way Trip from the Airport" ||
      (formData.serviceType === "Round Trip Involving an Airport" &&
        formData.roundTripFirstLeg === "From Airport")
    ) {
      if (!formData.pickupAirport)
        newErrors.pickupAirport = "Pickup airport is required";
      if (!formData.dropoffCity)
        newErrors.dropoffCity = "Drop-off city is required";
      if (!formData.dropoffState)
        newErrors.dropoffState = "Drop-off state is required";
    }

    if (
      formData.serviceType === "One-Way Trip Not Involving an Airport" ||
      formData.serviceType === "Round Trip Not Involving an Airport"
    ) {
      if (!formData.pickupCity)
        newErrors.pickupCity = "Pickup city is required";
      if (!formData.pickupState)
        newErrors.pickupState = "Pickup state is required";
      if (!formData.dropoffCity)
        newErrors.dropoffCity = "Drop-off city is required";
      if (!formData.dropoffState)
        newErrors.dropoffState = "Drop-off state is required";
      if (
        formData.pickupCity === formData.dropoffCity &&
        formData.pickupState === formData.dropoffState
      ) {
        newErrors.dropoffCity =
          "Pickup and drop-off locations cannot be the same";
      }
    }

    if (formData.serviceType === "Hourly Trip") {
      if (!formData.tripDuration)
        newErrors.tripDuration = "Trip duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const renderServiceTypeFields = () => {
    switch (formData.serviceType) {
      case "One-Way Trip to the Airport":
        return (
          <div className="space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="pickupCity">Pickup City</Label>
                <Input
                  id="pickupCity"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.pickupCity ? "true" : "false"}
                  aria-describedby={
                    errors.pickupCity ? "pickupCity-error" : undefined
                  }
                />
                {errors.pickupCity && (
                  <p id="pickupCity-error" className="text-sm text-red-500">
                    {errors.pickupCity}
                  </p>
                )}
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor="pickupState">State</Label>
                <Select
                  value={
                    formData.pickupState === ""
                      ? defaultState
                      : formData.pickupState
                  }
                  onValueChange={(value) =>
                    handleSelectChange("pickupState", value)
                  }
                >
                  <SelectTrigger
                    id="pickupState"
                    aria-required="true"
                    aria-invalid={errors.pickupState ? "true" : "false"}
                    aria-describedby={
                      errors.pickupState ? "pickupState-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.pickupState && (
                  <p id="pickupState-error" className="text-sm text-red-500">
                    {errors.pickupState}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoffAirport">Drop-off Airport</Label>
              <Select
                value={formData.dropoffAirport}
                onValueChange={(value) =>
                  handleSelectChange("dropoffAirport", value)
                }
              >
                <SelectTrigger
                  id="dropoffAirport"
                  aria-required="true"
                  aria-invalid={errors.dropoffAirport ? "true" : "false"}
                  aria-describedby={
                    errors.dropoffAirport ? "dropoffAirport-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport} value={airport}>
                      {airport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dropoffAirport && (
                <p id="dropoffAirport-error" className="text-sm text-red-500">
                  {errors.dropoffAirport}
                </p>
              )}
            </div>
          </div>
        );
      case "One-Way Trip from the Airport":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickupAirport">Pickup Airport</Label>
              <Select
                value={formData.pickupAirport}
                onValueChange={(value) =>
                  handleSelectChange("pickupAirport", value)
                }
              >
                <SelectTrigger
                  id="pickupAirport"
                  aria-required="true"
                  aria-invalid={errors.pickupAirport ? "true" : "false"}
                  aria-describedby={
                    errors.pickupAirport ? "pickupAirport-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport} value={airport}>
                      {airport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pickupAirport && (
                <p id="pickupAirport-error" className="text-sm text-red-500">
                  {errors.pickupAirport}
                </p>
              )}
            </div>
            <div className="flex flex-row space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="dropoffCity">Drop-off City</Label>
                <Input
                  id="dropoffCity"
                  name="dropoffCity"
                  value={formData.dropoffCity}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.dropoffCity ? "true" : "false"}
                  aria-describedby={
                    errors.dropoffCity ? "dropoffCity-error" : undefined
                  }
                />
                {errors.dropoffCity && (
                  <p id="dropoffCity-error" className="text-sm text-red-500">
                    {errors.dropoffCity}
                  </p>
                )}
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor="dropoffState">State</Label>
                <Select
                  value={
                    formData.dropoffState === ""
                      ? defaultState
                      : formData.dropoffState
                  }
                  onValueChange={(value) =>
                    handleSelectChange("dropoffState", value)
                  }
                >
                  <SelectTrigger
                    id="dropoffState"
                    aria-required="true"
                    aria-invalid={errors.dropoffState ? "true" : "false"}
                    aria-describedby={
                      errors.dropoffState ? "dropoffState-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dropoffState && (
                  <p id="dropoffState-error" className="text-sm text-red-500">
                    {errors.dropoffState}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "Round Trip Involving an Airport":
        return formData.roundTripFirstLeg === "To Airport" ? (
          <div className="space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="pickupCity">Pickup City</Label>
                <Input
                  id="pickupCity"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.pickupCity ? "true" : "false"}
                  aria-describedby={
                    errors.pickupCity ? "pickupCity-error" : undefined
                  }
                />
                {errors.pickupCity && (
                  <p id="pickupCity-error" className="text-sm text-red-500">
                    {errors.pickupCity}
                  </p>
                )}
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor="pickupState">State</Label>
                <Select
                  value={
                    formData.pickupState === ""
                      ? defaultState
                      : formData.pickupState
                  }
                  onValueChange={(value) =>
                    handleSelectChange("pickupState", value)
                  }
                >
                  <SelectTrigger
                    id="pickupState"
                    aria-required="true"
                    aria-invalid={errors.pickupState ? "true" : "false"}
                    aria-describedby={
                      errors.pickupState ? "pickupState-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.pickupState && (
                  <p id="pickupState-error" className="text-sm text-red-500">
                    {errors.pickupState}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoffAirport">Drop-off Airport</Label>
              <Select
                value={formData.dropoffAirport}
                onValueChange={(value) =>
                  handleSelectChange("dropoffAirport", value)
                }
              >
                <SelectTrigger
                  id="dropoffAirport"
                  aria-required="true"
                  aria-invalid={errors.dropoffAirport ? "true" : "false"}
                  aria-describedby={
                    errors.dropoffAirport ? "dropoffAirport-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport} value={airport}>
                      {airport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dropoffAirport && (
                <p id="dropoffAirport-error" className="text-sm text-red-500">
                  {errors.dropoffAirport}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickupAirport">Pickup Airport</Label>
              <Select
                value={formData.pickupAirport}
                onValueChange={(value) =>
                  handleSelectChange("pickupAirport", value)
                }
              >
                <SelectTrigger
                  id="pickupAirport"
                  aria-required="true"
                  aria-invalid={errors.pickupAirport ? "true" : "false"}
                  aria-describedby={
                    errors.pickupAirport ? "pickupAirport-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select airport" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport} value={airport}>
                      {airport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pickupAirport && (
                <p id="pickupAirport-error" className="text-sm text-red-500">
                  {errors.pickupAirport}
                </p>
              )}
            </div>
            <div className="flex flex-row space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="dropoffCity">Drop-off City</Label>
                <Input
                  id="dropoffCity"
                  name="dropoffCity"
                  value={formData.dropoffCity}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.dropoffCity ? "true" : "false"}
                  aria-describedby={
                    errors.dropoffCity ? "dropoffCity-error" : undefined
                  }
                />
                {errors.dropoffCity && (
                  <p id="dropoffCity-error" className="text-sm text-red-500">
                    {errors.dropoffCity}
                  </p>
                )}
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor="dropoffState">State</Label>
                <Select
                  value={
                    formData.dropoffState === ""
                      ? defaultState
                      : formData.dropoffState
                  }
                  onValueChange={(value) =>
                    handleSelectChange("dropoffState", value)
                  }
                >
                  <SelectTrigger
                    id="dropoffState"
                    aria-required="true"
                    aria-invalid={errors.dropoffState ? "true" : "false"}
                    aria-describedby={
                      errors.dropoffState ? "dropoffState-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dropoffState && (
                  <p id="dropoffState-error" className="text-sm text-red-500">
                    {errors.dropoffState}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "One-Way Trip Not Involving an Airport":
      case "Round Trip Not Involving an Airport":
        return (
          <div className="space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="pickupCity">Pickup City</Label>
                <Input
                  id="pickupCity"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.pickupCity ? "true" : "false"}
                  aria-describedby={
                    errors.pickupCity ? "pickupCity-error" : undefined
                  }
                />
                {errors.pickupCity && (
                  <p id="pickupCity-error" className="text-sm text-red-500">
                    {errors.pickupCity}
                  </p>
                )}
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor="pickupState">State</Label>
                <Select
                  value={
                    formData.pickupState === ""
                      ? defaultState
                      : formData.pickupState
                  }
                  onValueChange={(value) =>
                    handleSelectChange("pickupState", value)
                  }
                >
                  <SelectTrigger
                    id="pickupState"
                    aria-required="true"
                    aria-invalid={errors.pickupState ? "true" : "false"}
                    aria-describedby={
                      errors.pickupState ? "pickupState-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.pickupState && (
                  <p id="pickupState-error" className="text-sm text-red-500">
                    {errors.pickupState}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="dropoffCity">Drop-off City</Label>
                <Input
                  id="dropoffCity"
                  name="dropoffCity"
                  value={formData.dropoffCity}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.dropoffCity ? "true" : "false"}
                  aria-describedby={
                    errors.dropoffCity ? "dropoffCity-error" : undefined
                  }
                />
                {errors.dropoffCity && (
                  <p id="dropoffCity-error" className="text-sm text-red-500">
                    {errors.dropoffCity}
                  </p>
                )}
              </div>
              <div className="w-1/3 space-y-2">
                <Label htmlFor="dropoffState">State</Label>
                <Select
                  value={
                    formData.dropoffState === ""
                      ? defaultState
                      : formData.dropoffState
                  }
                  onValueChange={(value) =>
                    handleSelectChange("dropoffState", value)
                  }
                >
                  <SelectTrigger
                    id="dropoffState"
                    aria-required="true"
                    aria-invalid={errors.dropoffState ? "true" : "false"}
                    aria-describedby={
                      errors.dropoffState ? "dropoffState-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dropoffState && (
                  <p id="dropoffState-error" className="text-sm text-red-500">
                    {errors.dropoffState}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "Hourly Trip":
        return (
          <div className="space-y-2">
            <Label htmlFor="tripDuration">Trip Duration (hours)</Label>
            <Select
              value={formData.tripDuration}
              onValueChange={(value) =>
                handleSelectChange("tripDuration", value)
              }
            >
              <SelectTrigger
                id="tripDuration"
                aria-required="true"
                aria-invalid={errors.tripDuration ? "true" : "false"}
                aria-describedby={
                  errors.tripDuration ? "tripDuration-error" : undefined
                }
              >
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {[3, 4, 5, 6, 7, 8,10,11,12].map((hours) => (
                  <SelectItem key={hours} value={hours.toString()}>
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tripDuration && (
              <p id="tripDuration-error" className="text-sm text-red-500">
                {errors.tripDuration}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <div className="space-y-4" aria-label="Reservation Form Step 1">
        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type</Label>
          <Select
            value={formData.serviceType}
            onValueChange={(value) =>
              handleSelectChange("serviceType", value as ServiceType)
            }
          >
            <SelectTrigger
              id="serviceType"
              aria-required="true"
              aria-invalid={errors.serviceType ? "true" : "false"}
              aria-describedby={
                errors.serviceType ? "serviceType-error" : undefined
              }
            >
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="One-Way Trip to the Airport">
                One-Way Trip to the Airport
              </SelectItem>
              <SelectItem value="One-Way Trip from the Airport">
                One-Way Trip from the Airport
              </SelectItem>
              <SelectItem value="Round Trip Involving an Airport">
                Round Trip Involving an Airport
              </SelectItem>
              <SelectItem value="One-Way Trip Not Involving an Airport">
                One-Way Trip Not Involving an Airport
              </SelectItem>
              <SelectItem value="Round Trip Not Involving an Airport">
                Round Trip Not Involving an Airport
              </SelectItem>
              <SelectItem value="Hourly Trip">Hourly Trip</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceType && (
            <p id="serviceType-error" className="text-sm text-red-500">
              {errors.serviceType}
            </p>
          )}
        </div>
        {formData.serviceType === "Round Trip Involving an Airport" && (
          <div className="space-y-2">
            <Label htmlFor="roundTripFirstLeg">What do you need first?</Label>
            <Select
              value={formData.roundTripFirstLeg}
              onValueChange={(value) =>
                handleSelectChange("roundTripFirstLeg", value)
              }
            >
              <SelectTrigger
                id="roundTripFirstLeg"
                aria-required="true"
                aria-invalid={errors.roundTripFirstLeg ? "true" : "false"}
                aria-describedby={
                  errors.roundTripFirstLeg
                    ? "roundTripFirstLeg-error"
                    : undefined
                }
              >
                <SelectValue placeholder="Select first leg" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Airport">
                  A ride to the airport
                </SelectItem>
                <SelectItem value="From Airport">
                  A ride from the airport
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.roundTripFirstLeg && (
              <p id="roundTripFirstLeg-error" className="text-sm text-red-500">
                {errors.roundTripFirstLeg}
              </p>
            )}
          </div>
        )}
        {renderServiceTypeFields()}

        {/* Display validation errors */}
        <div aria-live="polite" className="sr-only">
          {Object.values(errors).join(", ")}
        </div>
      </div>
      <Button
        type="button"
        onClick={handleNext}
        className="mt-4 bg-black text-white"
        aria-label="Proceed to next step"
      >
        Next
      </Button>
    </>
  );
};
