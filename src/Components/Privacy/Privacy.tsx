import React from "react";
import { Shield, CreditCard, Mail, Phone } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mx-auto my-12 max-w-4xl rounded-lg bg-white p-8 shadow-2xl">
      <div className="mb-8 flex items-center justify-center">
        <Shield className="mr-3 h-8 w-8 text-gray-700" />
        <h2 className="text-3xl font-bold text-gray-800">Privacy Policy</h2>
      </div>

      <div className="space-y-8">
        {/* Contact Info Usage */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <Mail className="mr-2 h-6 w-6 text-gray-700" />
            <Phone className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Email, SMS, and Phone Usage
            </h3>
          </div>
          <p className="mb-4 text-gray-600">
            We collect your email address and phone number when you interact
            with our website to:
          </p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>
              Contact you about your transportation request or reservation.
            </li>
            <li>
              Send confirmations, updates, and other service-related messages
              via email or SMS.
            </li>
            <li>Offer the option to create a customer account.</li>
            <li>
              Send marketing and promotional messages if you opt in (you can opt
              out at any time).
            </li>
          </ul>
          <p className="mt-4 text-gray-600">
            Your contact information may be shared with drivers, affiliates, and
            service providers **strictly for the purpose of fulfilling your
            transportation service**.
          </p>
        </div>

        {/* Analytics & Tracking */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Data Collection & Tracking Technologies
            </h3>
          </div>
          <p className="mb-4 text-gray-600">
            We use tracking technologies such as cookies, web beacons, and
            similar tools for analytics, advertising, and performance
            monitoring. This includes:
          </p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>
              <strong>Google Analytics</strong> to understand user behavior and
              site performance.
            </li>
            <li>
              <strong>Google Ads</strong> for remarketing, conversion tracking,
              and campaign optimization.
            </li>
            <li>
              <strong>Google Tag Manager</strong> to manage all tags and
              tracking codes.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> to analyze user interaction for
              UX improvement.
            </li>
          </ul>
          <p className="mt-4 text-gray-600">
            By using our site, you consent to the use of cookies and similar
            technologies. You may disable cookies through your browser settings.
          </p>
        </div>

        {/* Payment Security */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <CreditCard className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Payment Security
            </h3>
          </div>
          <p className="text-gray-600">
            We process all online payments through trusted third-party payment
            processors such as Stripe and others. These payment gateways are
            PCI-DSS compliant and use encryption and other industry-standard
            security measures to protect your payment information.
            <br />
            <br />
            We do not store or have access to your full credit card details on
            our servers at any time. All sensitive payment information is
            handled directly by the payment processor.
          </p>
        </div>

        {/* Data Sharing Disclosure */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Data Sharing & Third Parties
            </h3>
          </div>
          <p className="text-gray-600">
            We may share your personal information with the following third
            parties, strictly for business and service-related purposes:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-2 text-gray-600">
            <li>
              Assigned drivers or affiliates who are completing your
              transportation request.
            </li>
            <li>
              Marketing platforms for communication (e.g., SMS, email
              providers).
            </li>
            <li>
              Analytics and tracking tools for internal optimization (e.g.,
              Google, Microsoft).
            </li>
          </ul>
          <p className="mt-4 text-gray-600">
            We do not sell your personal data. All data shared is limited to
            what is necessary for the service to function.
          </p>
        </div>

        {/* User Rights */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Your Privacy Rights
            </h3>
          </div>
          <p className="mb-4 text-gray-600">You have the right to:</p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>
              Access or request a copy of the personal data we have on file.
            </li>
            <li>
              Request corrections or deletion of your personal information.
            </li>
            <li>Opt out of marketing communications at any time.</li>
            <li>
              Request data portability or limit the use of your information.
            </li>
          </ul>
          <p className="mt-4 text-gray-600">
            To exercise these rights, please contact us via our contact form,
            email, or phone.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
