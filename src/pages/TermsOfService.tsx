import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using TidyBeast's services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services. These Terms apply to all users of our cleaning services and website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TidyBeast provides professional cleaning services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Regular home cleaning services</li>
                <li>Deep cleaning services</li>
                <li>Office and commercial cleaning</li>
                <li>Move-in/move-out cleaning</li>
                <li>Post-construction cleanup</li>
                <li>Specialized cleaning services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Booking and Payment</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Booking Process</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All bookings must be made through our website, phone, or approved booking channels. We require advance payment for all services through our secure payment system.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Terms</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Payment is required in advance of service delivery</li>
                <li>Accepted payment methods include UPI, digital wallets, and bank transfers</li>
                <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>Payment confirmation is required to secure your booking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Service Delivery</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Access and Preparation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Customers must provide safe and reasonable access to the premises. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Ensuring someone is present to provide access or arrangements are made for key access</li>
                <li>Securing or removing valuable and fragile items</li>
                <li>Informing us of any pets, special requirements, or hazards</li>
                <li>Providing basic utilities (water, electricity) if required</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Service Standards</h3>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide high-quality cleaning services according to industry standards. Service quality may vary based on the condition of the premises and specific requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cancellation and Rescheduling</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Cancellations must be made at least 24 hours before the scheduled service</li>
                <li>Same-day cancellations may incur a cancellation fee</li>
                <li>Rescheduling is subject to availability and must be requested in advance</li>
                <li>Refunds for advance payments will be processed according to our refund policy</li>
                <li>We reserve the right to cancel services due to unsafe conditions or other reasonable circumstances</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Liability and Insurance</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Our Liability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We maintain appropriate insurance coverage and take reasonable precautions to protect your property. However, our liability is limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Direct damages caused by our negligence during service delivery</li>
                <li>Maximum liability not exceeding the cost of the service provided</li>
                <li>Claims must be reported within 48 hours of service completion</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Responsibility</h3>
              <p className="text-gray-700 leading-relaxed">
                Customers are responsible for securing valuable items, informing us of special conditions, and ensuring the safety of our staff during service delivery.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Quality Guarantee</h2>
              <p className="text-gray-700 leading-relaxed">
                We stand behind the quality of our work. If you are not satisfied with our service, please contact us within 24 hours of service completion. We will work with you to address any legitimate concerns and may provide re-cleaning services where appropriate.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Privacy and Confidentiality</h2>
              <p className="text-gray-700 leading-relaxed">
                We respect your privacy and maintain confidentiality of your personal information and property details. Our staff are trained to maintain professional discretion. Please refer to our Privacy Policy for detailed information about data handling.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our services for any unlawful purposes or in violation of these Terms. Prohibited activities include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Providing false or misleading information</li>
                <li>Interfering with our service delivery or staff</li>
                <li>Using our services for illegal activities</li>
                <li>Attempting to damage our reputation or business</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Service Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. We will provide reasonable notice of significant changes that may affect existing bookings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on our website, including text, graphics, logos, and images, is the property of TidyBeast or our licensors and is protected by copyright and other intellectual property laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from these Terms or our services shall be resolved through good faith negotiations. If resolution cannot be achieved, disputes will be subject to the jurisdiction of courts in Hyderabad, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Updated Terms will be posted on our website with the revision date. Your continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">15. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding shall be brought in the courts of Hyderabad, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">TidyBeast</p>
                <p className="text-gray-700">Email: contact@tidybeast.com</p>
                <p className="text-gray-700">Phone: +91 99590 47238</p>
                <p className="text-gray-700">Service Areas: Hyderabad & Surrounding Areas</p>
              </div>
            </section>

            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <p className="text-teal-800 text-sm">
                By using TidyBeast's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
