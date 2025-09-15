"use client"
import { useEffect } from "react"

export default function ReservationsSection() {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      // Handle iframe height adjustment (when message is a number)
      if (typeof e.data === "number") {
        const iframe = document.getElementById("formFrame") as HTMLIFrameElement
        if (iframe) {
          iframe.style.height = `${e.data}px`
        }
      }

      // Handle redirect messages (when message is an object with type 'redirect')
      if (e.data && typeof e.data === "object" && e.data.type === "redirect") {
        window.location.href = e.data.url
      }

      // Handle scroll requests (when message is an object with type 'scrollToForm')
      if (e.data && typeof e.data === "object" && e.data.type === "scrollToForm") {
        const iframe = document.getElementById("formFrame") as HTMLIFrameElement
        if (iframe) {
          // Scroll to the top of the iframe with a small offset
          const iframePosition = iframe.getBoundingClientRect().top + window.pageYOffset
          const scrollToPosition = iframePosition - 110 // 50px offset from the top
          window.scrollTo({ top: scrollToPosition, behavior: "smooth" })
        }
      }
    }

    window.addEventListener("message", handleMessage, false)

    return () => {
      window.removeEventListener("message", handleMessage, false)
    }
  }, [])

  return (
    <div>
      <section className="sm: bg-gray-50 py-20 py-5 pt-10">
        <div className="container mx-auto flex flex-col-reverse items-center px-4 lg:flex-row">
          <div className="sm: mb-10 mt-10 lg:mb-0 lg:w-1/2">
            <div>
              <h1 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">Premium Limo & Car Services</h1>
              <p className="mb-8 text-xl text-gray-600">
                Enjoy first-class transportation with our luxurious fleet of SUVs, sedans, town cars, and stretch
                limousines. Whether you&apos;re traveling for business, a special event, or an airport transfer, we
                guarantee a seamless and stylish ride. Get an instant quote and book online today to unlock an exclusive
                10% discount. We proudly serve and nearby areas, including Marietta, Alpharetta, Sandy Springs, Augusta,
                Kennesaw, and Athens, GA. Need a long-distance ride? We also provide services to Savannah, Charlotte,
                and beyond.
              </p>
            </div>

            <div className="md: md: flex flex-wrap justify-center">
              <img src="/images/sed-new.png" width={"200px"} alt="car" />
              <img src="/images/sub.webp" width={"250px"} alt="car" />
              <img src="/images/van.webp" width={"200px"} alt="car" />
            </div>
          </div>
          <div className="form-container">
            <div className="rounded-lg bg-white shadow-lg sm:p-0 lg:p-6">
              <iframe id="formFrame" src="https://reservationform.vercel.app/"></iframe>
              
              {/* <iframe id="formFrame" src="http://localhost:3000/"></iframe> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}