import Link from "next/link";
import { MessageSquare, Bell, Phone } from "lucide-react";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Get Quote",
      description: "Get free estimates for your Orlando airport transportation needs",
      action: "Go to form",
      href: "#",
    },
    {
      icon: Bell,
      title: "Chat to support",
      description: "Connect with our transportation specialists anytime",
      action: "book@orlandosedanexpress.com",
      href: "mailto:book@orlandosedanexpress.com",
    },
    {
      icon: Phone,
      title: "Call us",
      description: "Mon-Fri from 8am to 5pm.",
      action: "+1 (407) 344-5566",
      href: "tel:+14073445566",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="mb-4 font-medium text-blue-600">Contact us</p>
          <h2 className="mb-6 text-4xl font-bold">
            We&apos;d love to hear from you
          </h2>
          <p className="text-lg text-gray-600">
            Our friendly team is always here to chat.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-24 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <div key={index} className="rounded-lg bg-gray-100 p-10 text-left">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700">
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{method.title}</h3>
              <p className="mb-4 leading-relaxed text-gray-600">
                {method.description}
              </p>
              {method.href.startsWith("tel:") ? (
                <a
                  href={method.href}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  {method.action}
                </a>
              ) : method.href.startsWith("mailto:") ? (
                <a
                  href={method.href}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  {method.action}
                </a>
              ) : (
                <Link
                  href={method.href}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  {method.action}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
