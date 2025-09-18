"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogOutIcon, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("limo-token"));
    setStatus(localStorage.getItem("acc_status"));
  }, []);

  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("limo-token");
    router.push("/");
  };

  const stickyStyle = `
  @media (max-width: 767px) {
    header {
      position: static !important;
    }
  }
`;

  console.log({ token });

  return (
    <>
      <style jsx>{stickyStyle}</style>
      <header className="bg-white shadow-sm md:sticky md:top-0 md:z-10">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href={"/"} className="flex items-center space-x-3">
                <p className="navbar-heading py-5 text-2xl font-semibold text-gray-700">
                  Testing Project
                </p>
              </Link>
            </div>
            <div className="hidden items-center space-x-6 lg:flex">
              {!token ? (
                <>
                  <Link href="/" className="text-gray-600 hover:text-gray-800">
                    Home
                  </Link>
                  <Link
                    href="/fleet"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Our Fleet
                  </Link>

                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Services
                  </Link>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    FAQ
                  </Link>

                  {/* <Link
                    href="/admin"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Company Login
                  </Link> */}
                  <Link
                    href="/reservation"
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    Quotes/Reservations
                  </Link>

                  <a
                    href="tel:+14044686938"
                    className="flex cursor-pointer items-center justify-center gap-2"
                  >
                    <PhoneCall /> (407) 344-5566
                  </a>
                </>
              ) : token && status === "admin" ? (
                <>
                  <Link
                    href="/admin/allbookings"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    All Leads
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    <LogOutIcon />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/company/allbookings"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Home
                  </Link>
                  <Link
                    href="/company/customers"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Customers
                  </Link>
                  <Link
                    href="/company/manage"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Manage Company
                  </Link>
                  <Link
                    href="/fleet"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Our Fleet
                  </Link>

                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Services
                  </Link>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    FAQ
                  </Link>

                  {/* <Link
                    href="/admin"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Company Login
                  </Link> */}
                  <Link
                    href="/reservation"
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    Quotes/Reservations
                  </Link>

                  <div className="flex justify-center">
                    <button
                      onClick={logout}
                      className="flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    >
                      <LogOutIcon />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="mt-4 space-y-4 lg:hidden">
              {!token ? (
                <>
                  <Link
                    href="/"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Home
                  </Link>
                  <Link
                    href="/fleet"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Our Fleet
                  </Link>

                  <Link
                    href="/services"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Services
                  </Link>

                  <Link
                    href="/about"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    About Us
                  </Link>

                  <Link
                    href="/faq"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    FAQ
                  </Link>

                  {/* <Link
                    href="/admin"
                    className="block text-gray-600 hover:text-gray-800"
                  >
                    Company Login
                  </Link> */}
                  <br />
                  <Link
                    href="/reservation"
                    className="block rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-600"
                  >
                    Quotes/Reservations
                  </Link>

                  <a
                    href="tel:4044686938"
                    className="flex cursor-pointer items-center justify-center gap-2 font-semibold"
                  >
                    <PhoneCall /> (407) 344-5566
                  </a>
                </>
              ) : token && status === "admin" ? (
                <>
                  <Link
                    href="/admin/allbookings"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    All Leads
                  </Link>
                  <button
                    onClick={logout}
                    className="mt-4 flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    <LogOutIcon />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/company/allbookings"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Home
                  </Link>
                  <Link
                    href="/company/customers"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Customers
                  </Link>
                  <Link
                    href="/company/manage"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Manage Company
                  </Link>
                  <Link
                    href="/fleet"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Our Fleet
                  </Link>

                  <Link
                    href="/services"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Services
                  </Link>

                  <Link
                    href="/about"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    About Us
                  </Link>

                  <Link
                    href="/faq"
                    className="block font-semibold text-gray-600 hover:text-gray-800"
                  >
                    FAQ
                  </Link>

                  {/* <Link
                    href="/admin"
                    className="block text-gray-600 hover:text-gray-800"
                  >
                    Company Login
                  </Link> */}
                  <br />
                  <Link
                    href="/reservation"
                    className="block rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-600"
                  >
                    Quotes/Reservations
                  </Link>
                  <button
                    onClick={logout}
                    className="mt-4 flex items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  >
                    <LogOutIcon />
                    Logout
                  </button>
                </>
              )}
              {/* <Link
              href="#reserve"
              className="block rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-600"
            >
              Reserve Now
            </Link> */}

              <br />
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
