import type React from "react";
import { Button } from "../../Common/FormComponents/Button";
import type { FormData } from "@/Types";
import { formatDateForSummary, formatTime } from "@/Utils";

interface Step3Props {
  formData: FormData;
  setStep: (step: number) => void;
  loader: boolean;
}

export const Step3: React.FC<Step3Props> = ({ formData, setStep, loader }) => {
  const renderTripDetails = () => {
    switch (formData.serviceType) {
      case "One-Way Trip from the Airport":
        return (
          <>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-semibold">Pickup Details</h4>
              <p>
                <strong>Date & Time:</strong>{" "}
                {formatDateForSummary(formData.pickupDate)},{" "}
                {formatTime(formData.pickupTime)}
              </p>
              <p>
                <strong>Pickup Airport:</strong> {formData.pickupAirport}
              </p>

              <p>
                <strong>Airline:</strong> {formData.airlineName}{" "}
                {formData.flightNumber && `(Flight ${formData.flightNumber})`}
              </p>
              <p>
                <strong>Arrival Time:</strong>{" "}
                {formatTime(formData.airlineArrivalTime)}
              </p>
            </div>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-semibold">Drop-off Details</h4>
              <p>
                <strong>Drop-off Address:</strong> {formData.dropOffAddress},{" "}
                {formData.dropoffCity}, {formData.dropoffState}
              </p>
            </div>
          </>
        );
      case "One-Way Trip to the Airport":
        return (
          <>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-semibold">Pickup Details</h4>
              <p>
                <strong>Date & Time:</strong>{" "}
                {formatDateForSummary(formData.pickupDate)},{" "}
                {formatTime(formData.pickupTime)}
              </p>
              <p>
                <strong>Pickup Address:</strong> {formData.pickupAddress},{" "}
                {formData.pickupCity}, {formData.pickupState}
              </p>
            </div>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-semibold">Drop-off Details</h4>
              <p>
                <strong>Drop-off Airport:</strong> {formData.dropoffAirport}
              </p>
              <p>
                <strong>Airline:</strong> {formData.airlineName}
              </p>
              <p>
                <strong>Departure Time:</strong>{" "}
                {formatTime(formData.airlineDepartureTime)}
              </p>
            </div>
          </>
        );
      case "Round Trip Not Involving an Airport":
        return (
          <>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-semibold">Outbound Trip</h4>
              <p>
                <strong>Date & Time:</strong>{" "}
                {formatDateForSummary(formData.pickupDate)},{" "}
                {formatTime(formData.pickupTime)}
              </p>
              <p>
                <strong>Pickup Address:</strong> {formData.pickupAddress},{" "}
                {formData.pickupCity}, {formData.pickupState}
              </p>

              <p>
                <strong>Drop-off Address:</strong>{" "}
                {formData.returnPickupAddress}, {formData.dropoffCity},{" "}
                {formData.dropoffState}
              </p>
            </div>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-lg font-semibold">Return Trip</h4>
              <p>
                <strong>Date & Time:</strong>{" "}
                {formatDateForSummary(formData.returnDate)},{" "}
                {formatTime(formData.returnTime)}
              </p>
              <p>
                <strong>Pickup Address:</strong> {formData.returnPickupAddress},{" "}
                {formData.pickupCity}, {formData.dropoffCity}
              </p>

              <p>
                <strong>Drop-off Address:</strong>{" "}
                {formData.returnDropoffAddress}, {formData.dropoffCity},{" "}
                {formData.dropoffState}
              </p>
            </div>
          </>
        );
      case "Round Trip Involving an Airport":
        if (formData.roundTripFirstLeg === "To Airport") {
          return (
            <>
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-lg font-semibold">
                  Outbound Trip (To Airport)
                </h4>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {formatDateForSummary(formData.pickupDate)},{" "}
                  {formatTime(formData.pickupTime)}
                </p>
                <p>
                  <strong>Pickup Address:</strong> {formData.pickupAddress},{" "}
                  {formData.pickupCity}, {formData.pickupState}
                </p>

                <p>
                  <strong>Drop-off Airport:</strong> {formData.dropoffAirport}
                </p>
                <p>
                  <strong>Airline:</strong> {formData.dropoffAirline}
                </p>
                <p>
                  <strong>Departure Time:</strong>{" "}
                  {formatTime(formData.dropOffDepartureTime)}
                </p>
              </div>
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-lg font-semibold">
                  Return Trip (From Airport)
                </h4>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {formatDateForSummary(formData.returnDate)},{" "}
                  {formatTime(formData.returnTime)}
                </p>
                <p>
                  <strong>Pickup Airport:</strong>{" "}
                  {formData.returnPickupAirport}
                </p>

                <p>
                  <strong>Airline:</strong> {formData.returnAirline} (Flight{" "}
                  {formData.returnFlightNumber})
                </p>
                <p>
                  <strong>Drop-off Address:</strong> {formData.pickupAddress},{" "}
                  {formData.pickupCity}, {formData.pickupState}
                </p>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-lg font-semibold">
                  Outbound Trip (From Airport)
                </h4>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {formatDateForSummary(formData.pickupDate)},{" "}
                  {formatTime(formData.pickupTime)}
                </p>
                <p>
                  <strong>Pickup Airport:</strong> {formData.pickupAirport}
                </p>

                <p>
                  <strong>Airline:</strong> {formData.airlineName}{" "}
                  {formData.flightNumber && `(Flight ${formData.flightNumber})`}
                </p>
                <p>
                  <strong>Arrival Time:</strong>{" "}
                  {formatTime(formData.airlineArrivalTime)}
                </p>
                <p>
                  <strong>Drop-off Address:</strong> {formData.dropOffAddress},{" "}
                  {formData.dropoffCity}, {formData.dropoffState}
                </p>
              </div>
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-lg font-semibold">
                  Return Trip (To Airport)
                </h4>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {formatDateForSummary(formData.returnDate)},{" "}
                  {formatTime(formData.returnTime)}
                </p>
                <p>
                  <strong>Pickup Address:</strong>{" "}
                  {formData.returnPickupAddress}, {formData.dropoffCity},{" "}
                  {formData.dropoffState}
                </p>

                <p>
                  <strong>Drop-off Airport:</strong> {formData.dropoffAirport}
                </p>
                <p>
                  <strong>Departure Time:</strong>{" "}
                  {formatTime(formData.returnDepartureTime)}
                </p>
              </div>
            </>
          );
        }
      case "One-Way Trip Not Involving an Airport":
      case "Hourly Trip":
        return (
          <div className="mb-4 rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 text-lg font-semibold">Trip Details</h4>
            <p>
              <strong>Pickup:</strong>{" "}
              {formatDateForSummary(formData.pickupDate)},{" "}
              {formatTime(formData.pickupTime)}
            </p>
            <p>
              <strong>Pickup Address:</strong> {formData.pickupAddress},{" "}
              {formData.pickupCity}, {formData.pickupState}
            </p>
            {formData.serviceType !== "Hourly Trip" ? (
              <>
                <p>
                  <strong>Drop-off Address:</strong> {formData.dropOffAddress},{" "}
                  {formData.dropoffCity}, {formData.dropoffState}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Basic Itenary:</strong> {formData.itinerary}
                </p>
              </>
            )}

            {formData.serviceType === "Hourly Trip" && (
              <p>
                <strong>Trip Duration:</strong> {formData.tripDuration} hours
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  console.log("Here it is-->", { formData });

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Reservation Summary</h3>

      <div className="mb-4 rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 text-lg font-semibold">Trip Overview</h4>
        <p>
          <strong>Service Type:</strong> {formData.serviceType}
        </p>
        <p>
          <strong>Vehicle Type:</strong> {formData.vehicleType}
        </p>
        <p>
          <strong>Number of Passengers:</strong> {formData.numberOfPassengers}
        </p>
        <p>
          <strong>Passenger Names:</strong> {formData.passengerNames}
        </p>
        {formData.extraStops && (
          <p>
            <strong>Extra Stops:</strong> {formData.extraStops}
          </p>
        )}
      </div>

      {renderTripDetails()}

      <div className="mb-4 rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 text-lg font-semibold">Contact Information</h4>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
      </div>

      {/* {formData.meetAndGreetPrice &&
        formData?.serviceType?.toLowerCase().includes("from the airport") && (
          <div className="mb-4 rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 text-lg font-semibold">
              Meet and Greet Payment
            </h4>
            <p>{formData.meetAndGreetPrice}$</p>
          </div>
        )} */}

      {formData.additionalNotes && (
        <div className="mb-4 rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 text-lg font-semibold">Additional Notes</h4>
          <p>{formData.additionalNotes}</p>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={() => setStep(2)} variant="outline">
          Back
        </Button>
        <Button type="submit" className="bg-black text-white" disabled={loader}>
          {loader
            ? "Loading..."
            : formData?.price
              ? "Make a Payment"
              : "Get a quote"}
        </Button>
      </div>
    </div>
  );
};
