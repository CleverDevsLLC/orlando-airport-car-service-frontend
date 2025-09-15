'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Trash2, DollarSign, Percent, FileText, InfoIcon } from 'lucide-react'
import { API } from '@/Config/Config'

export interface AdditionalPayment {
  paymentLabel: string
  amount: number
  paymentType: 'percentage' | 'fixed'
  isGratuity?: boolean
  isTax?: boolean
}

export default function AdditionalChargesComponent() {
  const [charges, setCharges] = useState<AdditionalPayment[]>([])
  const [newCharge, setNewCharge] = useState<AdditionalPayment>({
    paymentLabel: '',
    amount: 0,
    paymentType: 'fixed',
    isGratuity: false,
    isTax: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [companyId, setCompanyId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loader, setLoader] = useState<boolean>(true)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"))
    setToken(localStorage.getItem("limo-token"))
    setLoader(false)
    setIsInitializing(false)
  }, [])

  const fetchCharges = async () => {
    if (!companyId || !token) {
      console.log('CompanyId or token not available')
      return
    }
    try {
      const response = await fetch(`${API.uri}/companysetup/charges/${companyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch charges')
      const data = await response.json()
      console.log(data)
      setCharges(data.additionalPayments || [])
      setError(null)
    } catch (err) {
      console.log(err)
      setError('Failed to load charges. Please try again.')
    }
  }

  useEffect(() => {
    if (companyId && token && !loader) {
      fetchCharges()
    }
  }, [companyId, token, loader])

  if (isInitializing) {
    return <div>Loading...</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewCharge(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (newCharge.isGratuity && charges.some(charge => charge.isGratuity)) {
      setError('Gratuity already exists. Please edit the existing gratuity.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API.uri}/companysetup/charges/${companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ additionalPayments: [...charges, newCharge] }),
      })

      if (!response.ok) throw new Error('Failed to add charge')

      setCharges(prev => [...prev, newCharge])
      setNewCharge({ paymentLabel: '', amount: 0, paymentType: 'fixed', isGratuity: false, isTax: false })
    } catch (err) {
      console.log(err)
      setError('Failed to add charge. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (index: number, updatedCharge: AdditionalPayment) => {
    setIsLoading(true)
    setError(null)

    try {
      const updatedCharges = charges.map((c, i) => i === index ? updatedCharge : c)
      const response = await fetch(`${API.uri}/companysetup/charges/${companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          additionalPayments: updatedCharges
        }),
      })

      if (!response.ok) throw new Error('Failed to update charge')

      setCharges(updatedCharges)
    } catch (err) {
      console.log(err)
      setError('Failed to update charge. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (index: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const updatedCharges = charges.filter((_, i) => i !== index)
      const response = await fetch(`${API.uri}/companysetup/charges/${companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          additionalPayments: updatedCharges
        }),
      })

      if (!response.ok) throw new Error('Failed to delete charge')

      setCharges(updatedCharges)
    } catch (err) {
      console.log(err)
      setError('Failed to delete charge. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const calculateInvoice = (baseAmount: number) => {
    let subtotal = baseAmount;
    let fixedCharges = 0;
    let percentageCharges = 0;
    const taxes: { label: string; amount: number }[] = [];
    let tipAmount = 0;

    charges.forEach(charge => {
      if (charge.isTax) {
        // Taxes are calculated on subtotal + fixed charges
        const taxableAmount = subtotal + fixedCharges;
        const taxAmount = charge.paymentType === 'percentage' 
          ? taxableAmount * (charge.amount / 100) 
          : charge.amount;
        taxes.push({ label: charge.paymentLabel, amount: taxAmount });
      } else if (charge.isGratuity) {
        tipAmount = charge.paymentType === 'percentage' ? baseAmount * (charge.amount / 100) : charge.amount;
      } else if (charge.paymentType === 'fixed') {
        fixedCharges += charge.amount;
      } else {
        percentageCharges += baseAmount * (charge.amount / 100);
      }
    });

    subtotal += fixedCharges + percentageCharges;
    const totalTaxes = taxes.reduce((sum, tax) => sum + tax.amount, 0);
    const totalAfterTax = subtotal + totalTaxes;
    const finalTotal = totalAfterTax + tipAmount;

    return { subtotal, taxes, totalAfterTax, tipAmount, finalTotal };
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white overflow-hidden shadow-xl rounded-3xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 p-8 bg-gradient-to-br from-white via-purple-50 to-indigo-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Additional Charges</h2>
                <InfoIcon className="text-indigo-600 cursor-pointer" size={24} />
              </div>
              
              <p className="text-gray-600 mb-8">
                Set up additional charges, taxes, and gratuity that will be applied to all invoices. These can be fixed amounts or percentages of the total bill.
              </p>
              
              {error && <div className="text-red-600 bg-red-100 p-4 rounded-md mb-6">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Charge</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="paymentLabel" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Label
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        id="paymentLabel"
                        name="paymentLabel"
                        value={newCharge.paymentLabel}
                        onChange={handleInputChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Service Fee"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {newCharge.paymentType === 'fixed' ? (
                          <DollarSign className="text-gray-400" size={18} />
                        ) : (
                          <Percent className="text-gray-400" size={18} />
                        )}
                      </div>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={newCharge.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      id="paymentType"
                      name="paymentType"
                      value={newCharge.paymentType}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="fixed">Fixed ($)</option>
                      <option value="percentage">Percentage (%)</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <label htmlFor="isGratuity" className="flex items-center">
                        <input
                          type="checkbox"
                          id="isGratuity"
                          name="isGratuity"
                          checked={newCharge.isGratuity}
                          onChange={(e) => setNewCharge(prev => ({ ...prev, isGratuity: e.target.checked, isTax: false }))}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Gratuity</span>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="isTax" className="flex items-center">
                        <input
                          type="checkbox"
                          id="isTax"
                          name="isTax"
                          checked={newCharge.isTax}
                          onChange={(e) => setNewCharge(prev => ({ ...prev, isTax: e.target.checked, isGratuity: false }))}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Tax</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? 'Adding...' : 'Add Charge'}
                  <PlusCircle className="ml-2" size={18} />
                </button>
              </form>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Charges</h3>
                {charges.length === 0 ? (
                  <p className="text-gray-500">No charges added yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {charges.map((charge, index) => (
                      <li key={index} className="bg-white p-4 rounded-lg shadow-md transition duration-150 ease-in-out hover:shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={charge.paymentLabel}
                              onChange={(e) => handleEdit(index, { ...charge, paymentLabel: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input
                              type="number"
                              value={charge.amount}
                              onChange={(e) => handleEdit(index, { ...charge, amount: parseFloat(e.target.value) })}
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={charge.paymentType}
                              onChange={(e) => handleEdit(index, { ...charge, paymentType: e.target.value as 'percentage' | 'fixed' })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="fixed">Fixed ($)</option>
                              <option value="percentage">Percentage (%)</option>
                            </select>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={charge.isGratuity || false}
                                onChange={(e) => handleEdit(index, { ...charge, isGratuity: e.target.checked, isTax: false })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-600">Gratuity</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={charge.isTax || false}
                                onChange={(e) => handleEdit(index, { ...charge, isTax: e.target.checked, isGratuity: false })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-600">Tax</span>
                            </label>
                            <button
                              onClick={() => handleDelete(index)}
                              className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/3 p-8 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Real-time Invoice Preview</h3>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Sample Invoice</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Amount:</span>
                    <span className="font-medium">$100.00</span>
                  </div>
                  {charges.map((charge, index) => (
                    !charge.isGratuity && !charge.isTax && (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>{charge.paymentLabel}:</span>
                        <span className="font-medium">
                          {charge.paymentType === 'fixed' 
                            ? `$${charge.amount.toFixed(2)}` 
                            : `${charge.amount}% (${(100 * charge.amount / 100).toFixed(2)})`}
                        </span>
                      </div>
                    )
                  ))}
                  {(() => {
                    const { subtotal, taxes, tipAmount, finalTotal } = calculateInvoice(100);
                    return (
                      <>
                        <div className="flex justify-between text-gray-600 font-semibold">
                          <span>Subtotal:</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {taxes.map((tax, index) => (
                          <div key={index} className="flex justify-between text-gray-600">
                            <span>{tax.label}:</span>
                            <span>
                              {charges.find(c => c.paymentLabel === tax.label)?.paymentType === 'percentage'
                                ? `${charges.find(c => c.paymentLabel === tax.label)?.amount}% `
                                : ''}
                              (${tax.amount.toFixed(2)})
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-gray-600">
                          <span>Tip:</span>
                          <span>
                            {charges.find(c => c.isGratuity)?.paymentType === 'percentage'
                              ? `${charges.find(c => c.isGratuity)?.amount}% `
                              : ''}
                            (${tipAmount.toFixed(2)})
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2 font-bold flex justify-between text-gray-800">
                          <span>Final Total:</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                Note: This preview uses a base amount of $100 for demonstration purposes. Taxes are applied to the subtotal (sum of base amount and all fixed charges). Actual invoices will use the real service amount.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

