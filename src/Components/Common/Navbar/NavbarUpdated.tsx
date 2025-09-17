"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm md:sticky md:top-0 md:z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={40}
                className="navbar-logo h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Now left-aligned with logo */}
            <nav className="hidden space-x-6 md:flex">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                About Us
              </Link>
              <Link
                href="/fleet"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                Our Fleet
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                Services
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Desktop Contact & CTA */}
          <div className="hidden items-center space-x-4 md:flex">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">(407) 344-5566</span>
            </div>
            <Link
              href="/reservation"
              className="rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Get Quote Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "visible max-h-96 opacity-100"
              : "invisible max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <nav className="mt-3 border-t border-gray-200 pb-2 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="rounded-md px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link
                href="/fleet"
                className="rounded-md px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                onClick={closeMenu}
              >
                Our Fleet
              </Link>
              <Link
                href="/services"
                className="rounded-md px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                href="/faq"
                className="rounded-md px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                onClick={closeMenu}
              >
                FAQ
              </Link>

              {/* Quote Button - Now inside mobile menu */}
              <div className="pb-2 pt-3">
                <Link
                  href="/reservation"
                  className="inline-block rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                  onClick={closeMenu}
                >
                  Get Quote Now
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-3 border-t border-gray-200 pt-3">
                <div className="flex items-center px-2 py-2">
                  <Phone className="mr-3 h-4 w-4 text-gray-500" />
                  <a
                    href="tel:+4073445566"
                    className="text-base text-gray-700 hover:text-blue-700"
                  >
                    (407) 344-5566
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
