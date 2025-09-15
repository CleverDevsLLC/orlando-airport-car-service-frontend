"use client";

import { useEffect, useState } from "react";
import { getCompanyInfo } from "@/Services/GET";
import { updateCompany } from "@/Services/PATCH";
import { Banknote, Info } from "lucide-react";
import Image from "next/image";
import { Tabs } from "@/Components/ui/Tabs";
import { ManageMeetAndGreet } from "./ManageMeetAndGreet";

export interface CompanyInfo {
  showTipBox?: boolean;
  meetAndGreetPrice?: string;
}

export default function ManageTipBox() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({});
  const [showTipBox, setShowTipBox] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("tipBox");

  useEffect(() => {
    setToken(localStorage.getItem("limo-token"));
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  useEffect(() => {
    if (token && companyId) {
      getInfo(companyId, token);
    }
  }, [token, companyId]);

  const getInfo = async (id: string, token: string) => {
    const response = await getCompanyInfo(token, id);
    if (response.status === 200) {
      setCompanyInfo(response.data);
      setShowTipBox(response.data.showTipBox || false);
    }
  };

  const updateTipStatus = async (newStatus: boolean) => {
    if (!token || !companyId) return;

    setShowTipBox(newStatus);
    const response = await updateCompany(
      { showTipBox: newStatus },
      token,
      companyId,
    );
    if (response.status === 200) {
      setCompanyInfo({ ...companyInfo, showTipBox: newStatus });
    } else {
      setShowTipBox(!newStatus);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Tabs
          selectedTabId={activeTab}
          setSelectedTabId={setActiveTab}
          options={[
            {
              id: "tipBox",
              title: "Manage Tip Box",
            },
            {
              id: "meetAndGreet",
              title: "Manage Meet and Greet",
            },
          ]}
        />
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 p-8">
            {activeTab === "tipBox" && (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Manage Tip Box
                  </h2>
                  <Banknote className="text-indigo-600" size={32} />
                </div>

                <p className="mb-8 text-gray-600">
                  Enable or disable the tip box for your customers.
                </p>
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-4 flex items-center">
                    <Info className="mr-2 text-indigo-600" size={24} />
                    <h4 className="text-lg font-semibold text-gray-800">
                      Tip Box Preview
                    </h4>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    This is how the tip box section will appear to your
                    customers when enabled:
                  </p>
                  <div className="w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/section.png"
                      alt="Tip Box Preview"
                      width={800}
                      height={1000}
                      className="w-[100%] rounded-lg"
                    />
                  </div>
                  <p className="mt-2 text-sm italic text-gray-500">
                    Note: This is a preview image. The actual appearance may
                    vary based on your specific settings.
                  </p>
                </div>
                <div className="mb-8 mt-3 flex items-center justify-between rounded-lg bg-indigo-50 p-4">
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                      Show Tip Box
                    </h3>
                    <p className="text-sm text-gray-600">
                      {showTipBox
                        ? "Tip box is currently visible to customers."
                        : "Tip box is currently hidden from customers."}
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={showTipBox}
                      onChange={() => updateTipStatus(!showTipBox)}
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800"></div>
                  </label>
                </div>

                <div className="mt-8 rounded-lg bg-indigo-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Tip Box Status
                  </h3>
                  <p className="text-3xl font-bold text-indigo-600">
                    {showTipBox ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </>
            )}
            {activeTab === "meetAndGreet" && (
              <ManageMeetAndGreet
                companyInfo={companyInfo}
                setCompanyInfo={setCompanyInfo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
