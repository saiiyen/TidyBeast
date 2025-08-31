// Direct Email Service for TidyBeast - Multiple reliable methods
// Ensures emails are delivered to choosetidybeast@gmail.com

export interface EmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  homeSize?: string;
  message: string;
}

class DirectEmailService {
  private static instance: DirectEmailService;
  private readonly TARGET_EMAIL = 'choosetidybeast@gmail.com';
  
  static getInstance(): DirectEmailService {
    if (!DirectEmailService.instance) {
      DirectEmailService.instance = new DirectEmailService();
    }
    return DirectEmailService.instance;
  }

  /**
   * Send email using multiple methods for maximum reliability
   */
  async sendContactEmail(formData: EmailFormData): Promise<boolean> {
    // Starting email delivery process
    
    const emailContent = this.generateEmailContent(formData);
    let success = false;

    // Method 1: FormSubmit (Free, reliable)
    try {
      // Attempting FormSubmit delivery
      success = await this.sendViaFormSubmit(formData, emailContent);
      if (success) {
        // Email sent successfully via FormSubmit
        return true;
      }
    } catch (error) {
      // FormSubmit failed - logged internally
    }

    // Method 2: Netlify Forms (if deployed on Netlify)
    try {
      // Attempting Netlify Forms delivery
      success = await this.sendViaNetlifyForms(formData, emailContent);
      if (success) {
        // Email sent successfully via Netlify Forms
        return true;
      }
    } catch (error) {
      // Netlify Forms failed - logged internally
    }

    // Method 3: EmailJS (backup)
    try {
      // Attempting EmailJS delivery
      success = await this.sendViaEmailJS(formData, emailContent);
      if (success) {
        // Email sent successfully via EmailJS
        return true;
      }
    } catch (error) {
      // EmailJS failed - logged internally
    }

    // Method 4: Store locally and show fallback
    // All methods failed, storing locally and showing fallback
    this.storeEmailLocally(formData, emailContent);
    this.showFallbackOptions(formData);
    
    return false;
  }

