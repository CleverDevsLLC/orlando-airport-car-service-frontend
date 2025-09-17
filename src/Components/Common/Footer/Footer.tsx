import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Limo Service</h3>
              <p className="mb-4">
                Enjoy unmatched comfort and elegance with our top-tier limo
                services.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fleet"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    Fleet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reservation"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    Company Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-semibold">Contact Us</h4>
              <p className="mb-2">
                Phone: <a href="tel:407344-5566">(407) 344-5566</a>
              </p>
              <img src="/images/payment.jpg" width={150} />
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} Limo Service. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
      <br />
      <center>
        <p>
          Website design and marketing powered By:{" "}
          <Link href={"https://www.limoflow.com/"} className="font-semibold">
            Limo Flow
          </Link>
        </p>
      </center>
    </>
  );
}
