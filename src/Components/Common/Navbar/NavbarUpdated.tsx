"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm md:sticky md:top-0 md:z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Image src="/images/logo.png" alt="Logo" width={150} height={40} className="h-20 w-auto navbar-logo"/>
            </Link>

            {/* Desktop Navigation - Now left-aligned with logo */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-700">
                Home
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-700">
                About Us
              </Link>
              <Link href="/fleet" className="text-sm font-medium text-gray-700 hover:text-blue-700">
                Our Fleet
              </Link>
              <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-700">
                Services
              </Link>
              <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-blue-700">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Desktop Contact & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">(123) 456 7890</span>
            </div>
            <Link
              href="/reservation"
              className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-800"
            >
              Get Quote Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <nav className="pt-4 pb-2 border-t border-gray-200 mt-3">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-base font-medium text-gray-700 hover:text-blue-700 py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-gray-700 hover:text-blue-700 py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link
                href="/fleet"
                className="text-base font-medium text-gray-700 hover:text-blue-700 py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                Our Fleet
              </Link>
              <Link
                href="/services"
                className="text-base font-medium text-gray-700 hover:text-blue-700 py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                href="/faq"
                className="text-base font-medium text-gray-700 hover:text-blue-700 py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                FAQ
              </Link>

              {/* Quote Button - Now inside mobile menu */}
              <div className="pt-3 pb-2">
                <Link
                  href="/reservation"
                  className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-800 inline-block"
                  onClick={closeMenu}
                >
                  Get Quote Now
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex items-center py-2 px-2">
                  <Phone className="h-4 w-4 text-gray-500 mr-3" />
                  <a href="tel:+1234567890" className="text-base text-gray-700 hover:text-blue-700">
                    (123) 456 7890
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
