"use client"
import Link from "next/link"
import { useEffect } from "react"

export default function HeroSection() {
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
        <section className="py-12 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-[22px] sm:text-4xl font-bold mb-4 main-heading">
                            Get your <span className="text-blue-700">next ride</span> with us!
                        </h1>
                        <p className="text-gray-600 mb-6 main-para">
                            Affordable rides to LAX, Los Angeles, Cruise ship terminals, Disneyland and more!
                        </p>
                        <div className="hero-btn-section">
                            <p className="text-gray-600 mb-6 main-para">Get a quick quote below:</p>
                            <Link
                                href="/reservation"
                                className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 hero-btn"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                    <div className="form-container">
                        <div className="rounded-lg bg-white shadow-lg sm:p-0 ">
                            {/* <iframe id="formFrame" src="http://localhost:3000/"></iframe> */}
                            <iframe id="formFrame" src="https://reservation-form-v2-orlando-airport.vercel.app/"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
