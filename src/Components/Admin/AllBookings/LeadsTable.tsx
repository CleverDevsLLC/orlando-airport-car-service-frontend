'use client'

import { useState } from 'react'
import { Leads, SortConfig } from '@/Types'
import LeadDetailsModal from './LeadDetailsModal'
import { ChevronDown, ChevronUp, Search, Filter, ChevronLeft, ChevronRight, Building } from 'lucide-react'

interface LeadsTableProps {
  leads: Leads[],
  companyNamesArr: string[]
}

export default function LeadsTable({ leads: initialLeads, companyNamesArr }: LeadsTableProps) {
  const [leads] = useState<Leads[]>(initialLeads)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'leadRecieved', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLead, setSelectedLead] = useState<Leads | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'unpaid' | 'paid' | 'sent' | string>('all')
  const [companyFilter, setCompanyFilter] = useState<string>('all')
  const [companies] = useState<string[]>([...companyNamesArr])

  const itemsPerPage = 10

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortConfig.key === 'pickupDate') {
      const dateA = a.pickupDate ? new Date(a.pickupDate).getTime() : 0;
      const dateB = b.pickupDate ? new Date(b.pickupDate).getTime() : 0;
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
  
    const valueA = a[sortConfig.key] ?? ''; // Use default value if undefined
    const valueB = b[sortConfig.key] ?? ''; // Use default value if undefined
  
    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredLeads = sortedLeads.filter(lead => 
    (statusFilter === 'all' || lead.status === statusFilter) &&
    (companyFilter === 'all' || lead.companyName === companyFilter) &&
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lead.phone.includes(searchTerm))
  )

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)

  const handleSort = (key: keyof Leads) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 border-2 border-indigo-300 rounded-full focus:outline-none focus:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
          />
          <Search className="absolute left-4 top-3.5 text-indigo-400" size={20} />
        </div>
        <div className="relative w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white text-gray-800 border-2 border-indigo-300 rounded-full appearance-none focus:outline-none focus:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <option value="all">All Status</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="sent">Sent</option>
          </select>
          <Filter className="absolute left-4 top-3.5 text-indigo-400" size={20} />
        </div>
        <div className="relative w-full md:w-48">
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full rounded-md pl-12 pr-4 py-3 bg-white text-gray-800 border-2 border-indigo-300 appearance-none focus:outline-none focus:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <option value="all">All Companies</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>{company}</option>
            ))}
          </select>
          <Building className="absolute left-4 top-3.5 text-indigo-400" size={20} />
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <tr>
              {['Name', 'Email', 'Phone', 'Pickup Date', 'Lead Received', 'Status', 'Company', 'Action'].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  <button
                    onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Leads)}
                    className="flex items-center space-x-1 hover:text-indigo-200 transition-colors duration-200"
                  >
                    <span>{header}</span>
                    {sortConfig.key === header.toLowerCase().replace(' ', '') && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLeads.map((lead, index) => (
              <tr key={lead._id} className={`${index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'} hover:bg-indigo-100 transition-colors duration-150 ease-in-out`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.pickupDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.leadRecieved).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    lead.status === 'paid' ? 'bg-green-100 text-green-800' :
                    lead.status === 'unpaid' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 font-semibold"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-sm text-gray-700 font-medium">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 border border-indigo-300 rounded-full text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 border border-indigo-300 rounded-full text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {selectedLead && (
        <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  )
}

