"use client";
import React from "react";
import { CompaniesForAllCompaniesType } from "@/Types";
import { Button, Input } from "../../ui";
import Image from "next/image";
import { getCompanyDetail } from "@/Services/GET";
import { updateCompanyDetail } from "@/Services/PATCH";
import { successToast, warningToast } from "@/Utils/toast";

export const VehicleForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [companyData, setCompanyData] =
    React.useState<CompaniesForAllCompaniesType>();

  React.useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      setIsLoading(true);
      getCompanyDetail(companyId)
        .then((data) => {
          setCompanyData(data);
        })
        .catch((err) => {
          console.log(err);
          warningToast("Something went wrong in getting company details!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyId = localStorage.getItem("companyId");
    const formData = new FormData(e.target as HTMLFormElement);
    const formKeysWithData = Object.fromEntries(formData);
    const typesOfVehicles = companyData?.typesOfVehicles;
    Object.entries(formKeysWithData ?? {}).forEach(([key, value]) => {
      const index = Number(key.split("-")[0]);
      if (typesOfVehicles) {
        typesOfVehicles[index]["minimumNoOfHours"] = Number(value);
      }
    });
    const token = localStorage.getItem("limo-token");
    setIsLoading(true);
    updateCompanyDetail({ typesOfVehicles }, token, companyId)
      .then(() => {
        successToast("Minimum Number of hours updated successfully!");
      })
      .catch(() => {
        warningToast(
          "Something went wrong in updating Minimum Number of hours!",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (!companyData && isLoading) {
    return "Loading Data...";
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {companyData?.typesOfVehicles.map((i, index) => (
          <div key={index}>
            <div className="flex items-center gap-5">
              <Image
                src={i.image}
                height={100}
                width={100}
                alt={`${i.vehicleType} can afford ${i.noOfPassengers} with minimum ${i.minimumNoOfHours} hours.`}
              />
              <div>
                <p>
                  <span className="font-semibold">Type: </span>
                  {i.vehicleType}
                </p>
                <p>
                  <span className="font-semibold">Number of passengers: </span>
                  {i.noOfPassengers}
                </p>
              </div>
            </div>
            <Input
              className="!mt-5"
              label="Minimum hours"
              inPutProps={{
                placeholder: "Minimum hours",
                type: "number",
                required: true,
                defaultValue: i.minimumNoOfHours ?? 0,
                name: `${index}-minimumNoOfHours`,
              }}
            />
          </div>
        ))}
        {companyData && companyData.typesOfVehicles.length > 0 && (
          <div className="flex justify-end">
            <Button
              type="submit"
              text={isLoading ? "Saving..." : "Save Changes"}
            />
          </div>
        )}
      </form>
    </div>
  );
};