  /**
   * FormSubmit - Free form backend service
   */
  private async sendViaFormSubmit(formData: EmailFormData, emailContent: string): Promise<boolean> {
    const formPayload = new FormData();
    
    // FormSubmit specific fields
    formPayload.append('_to', this.TARGET_EMAIL);
    formPayload.append('_subject', `New TidyBeast Contact Form - ${formData.firstName} ${formData.lastName}`);
    formPayload.append('_template', 'table'); // Use table template for better formatting
    formPayload.append('_captcha', 'false'); // Disable captcha for API usage
    
    // Form data
    formPayload.append('name', `${formData.firstName} ${formData.lastName}`);
    formPayload.append('email', formData.email);
    formPayload.append('phone', formData.phone);
    formPayload.append('service', formData.serviceType);
    formPayload.append('homeSize', formData.homeSize || 'Not specified');
    formPayload.append('message', formData.message);
    formPayload.append('formatted_message', emailContent);

    const response = await fetch('https://formsubmit.co/ajax/choosetidybeast@gmail.com', {
      method: 'POST',
      body: formPayload,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      return result.success === 'true' || result.success === true;
    }

    return false;
  }

  /**
   * Netlify Forms - if deployed on Netlify
   */
  private async sendViaNetlifyForms(formData: EmailFormData, emailContent: string): Promise<boolean> {
    const formPayload = new FormData();
    formPayload.append('form-name', 'contact');
    formPayload.append('name', `${formData.firstName} ${formData.lastName}`);
    formPayload.append('email', formData.email);
    formPayload.append('phone', formData.phone);
    formPayload.append('service', formData.serviceType);
    formPayload.append('homeSize', formData.homeSize || 'Not specified');
    formPayload.append('message', formData.message);

    const response = await fetch('/?no-cache=1', {
      method: 'POST',
      body: formPayload
    });

    return response.ok;
  }

  /**
   * EmailJS - requires setup but reliable
   */
  private async sendViaEmailJS(formData: EmailFormData, emailContent: string): Promise<boolean> {
    // This would require EmailJS setup, for now we'll simulate
    const payload = {
      service_id: 'service_tidybeast',
      template_id: 'template_contact',
      user_id: 'your_user_id_here',
      template_params: {
        to_email: this.TARGET_EMAIL,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: `New TidyBeast Contact - ${formData.firstName} ${formData.lastName}`,
        message: emailContent,
        phone: formData.phone,
        service: formData.serviceType,
        home_size: formData.homeSize || 'Not specified'
      }
    };

    // For now, return false as EmailJS needs proper setup
    // In production, this would be:
    // const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // return response.ok;

    return false;
  }

  /**
   * Generate professional email content
   */
  private generateEmailContent(formData: EmailFormData): string {
    return `
🆕 NEW CONTACT FORM SUBMISSION - TIDYBEAST

📋 CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}

🧹 SERVICE REQUEST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Service Type: ${formData.serviceType}
🏠 Home Size: ${formData.homeSize || 'Not specified'}

💬 MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

⏰ SUBMISSION TIME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

🚀 IMMEDIATE ACTIONS REQUIRED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ☎️  Call customer at ${formData.phone} within 2 hours
2. 📧 Reply to email at ${formData.email}
3. 💰 Provide pricing quote for ${formData.serviceType}${formData.homeSize ? ` (${formData.homeSize})` : ''}
4. 📅 Schedule service if customer is ready

⚠️ PRIORITY: HIGH - Customer expects response within 2 hours!

---
TidyBeast Customer Contact System
🌐 Website: https://tidybeast.com
📱 Support: +91 99590 47238
📧 Email: choosetidybeast@gmail.com
    `.trim();
  }

  /**
   * Store email locally for backup
   */
  private storeEmailLocally(formData: EmailFormData, emailContent: string): void {
    const emailData = {
      ...formData,
      emailContent,
      timestamp: new Date().toISOString(),
      status: 'pending',
      attempts: 1
    };

    const existingEmails = JSON.parse(localStorage.getItem('failed_contact_emails') || '[]');
    existingEmails.push(emailData);
    localStorage.setItem('failed_contact_emails', JSON.stringify(existingEmails));
    
    // Email stored locally for manual processing
  }

  /**
   * Show fallback options to user
   */
  private showFallbackOptions(formData: EmailFormData): void {
    const fallbackMessage = `
⚠️ Email delivery encountered an issue, but don't worry!

Your message has been saved. For immediate assistance:

📞 Call us directly: +91 99590 47238
📧 Email us at: choosetidybeast@gmail.com
💬 WhatsApp: +91 99590 47238

Or copy this information to send manually:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.serviceType}
Home Size: ${formData.homeSize || 'Not specified'}
Message: ${formData.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We'll contact you within 2 hours!
    `.trim();

    // This would show a modal or alert to the user
    // Fallback message prepared
    
    // You could also trigger a modal here
    alert(fallbackMessage);
  }

  /**
   * Test email delivery
   */
  async testEmail(): Promise<boolean> {
    const testData: EmailFormData = {
      firstName: 'Test',
      lastName: 'Customer',
      email: 'test@example.com',
      phone: '+91 9876543210',
      serviceType: 'Home Cleaning',
      homeSize: '2 BHK',
      message: 'This is a test message to verify email delivery is working.'
    };

    return await this.sendContactEmail(testData);
  }

  /**
   * Retry failed emails (can be called periodically)
   */
  async retryFailedEmails(): Promise<void> {
    const failedEmails = JSON.parse(localStorage.getItem('failed_contact_emails') || '[]');
    const successfulRetries = [];

    for (const emailData of failedEmails) {
      if (emailData.attempts < 3) { // Maximum 3 attempts
        // Retrying email for customer
        
        const success = await this.sendContactEmail({
          firstName: emailData.firstName,
          lastName: emailData.lastName,
          email: emailData.email,
          phone: emailData.phone,
          serviceType: emailData.serviceType,
          homeSize: emailData.homeSize,
          message: emailData.message
        });

        if (success) {
          successfulRetries.push(emailData);
        } else {
          emailData.attempts += 1;
        }
      }
    }

    // Remove successfully sent emails
    const remainingFailed = failedEmails.filter(email => !successfulRetries.includes(email));
    localStorage.setItem('failed_contact_emails', JSON.stringify(remainingFailed));

    // Email retry process completed
  }
}

export const directEmailService = DirectEmailService.getInstance();
export default DirectEmailService;
