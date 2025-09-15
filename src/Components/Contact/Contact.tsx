import Link from "next/link"
import { MessageSquare, Bell, Phone } from "lucide-react"

export default function ContactSection() {
  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Get Quote",
      description: "Fill in the form.",
      action: "Go to form",
      href: "/quote",
    },
    {
      icon: Bell,
      title: "Chat to support",
      description: "We're here to help.",
      action: "support@limoflow.com",
      href: "mailto:support@limoflow.com",
    },
    {
      icon: Phone,
      title: "Call us",
      description: "Mon-Fri from 8am to 5pm.",
      action: "+1 (555) 000-0000",
      href: "tel:+15550000000",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="text-blue-600 font-medium mb-4">Contact us</p>
          <h2 className="text-4xl font-bold mb-6">We&apos;d love to hear from you</h2>
          <p className="text-gray-600 text-lg">Our friendly team is always here to chat.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-24 max-w-7xl mx-auto">
          {contactMethods.map((method, index) => (
            <div key={index} className="text-left bg-gray-100 p-10 rounded-lg">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-8">
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
              {method.href.startsWith("tel:") ? (
                <a href={method.href} className="text-blue-600 font-medium hover:text-blue-700">
                  {method.action}
                </a>
              ) : method.href.startsWith("mailto:") ? (
                <a href={method.href} className="text-blue-600 font-medium hover:text-blue-700">
                  {method.action}
                </a>
              ) : (
                <Link href={method.href} className="text-blue-600 font-medium hover:text-blue-700">
                  {method.action}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
