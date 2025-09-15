import { useState, useEffect, useRef } from "react";
import { XIcon, PlusCircle, Trash2 } from "lucide-react";

interface PriceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (price: number, additionalPayments: AdditionalPayment[]) => void;
}

interface AdditionalPayment {
  paymentType: "percentage" | "fixed";
  amount: number;
  paymentLabel: string;
}

export default function PriceInputModal({
  isOpen,
  onClose,
  onSubmit,
}: PriceInputModalProps) {
  const [price, setPrice] = useState("");
  const [additionalPayments, setAdditionalPayments] = useState<
    AdditionalPayment[]
  >([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice) && numericPrice > 0) {
      onSubmit(numericPrice, additionalPayments);
    } else {
      console.error("Invalid price input");
    }
  };

  const addAdditionalPayment = () => {
    setAdditionalPayments([
      ...additionalPayments,
      { paymentType: "fixed", amount: 0, paymentLabel: "" },
    ]);
  };

  const updateAdditionalPayment = (
    index: number,
    field: keyof AdditionalPayment,
    value: string | number | "percentage" | "fixed",
  ) => {
    const updatedPayments = [...additionalPayments];
    updatedPayments[index] = { ...updatedPayments[index], [field]: value };
    setAdditionalPayments(updatedPayments);
  };

  const removeAdditionalPayment = (index: number) => {
    setAdditionalPayments(additionalPayments.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Enter Quote Price
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Main Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter main price"
              min="0"
              step="0.01"
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {additionalPayments.map((payment, index) => (
            <div
              key={index}
              className="mb-4 rounded-md border border-gray-200 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Additional Payment {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeAdditionalPayment(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="mb-2 flex items-center">
                <select
                  value={payment.paymentType}
                  onChange={(e) =>
                    updateAdditionalPayment(
                      index,
                      "paymentType",
                      e.target.value as "percentage" | "fixed",
                    )
                  }
                  className="mr-2 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="fixed">$</option>
                  <option value="percentage">%</option>
                </select>
                <input
                  type="number"
                  value={payment.amount}
                  onChange={(e) =>
                    updateAdditionalPayment(
                      index,
                      "amount",
                      parseFloat(e.target.value),
                    )
                  }
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <input
                type="text"
                value={payment.paymentLabel}
                onChange={(e) =>
                  updateAdditionalPayment(index, "paymentLabel", e.target.value)
                }
                placeholder="Payment Label"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addAdditionalPayment}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Additional Payment
          </button>

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
            >
              Send Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
