import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/Common/FormComponents/Tooltip";
import { Button, Toggle } from "@/Components/ui";
import { Banknote, CircleHelp, DollarSign } from "lucide-react";
import React from "react";
import { CompanyInfo } from "./ManageTipBox";
import { updateCompany } from "@/Services/PATCH";

export const ManageMeetAndGreet = ({
  companyInfo,
  setCompanyInfo,
}: {
  companyInfo: CompanyInfo;
  setCompanyInfo: (val: CompanyInfo) => void;
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [enable, setEnable] = React.useState<boolean>(false);
  const [meetAndGreetValue, setMeetAndGreetValue] = React.useState<number>(0);
  React.useEffect(() => {
    if (companyInfo?.meetAndGreetPrice) {
      setEnable(true);
      const value = parseFloat(companyInfo?.meetAndGreetPrice ?? "0").toFixed(
        2,
      );
      setMeetAndGreetValue(parseFloat(value));
    }
  }, [companyInfo?.meetAndGreetPrice]);

  const onSave = async () => {
    const token = localStorage.getItem("limo-token");
    const companyId = localStorage.getItem("companyId");
    if (!token || !companyId) return;
    setIsLoading(true);
    try {
      await updateCompany(
        {
          meetAndGreetPrice: String(meetAndGreetValue),
        },
        token,
        companyId,
      );

      setCompanyInfo({
        ...companyInfo,
        meetAndGreetPrice: String(meetAndGreetValue),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = async () => {
    const token = localStorage.getItem("limo-token");
    const companyId = localStorage.getItem("companyId");
    if (!token || !companyId) return;

    try {
      await updateCompany(
        {
          meetAndGreetPrice: "",
        },
        token,
        companyId,
      );
      setCompanyInfo({
        ...companyInfo,
        meetAndGreetPrice: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Meet And Greet
        </h2>
        <Banknote className="text-indigo-600" size={32} />
      </div>

      <p className="mb-8 text-gray-600">
        Enable or disable the meet and greet.
      </p>

      <div className="mt-3 flex flex-col justify-center rounded-lg bg-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="mb-1 text-lg font-semibold text-gray-800">
              Show Meet And Greet
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp className="mr-2 text-indigo-600" size={24} />
                </TooltipTrigger>
                <TooltipContent className="ml-5 w-1/3 md:ml-32">
                  <p>
                    Meet And Greet service is where the driver will park the
                    car, come to luggage claim and help you with your bags. This
                    is an optional service and if you don’t select this, by
                    default the driver will expect to meet you at the curbside
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Toggle
            checked={enable}
            onChange={(val) => {
              setEnable(val);
              if (!val) {
                onRemove();
              }
            }}
          />
        </div>

        <div
          className={`flex justify-between ${enable ? "h-auto w-auto gap-5 py-5 opacity-100" : "h-0 w-0 opacity-0"}`}
        >
          <div
            className={`relative rounded-md shadow-sm ${enable ? "h-auto w-auto opacity-100" : "h-0 w-0 opacity-0"}`}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DollarSign className="text-indigo-600" size={18} />
            </div>
            <input
              step={"0.01"}
              type="number"
              value={meetAndGreetValue}
              onChange={(e) => {
                const { valueAsNumber } = e.target;
                if (
                  (valueAsNumber === 0 || valueAsNumber > 0) &&
                  valueAsNumber < 100
                ) {
                  setMeetAndGreetValue(parseFloat(valueAsNumber.toFixed(2)));
                }
              }}
              required
              className={`block w-full rounded-md border ${enable ? "h-auto w-auto py-2 pl-10 pr-3 opacity-100" : "h-0 w-0 opacity-0"} outline-none focus:outline-indigo-600`}
              placeholder="Meet And Greet Amount"
            />
          </div>
          <div
            className={`flex w-full justify-end transition-all duration-300 ${enable ? "h-auto w-auto opacity-100" : "h-0 w-0 opacity-0"}`}
          >
            <Button text={isLoading ? "Saving..." : "Save"} onClick={onSave} />
          </div>
        </div>
      </div>
    </>
  );
};
