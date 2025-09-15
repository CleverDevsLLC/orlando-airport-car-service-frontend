'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from '@/Components/Common/FormComponents/Card'
import { Input } from '@/Components/Common/FormComponents/Input'
import { MapPin, Plane, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { CompaniesForAllCompaniesType, VehicleForAllCompaniesType } from '@/Types'
import { getAllCompanies } from '@/Services/GET'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useRouter } from 'next/navigation'

export default function AllCompaniesComponent() {
  const [companies, setCompanies] = useState<CompaniesForAllCompaniesType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [token, setToken] = useState<string | null>(null)
  const companiesPerPage = 10
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem("limo-token"))
  }, [])

  useEffect(() => {
    const loadCompanies = async () => {
      if (!token) return
      try {
        const response = await getAllCompanies(token)
        if(response.status === 200){
            setCompanies(response.data)
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      loadCompanies()
    }
  }, [token])

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => 
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [companies, searchTerm])

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * companiesPerPage
    return filteredCompanies.slice(startIndex, startIndex + companiesPerPage)
  }, [filteredCompanies, currentPage])

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage)

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const handleManageCompany = (id: string | undefined, companyName: string) => {
    router.push(`/admin/managecompany?id=${id}&companyName=${encodeURIComponent(companyName)}`)
  }

  const VehicleDisplay = ({ vehicles }: { vehicles: VehicleForAllCompaniesType[] }) => {
    if (vehicles.length <= 2) {
      return (
        <div className="grid grid-cols-2 gap-4 h-[200px]">
          {vehicles.map((vehicle: VehicleForAllCompaniesType, index: number) => (
            <VehicleCard key={index} vehicle={vehicle} />
          ))}
        </div>
      )
    } else {
      return (
        <Swiper
          modules={[Navigation, SwiperPagination]}
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {vehicles.map((vehicle:VehicleForAllCompaniesType, index: number) => (
            <SwiperSlide key={index}>
              <VehicleCard vehicle={vehicle} />
            </SwiperSlide>
          ))}
        </Swiper>
      )
    }
  }

  const VehicleCard = ({ vehicle }: { vehicle: VehicleForAllCompaniesType }) => (
    <div className="bg-gray-100 p-3 rounded-lg h-[fit-content]">
      <img src={vehicle.image} alt={vehicle.vehicleType} className="w-full h-20 object-cover mb-2 rounded" />
      <p className="font-medium">{vehicle.vehicleType}</p>
      <p className="text-sm text-gray-600">{vehicle.noOfPassengers} passengers</p>
    </div>
  )

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisibleButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      )
    }

    return buttons
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 text-center w-[80%] m-auto border-[1px] border-gray-200 border-solid rounded-lg">
        <Input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md border-none"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Companies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && paginatedCompanies.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No companies found matching your search.</p>
        )}
        {paginatedCompanies.map((company) => (
          <Card key={company.id} className="overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{company.companyName}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Vehicles</h3>
                  <VehicleDisplay vehicles={company.typesOfVehicles} />
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{company.states.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{company.airports.join(', ')}</span>
                </div>
                <div className="flex space-x-2">
                  <div className='bg-gray-200 w-[70px] text-center rounded-xl'>
                    Min {company.minimumHours}h
                  </div>
                  <div className='bg-gray-200 w-[70px] text-center rounded-xl'>
                    Max {company.maxHours}h
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {company.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {company.phoneNumber}
                  </div>
                </div>
                <button className='w-[100%] bg-black text-white h-[45px] rounded-lg' onClick={() => handleManageCompany(company._id, company.companyName)}>
                  Manage Company
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="mx-4 flex">
          {renderPaginationButtons()}
        </div>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        Showing {Math.min(currentPage * companiesPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
      </div>
    </div>
  )
}

