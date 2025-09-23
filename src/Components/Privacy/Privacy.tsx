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
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <Mail className="mr-2 h-6 w-6 text-gray-700" />
            <Phone className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Email and Phone Usage
            </h3>
          </div>
          <p className="mb-4 text-gray-600">
            Email addresses and telephone numbers obtained by
            orlandoairportcarservice.com website are only used to contact you
            regarding:
          </p>
          <ol className="ml-4 list-inside list-decimal space-y-2 text-gray-600">
            <li>
              The transportation request which you have submitted, until such
              time as you have indicated to us whether you wish to accept or
              decline our bid;
            </li>
            <li>
              Offering you the option to setup of a customer account with us, if
              you did accept a bid from us;
            </li>
            <li>
              Promotional offers, if you chose to setup an account with us and
              did not opt out of receiving such offers at the time of setting up
              the account or at anytime afterwards.
            </li>
          </ol>
        </div>

        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center">
            <CreditCard className="mr-2 h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">
              Payment Security
            </h3>
          </div>
          <p className="text-gray-600">
            When you choose to use a credit card to pay online for services
            ordered on this website, your payment will be collected in a way
            which adheres to international PCI (payment card industry)
            compliance standards for data security. (This includes any forms of
            online payment we may offer.)
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
