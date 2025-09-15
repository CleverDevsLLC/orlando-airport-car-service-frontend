'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MapPin, Save, RefreshCw, AlertCircle } from 'lucide-react'
import { API } from '@/Config/Config';
import { updateDefaultState } from '@/Services/PATCH';

// Define types
interface API {
  uri: string;
  companyId: string;
}


interface FormInfo {
  states: string[];
  defaultState?: string;
}

export default function ManageDefaultState() {
  const [formInfo, setFormInfo] = useState<FormInfo | null>(null)
  const [selectedState, setSelectedState] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  


  const getFormInfo = () => {
    setIsLoading(true)
    setError(null)
    const companyId = localStorage.getItem("companyId");
    axios
      .get<FormInfo>(`${API.uri}/form/company/${companyId}`)
      .then((res) => {
        console.log(res);
        
        setFormInfo(res.data)
        if (res.data.defaultState) {
          setSelectedState(res.data.defaultState)
        }
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e)
        setError('Failed to load form information. Please try again.')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getFormInfo()
  }, [])

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value)
  }

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("limo-token");
    const companyId = localStorage.getItem("companyId");
    setIsSaving(true)
    setSaveMessage(null)
    // Simulating API call to save changes
    const response = await updateDefaultState({defaultState: selectedState}, token, companyId);

    setIsSaving(false)
    setSaveMessage("Default State Updated")
    console.log(response);
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <MapPin className="w-8 h-8 mr-2 text-indigo-600" />
            Manage Default State
          </h1>
          <p className="text-gray-600">
            Set the default state for your limo service operations. This will be used as the primary location for calculations and reporting.
          </p>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <label htmlFor="stateSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Select Default State
              </label>
              <div className="relative">
                <select
                  id="stateSelect"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="block w-full px-4 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-100 shadow-lg"
                >
                  <option value="">Choose a state...</option>
                  {formInfo?.states.map((state) => (
                    <option key={state} value={state} className='text-black'>
                      {state}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleSaveChanges}
                disabled={isSaving || !selectedState}
                className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  (isSaving || !selectedState) && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isSaving ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>

              {saveMessage && (
                <p className="text-green-600 font-medium">{saveMessage}</p>
              )}
            </div>
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Set a Default State?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Streamline operations by pre-filling location information</li>
            <li>Improve accuracy in distance and pricing calculations</li>
            <li>Enhance reporting and analytics based on your primary service area</li>
            <li>Customize user experience for your most common service location</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

