import { CreditCard, TrendingUp, DollarSign, BarChart4 } from 'lucide-react'

export default function TipHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-3xl p-8 shadow-lg mt-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">Manage Tip Box</h1>
            <p className="text-indigo-200">Customize and control your tip box</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full py-2 px-4">
              <CreditCard className="mr-2" size={20} />
              <span className="text-sm font-medium">Payment</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full py-2 px-4">
              <TrendingUp className="mr-2" size={20} />
              <span className="text-sm font-medium">Tips</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-end">
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <DollarSign className="mr-2" size={24} />
              <span className="text-2xl font-semibold">Revenue Boost</span>
            </div>
            <p className="text-indigo-200">
              Optimize your strategy to increase overall revenue
            </p>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="w-64 h-32 relative">
              <BarChart4 className="w-full h-full text-indigo-300 opacity-50" />
              <div className="absolute inset-0 flex items-end justify-around">
                <div className="w-8 bg-white bg-opacity-80 rounded-t"></div>
                <div className="w-8 bg-white bg-opacity-80 rounded-t h-1/3"></div>
                <div className="w-8 bg-white bg-opacity-80 rounded-t h-2/3"></div>
                <div className="w-8 bg-white bg-opacity-80 rounded-t h-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

