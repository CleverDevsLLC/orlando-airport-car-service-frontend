import React from "react";
import { Hourglass } from "lucide-react";
import { VehicleForm } from "./VehicleForm";

export const ManageHours = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <header className="mb-8">
          <h1 className="mb-2 flex items-center text-3xl font-bold text-gray-800">
            <Hourglass className="mr-2 h-8 w-8 text-indigo-600" />
            Manage Hours
          </h1>
          <p className="text-gray-600">
            Set the minimum hours for your car and limo. This will be used as
            the minimum hours for selected car or limo.
          </p>
        </header>
        <VehicleForm />
      </div>
    </div>
  );
};
