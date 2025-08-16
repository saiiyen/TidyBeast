import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookiePolicy = () => {
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
            <h1 className="text-2xl font-bold text-gray-900">Cookie Policy</h1>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners. This Cookie Policy explains how TidyBeast ("we," "our," or "us") uses cookies and similar technologies on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies for several purposes to enhance your experience on our website:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>To ensure our website functions properly and securely</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze website traffic and user behavior</li>
                <li>To improve our services and user experience</li>
                <li>To enable social media features and functionality</li>
                <li>To provide relevant content and advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">Essential Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are necessary for our website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. Without these cookies, our website cannot function properly.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Analytics Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's performance and user experience. These cookies collect information such as the number of visitors, which pages are visited most often, and how users move around the site.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Functional Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and login information. They may be set by us or by third-party providers whose services we use on our pages.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Marketing Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                These cookies track your online activity to help deliver more relevant advertisements and to limit the number of times you see an advertisement. They may be set by us or by third-party advertising partners with our permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use third-party services that set their own cookies on our website. These third parties may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><strong>Google Analytics:</strong> For website analytics and performance measurement</li>
                <li><strong>Social Media Platforms:</strong> For social media integration and sharing features</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Customer Support Tools:</strong> For providing customer assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookie Duration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies may be either "session" or "persistent" cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><strong>Session Cookies:</strong> These are temporary cookies that are deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> These remain on your device for a predetermined period or until you manually delete them</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control and manage cookies through your browser settings. Most web browsers allow you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>View what cookies have been set and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-2">Important Note</h3>
              <p className="text-gray-700 leading-relaxed">
                Please note that if you choose to block or delete cookies, some parts of our website may not function properly or may not be accessible. Essential cookies cannot be disabled if you want to use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Browser-Specific Instructions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For specific instructions on how to manage cookies in your browser, please refer to your browser's help documentation:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Google Chrome: Settings > Privacy and Security > Cookies and other site data</li>
                <li>Mozilla Firefox: Options > Privacy & Security > Cookies and Site Data</li>
                <li>Safari: Preferences > Privacy > Cookies and website data</li>
                <li>Microsoft Edge: Settings > Cookies and site permissions</li>
                <li>Internet Explorer: Tools > Internet Options > Privacy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Mobile Device Settings</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For mobile devices, you can usually find cookie settings in your mobile browser's settings menu:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><strong>iOS Safari:</strong> Settings > Safari > Block All Cookies</li>
                <li><strong>Android Chrome:</strong> Settings > Site Settings > Cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Do Not Track</h2>
              <p className="text-gray-700 leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature that lets you tell websites that you do not want your online activities tracked. Currently, there is no standard way for websites to respond to DNT signals. We may not respond to DNT signals at this time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Updates to This Cookie Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated policy on our website and update the "Last updated" date at the top of this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Your Consent</h2>
              <p className="text-gray-700 leading-relaxed">
                By continuing to use our website after we post any changes to this Cookie Policy, you accept our use of cookies as described in this policy. If you do not agree with our use of cookies, please discontinue use of our website or adjust your browser settings accordingly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                The information we collect through cookies is processed in accordance with our Privacy Policy. We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">TidyBeast</p>
                <p className="text-gray-700">Email: contact@tidybeast.com</p>
                <p className="text-gray-700">Phone: +91 99590 47238</p>
                <p className="text-gray-700">Service Areas: Hyderabad & Surrounding Areas</p>
              </div>
            </section>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Quick Tip:</strong> You can usually find your browser's cookie settings by looking for "Privacy," "Security," or "Cookies" in your browser's settings or preferences menu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
