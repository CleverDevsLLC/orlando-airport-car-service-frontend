"use client"

import { useEffect, useState } from "react"
import { Percent } from "lucide-react"
import { getCompanyInfo } from "@/Services/GET"
import { updateCompany } from "@/Services/PATCH"

interface CompanyInterface {
    discount?: number
}

export default function DiscountComponent() {
    const [discount, setDiscount] = useState<string>("")
    const [currentDiscount, setCurrentDiscount] = useState<number | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [companyInfo, setCompanyInfo] = useState<CompanyInterface>({});
    const [companyId, setCompanyId] = useState<string | null>();


    const handleSetDiscount = async () => {
        const discountValue = Number.parseFloat(discount)
        if (!isNaN(discountValue)) {
            setCurrentDiscount(discountValue)

            const response = await updateCompany({discount: discountValue}, token, companyId);

            console.log(response);
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("limo-token"))
        setCompanyId(localStorage.getItem("companyId"))
    }, [])

    const companyInfoGetter = async () => {
        if (!token) return;
        const response = await getCompanyInfo(token, companyId);
        if (response.status === 200) {
            setCompanyInfo(response.data);
            if(response.data.discount && response.data.discount > 0){
                setDiscount(response.data.discount);
            }
        }
    };


    useEffect(() => {
        companyInfoGetter();
    }, [companyId])





    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl rounded-3xl">
                    <div className="p-8 bg-gradient-to-br from-white via-purple-50 to-indigo-50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Set Discount</h2>
                        </div>

                        <p className="text-gray-600 mb-8">Set the discount percentage that will be applied to all invoices.</p>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount Percentage
                                </label>
                                <div className="flex items-center rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={ discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        required
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter discount percentage"
                                    />
                                    <div className="bg-gray-100 px-3 py-3 border border-l-0 border-gray-300 rounded-r-md">
                                        <Percent className="text-gray-400" size={18} />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSetDiscount}
                                    className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Set Discount
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Discount Rate</h3>
                            <p className="text-3xl font-bold text-indigo-600">
                                {currentDiscount !== null ? `${currentDiscount.toFixed(2)}%` : companyInfo.discount && companyInfo.discount > 0 ? companyInfo.discount+"%": "No discount set"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

