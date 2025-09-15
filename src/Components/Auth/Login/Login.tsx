"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { adminLogin } from "@/Services/POST"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function LoginComponent() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)

    const payload = {
      userName,
      password,
    }

    try {
      const response = await adminLogin(payload)
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem("limo-token", response.data.token)
        localStorage.setItem("acc_status", response.data.user.status)
        setMessage("Login successful!")
        setUserName("")
        setPassword("")
        console.log(response)

        if (response.data.user.status === "admin") {
          router.push("/admin")
        } else if (response.data.user.status === "company") {
          localStorage.setItem("companyId", response.data.user.companyId)
          router.push("/company/allbookings")
        }
      } else {
        setIsError(true)
        setMessage("Login failed. Please try again.")
      }
    } catch (error) {
      setIsError(true)
      setMessage("Login failed. Please try again.")
      console.error("Login error:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="relative flex flex-col justify-center bg-gray-800 p-12 text-white md:w-1/2">
        <div className="absolute inset-0 z-0">
          <Image src="/images/fleet-bg.jpg" alt="Background" layout="fill" objectFit="cover" className="opacity-20" />
        </div>
        <div className="relative z-10">
          <h1 className="mb-6 text-4xl font-bold">Admin Portal</h1>
          <p className="mb-8 text-xl">Manage your fleet and reservations with our powerful admin tools.</p>
          <ul className="list-inside list-disc space-y-2">
            <li>Oversee all limo reservations</li>
            <li>Manage your vehicle fleet</li>
            <li>Access real-time booking analytics</li>
            <li>Configure dynamic pricing strategies</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-[#F9FAFB] p-12 md:w-1/2">
        <div className="mx-auto w-full max-w-md shadow-2xl p-[40px] rounded-xl bg-white">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900">Login To Your Admin Panel</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
            <div>
              <Link href={"/admin/register"} className="text-indigo-600 text-center underline font-semibold">
                Register a new company
              </Link>
            </div>
          </form>

          {message && <div className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

