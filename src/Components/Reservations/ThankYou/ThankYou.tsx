"use client"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, Clock, Mail, Phone, Car, CarFrontIcon, User2, MailIcon, PhoneCall } from "lucide-react"
import { Button } from "@/Components/Common/FormComponents/Button"
import type { FormData } from "@/Types"
import { useRouter } from "next/navigation"
import { formatDate } from "@/Utils"

interface FinalStepProps {
  formData: FormData
}

export const ThankYouComponent = ({ formData }: FinalStepProps) => {
  const router = useRouter()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <CheckCircle className="text-green-500 w-24 h-24" />
        </motion.div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Thank You, {formData.name}!</h2>
          <p className="text-xl text-gray-600">Your quote request has been received.</p>
          <h3 className="text-2xl font-semibold text-gray-700">Order ID: #{formData.orderId}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="space-y-6" {...fadeInUp}>
            <h4 className="text-xl font-semibold text-gray-700">What&apos;s Next?</h4>
            <ul className="space-y-4">
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Calendar className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>We&apos;ve received your request and are processing it.</span>
              </motion.li>
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Our team is reviewing your details to provide the best quote.</span>
              </motion.li>
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>
                  You&apos;ll receive an email with your quote soon. Please check your spam folder if you don&apos;t see it in
                  your inbox.
                </span>
              </motion.li>
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Phone className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Our representative may contact you for any additional information.</span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div className="space-y-6" {...fadeInUp}>
            <h4 className="text-xl font-semibold text-gray-700">Your Request Summary</h4>
            <ul className="space-y-4">
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Car className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Service: {formData.serviceType || "Not specified"}</span>
              </motion.li>
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Calendar className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Date: {formatDate(formData.pickupDate)|| "Not specified"}</span>
              </motion.li>
              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Time: {formData.pickupTime || "Not specified"}</span>
              </motion.li>

              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <CarFrontIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Vehicle Type: {formData.vehicleType || "Not specified"}</span>
              </motion.li>

              {/* {formData.pickupAddress !== "" &&
                <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                  <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Pickup Address: {formData.pickupAddress || "Not specified"}</span>
                </motion.li>
              }

              {formData.pickupAirport !== "" &&
                <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                  <PlaneIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Pickup Airport: {formData.pickupAirport || "Not specified"}</span>
                </motion.li>
              }


              {formData.dropOffAddress !== "" &&
                <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                  <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Dropoff Address: {formData.dropOffAddress || "Not specified"}</span>
                </motion.li>
              }

              {formData.dropoffAirport !== "" &&
                <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                  <PlaneIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Dropoff Airport: {formData.dropoffAirport || "Not specified"}</span>
                </motion.li>
              } */}


              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <User2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Passenger Name: {formData.name || "Not specified"}</span>
              </motion.li>

              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <MailIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Email: {formData.email || "Not specified"}</span>
              </motion.li>

              <motion.li className="flex items-center space-x-3 text-gray-700" {...fadeInUp}>
                <PhoneCall className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Phone Number: {formData.phone || "Not specified"}</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-center text-gray-600">We appreciate your business and look forward to serving you!</p>
          <div className="flex justify-center space-x-4">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={() => {
                router.push("/reservation")
              }}
            >
              Get Another Quote
            </Button>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={() => {
                router.push("/")
              }}
            >
              Return to Home
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

