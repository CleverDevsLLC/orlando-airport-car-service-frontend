import React from 'react';
import { Shield, CreditCard, Mail, Phone } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-lg shadow-2xl">
      <div className="flex items-center justify-center mb-8">
        <Shield className="w-8 h-8 text-gray-700 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Privacy Policy</h2>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-gray-700 mr-2" />
            <Phone className="w-6 h-6 text-gray-700 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Email and Phone Usage</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Email addresses and telephone numbers obtained by the xyz.com website are only used to contact you regarding:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
            <li>The transportation request which you have submitted, until such time as you have indicated to us whether you wish to accept or decline our bid;</li>
            <li>Offering you the option to setup of a customer account with us, if you did accept a bid from us;</li>
            <li>Promotional offers, if you chose to setup an account with us and did not opt out of receiving such offers at the time of setting up the account or at anytime afterwards.</li>
          </ol>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-gray-700 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Payment Security</h3>
          </div>
          <p className="text-gray-600">
            When you choose to use a credit card to pay online for services ordered on this website, your payment will be collected in a way which adheres to international PCI (payment card industry) compliance standards for data security. (This includes any forms of online payment we may offer.)
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

