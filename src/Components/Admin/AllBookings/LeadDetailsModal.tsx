import { Leads } from "@/Types"
import { XIcon, User, Mail, Phone, Calendar, Clock, MapPin, Plane, Users, Car, Briefcase, FileText, Building, Tag, CalendarIcon } from 'lucide-react'

interface LeadDetailsModalProps {
  lead: Leads
  onClose: () => void
}

export default function LeadDetailsModal({ lead, onClose }: LeadDetailsModalProps) {
  const sections = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        { icon: User, label: "Name", value: lead.name },
        { icon: Mail, label: "Email", value: lead.email },
        { icon: Phone, label: "Phone", value: lead.phone },
      ]
    },
    {
      title: "Trip Details",
      icon: Briefcase,
      fields: [
        { icon: Tag, label: "Service Type", value: lead.serviceType },
        { icon: Car, label: "Vehicle Type", value: lead.vehicleType },
        { icon: Clock, label: "Trip Duration", value: lead.tripDuration },
        { icon: Users, label: "Number of Passengers", value: lead.numberOfPassengers },
        { icon: Users, label: "Passenger Names", value: lead.passengerNames },
        { icon: Briefcase, label: "Trip Purpose", value: lead.tripPurpose },
        { icon: FileText, label: "Additional Notes", value: lead.additionalNotes },
      ]
    },
    {
      title: "Pickup Details",
      icon: MapPin,
      fields: [
        { icon: MapPin, label: "Pickup City", value: lead.pickupCity },
        { icon: MapPin, label: "Pickup State", value: lead.pickupState },
        { icon: MapPin, label: "Pickup Address", value: lead.pickupAddress },
        { icon: Calendar, label: "Pickup Date", value: lead.pickupDate },
        { icon: Clock, label: "Pickup Time", value: lead.pickupTime },
        { icon: Plane, label: "Pickup Airport", value: lead.pickupAirport },
      ]
    },
    {
      title: "Dropoff Details",
      icon: MapPin,
      fields: [
        { icon: MapPin, label: "Dropoff City", value: lead.dropoffCity },
        { icon: MapPin, label: "Dropoff State", value: lead.dropoffState },
        { icon: MapPin, label: "Dropoff Address", value: lead.dropOffAddress },
        { icon: Plane, label: "Dropoff Airport", value: lead.dropoffAirport },
        { icon: Clock, label: "Dropoff Departure Time", value: lead.dropOffDepartureTime },
      ]
    },
    { 
      title: "Airline Information",
      icon: Plane,
      fields: [
        { icon: Plane, label: "Airline Name", value: lead.airlineName },
        { icon: Clock, label: "Airline Departure Time", value: lead.airlineDepartureTime },
        { icon: Clock, label: "Airline Arrival Time", value: lead.airlineArrivalTime },
        { icon: Plane, label: "Dropoff Airline", value: lead.dropoffAirline },
      ]
    },
    {
      title: "Return Trip",
      icon: CalendarIcon,
      fields: [
        { icon: CalendarIcon, label: "Return Date", value: lead.returnDate },
        { icon: Clock, label: "Return Time", value: lead.returnTime },
        { icon: MapPin, label: "Return Pickup Address", value: lead.returnPickupAddress },
        { icon: MapPin, label: "Return Dropoff Address", value: lead.returnDropoffAddress },
        { icon: Clock, label: "Return Departure Time", value: lead.returnDepartureTime },
        { icon: Plane, label: "Return Dropoff Airport", value: lead.returnDropoffAirport },
        { icon: Plane, label: "Return Airline", value: lead.returnAirline },
      ]
    },
    {
      title: "Company Information",
      icon: Building,
      fields: [
        { icon: Building, label: "Company Name", value: lead.companyName },
        { icon: Mail, label: "Company Email", value: lead.companyEmail },
        { icon: Phone, label: "Company Phone Number", value: lead.companyPhoneNumber },
      ]
    },
    {
      title: "Lead Information",
      icon: Tag,
      fields: [
        { icon: Tag, label: "Status", value: lead.status },
        { icon: CalendarIcon, label: "Lead Received", value: lead.leadRecieved ? new Date(lead.leadRecieved).toLocaleString() : undefined },
      ]
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-8 max-w-6xl w-full shadow-2xl transform transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">Lead Details</h2>
          <button
            onClick={onClose}
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 rounded-full p-2 hover:bg-indigo-200"
          >
            <XIcon size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="p-4 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-indigo-700">
                <section.icon className="w-6 h-6 mr-2 text-indigo-600" />
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.fields.map((item, index) =>
                  item.value && (
                    <div key={index} className="flex items-start space-x-3 bg-white bg-opacity-60 p-2 rounded-lg">
                      <item.icon className="w-5 h-5 text-indigo-500 mt-1" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-indigo-600">{item.label}</span>
                        <span className="text-base text-gray-800">{item.value}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

