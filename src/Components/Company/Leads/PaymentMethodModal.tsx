"use client";
import React from "react";
import { XIcon } from "lucide-react";
// import { API } from "@/Config/Config";
import { AdditionalPayment } from "../AdditionalCharges/AdditionalCharges";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Common/FormComponents/Select";
import { Leads, PaymentMethodType } from "@/Types";
import { updateLeadInfo } from "@/Services/PATCH";
import { errorToast, successToast, warningToast } from "@/Utils/toast";

interface PaymentMethodModalProps {
  onClose: () => void;
  onOk: () => void;
  mainLead: Leads;
  linkedLead: Leads | null | undefined;
}

export default function PaymentMethodModal({
  onClose,
  mainLead,
  linkedLead,
  onOk,
}: PaymentMethodModalProps) {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethodType>();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [, setCharges] = React.useState<AdditionalPayment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [, setError] = React.useState<string | null>(null);
  const [companyId, setCompanyId] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loader, setLoader] = React.useState<boolean>(true);
  const [, setIsInitializing] = React.useState(true);
  const leadToShow = linkedLead ? linkedLead : mainLead;

  React.useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    setToken(localStorage.getItem("limo-token"));
    setLoader(false);
    setIsInitializing(false);
  }, []);

  const fetchCharges = async () => {
    if (!companyId || !token) {
      console.log("CompanyId or token not available");
      return;
    }
    setIsLoading(true);
    try {
      setCharges(mainLead.additionalPayments || []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load charges. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (companyId && token && !loader) {
      fetchCharges();
    }
  }, [companyId, token, loader]);

  // const calculateInvoice = (baseAmount: number) => {
  //   let subtotal = baseAmount;
  //   let fixedCharges = 0;
  //   let percentageCharges = 0;
  //   const taxes: { label: string; amount: number }[] = [];
  //   let tipAmount = 0;

  //   charges.forEach((charge) => {
  //     if (charge.isTax) {
  //       // Taxes are calculated on subtotal + fixed charges
  //       const taxableAmount = subtotal + fixedCharges;
  //       const taxAmount =
  //         charge.paymentType === "percentage"
  //           ? taxableAmount * (charge.amount / 100)
  //           : charge.amount;
  //       taxes.push({ label: charge.paymentLabel, amount: taxAmount });
  //     } else if (charge.isGratuity) {
  //       tipAmount =
  //         charge.paymentType === "percentage"
  //           ? baseAmount * (charge.amount / 100)
  //           : charge.amount;
  //     } else if (charge.paymentType === "fixed") {
  //       fixedCharges += charge.amount;
  //     } else {
  //       percentageCharges += baseAmount * (charge.amount / 100);
  //     }
  //   });

  //   subtotal += fixedCharges + percentageCharges;
  //   const totalTaxes = taxes.reduce((sum, tax) => sum + tax.amount, 0);
  //   const totalAfterTax = subtotal + totalTaxes;
  //   const finalTotal = totalAfterTax + tipAmount;

  //   return { subtotal, taxes, totalAfterTax, tipAmount, finalTotal };
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentMethod || paymentMethod === PaymentMethodType.Default) {
      warningToast("Please choose payment method");
      return;
    } else if (paymentMethod === PaymentMethodType.Other) {
      warningToast("Please type something in payment method!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await updateLeadInfo(
        {
          paymentMethod,
        },
        token,
        mainLead._id,
      );
      if (response.status === 200) {
        successToast("Payment Method updated successfully!");
        // setTimeout(() => {
        onOk();
        // }, 1000);
      } else {
        throw new Error("Failed to update lead");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      errorToast("Failed to Payment Method!. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <h3 className="mb-6 text-2xl font-bold text-gray-800">
            Invoice Preview
          </h3>
          <div className="w-full">
            <label
              htmlFor="otherPaymentMethod"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <Select
              value={paymentMethod ?? "default"}
              onValueChange={(val: string) => {
                setPaymentMethod(val as PaymentMethodType);
              }}
            >
              <SelectTrigger className={`w-full font-semibold`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Select Payment Method</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="houseAccount">House Account</SelectItem>
                <SelectItem value="payPal">PayPal</SelectItem>
                <SelectItem value="authorizeDotNet">Authorize.net</SelectItem>
                <SelectItem value="otherPaymentMethod">
                  Other Payment Method
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {paymentMethod === PaymentMethodType.Other && (
            <div>
              <label
                htmlFor="otherPaymentMethod"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Other payment Method
              </label>
              <input
                type="text"
                id="otherPaymentMethod"
                name="otherPaymentMethod"
                value={paymentMethod}
                onChange={(e) => {
                  const { value } = e.target;
                  setPaymentMethod(value as PaymentMethodType);
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h4 className="mb-4 text-lg font-semibold text-gray-700">
              Invoice
            </h4>
            <div className="space-y-2">
              {/* <div className="flex justify-between text-gray-600">
                <span>Base Amount:</span>
                <span className="font-medium">$100.00</span>
              </div> */}
              {/* {charges.map(
                (charge, index) =>
                  !charge.isGratuity &&
                  !charge.isTax && (
                    <div
                      key={index}
                      className="flex justify-between text-gray-600"
                    >
                      <span>{charge.paymentLabel}:</span>
                      <span className="font-medium">
                        {charge.paymentType === "fixed"
                          ? `$${charge.amount.toFixed(2)}`
                          : `${charge.amount}% (${((100 * charge.amount) / 100).toFixed(2)})`}
                      </span>
                    </div>
                  ),
              )}
              {(() => {
                const { subtotal, taxes, tipAmount, finalTotal } =
                  calculateInvoice(100);
                return (
                  <>
                    <div className="flex justify-between font-semibold text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {taxes.map((tax, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-gray-600"
                      >
                        <span>{tax.label}:</span>
                        <span>
                          {charges.find((c) => c.paymentLabel === tax.label)
                            ?.paymentType === "percentage"
                            ? `${charges.find((c) => c.paymentLabel === tax.label)?.amount}% `
                            : ""}
                          (${tax.amount.toFixed(2)})
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-gray-600">
                      <span>Tip:</span>
                      <span>
                        {charges.find((c) => c.isGratuity)?.paymentType ===
                        "percentage"
                          ? `${charges.find((c) => c.isGratuity)?.amount}% `
                          : ""}
                        (${tipAmount.toFixed(2)})
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2 font-bold text-gray-800">
                      <span>Grand Total:</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </>
                );
              })()} */}
              {leadToShow.price ? (
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
                    <div>
                      Base Price: ${leadToShow.price?.toFixed(2) ?? "N/A"}
                    </div>
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
                                ? leadToShow.price *
                                  (1 - leadToShow.discount / 100)
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
                                ? leadToShow.price *
                                  (1 - leadToShow.discount / 100)
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
                        <div>
                          Additional Gratuity: ${leadToShow.tip.toFixed(2)}
                        </div>
                      )}
                    </>
                  ) : null}

                  <div className="mt-2 border-t pt-1 font-semibold">
                    Grand Total: $
                    {leadToShow.grandTotal
                      ? parseFloat(leadToShow.grandTotal).toFixed(2)
                      : 0}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
