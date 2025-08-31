// Email Service for TidyBeast
// Handles actual email forwarding using EmailJS or similar service

export interface EmailData {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
}

class EmailService {
  private static instance: EmailService;
  private readonly TARGET_EMAIL = 'choosetidybeast@gmail.com';
  
  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Send email using EmailJS (requires setup)
   * For now, we'll use a FormSpree endpoint as a backup
   */
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // Method 1: Try FormSpree (simple and free)
      const formData = new FormData();
      formData.append('email', emailData.from_email || 'noreply@tidybeast.com');
      formData.append('subject', emailData.subject);
      formData.append('message', emailData.message);
      formData.append('_replyto', emailData.reply_to || emailData.from_email || 'noreply@tidybeast.com');

      // Using Formspree as backup email forwarding service
      const response = await fetch('https://formspree.io/f/xpwzgqko', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log('✅ Email sent successfully via Formspree');
        return true;
      }

      // Method 2: Fallback to a webhook service
      await this.sendViaWebhook(emailData);
      return true;

    } catch (error) {
      console.error('❌ Email service error:', error);
      
      // Method 3: Store locally for manual processing
      this.storeEmailLocally(emailData);
      return false;
    }
  }

  /**
   * Send via webhook service (backup method)
   */
  private async sendViaWebhook(emailData: EmailData): Promise<void> {
    const webhookPayload = {
      to: this.TARGET_EMAIL,
      subject: emailData.subject,
      text: emailData.message,
      from: emailData.from_email || 'noreply@tidybeast.com',
      replyTo: emailData.reply_to || emailData.from_email
    };

    // This would be replaced with actual webhook URL
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your-webhook-id/';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      console.log('✅ Email sent successfully via webhook');
    } catch (error) {
      console.error('❌ Webhook email failed:', error);
      throw error;
    }
  }

  /**
   * Store email locally for manual processing
   */
  private storeEmailLocally(emailData: EmailData): void {
    const emails = JSON.parse(localStorage.getItem('pending_emails') || '[]');
    emails.push({
      ...emailData,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('pending_emails', JSON.stringify(emails));
    console.log('📧 Email stored locally for manual processing');
  }

  /**
   * Send contact form email
   */
  async sendContactFormEmail(contactData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    service_type: string;
    home_size?: string;
    message: string;
  }): Promise<boolean> {
    const emailContent = `
NEW CONTACT FORM SUBMISSION - TidyBeast

📋 CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${contactData.first_name} ${contactData.last_name}
📧 Email: ${contactData.email}
📞 Phone: ${contactData.phone}

🧹 SERVICE REQUEST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Service Type: ${contactData.service_type}
🏠 Home Size: ${contactData.home_size || 'Not specified'}

💬 MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${contactData.message}

⏰ SUBMISSION TIME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Submitted: ${new Date().toLocaleString('en-IN')}

🚀 NEXT ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contact customer at ${contactData.phone}
2. Respond to email at ${contactData.email}
3. Provide quote for ${contactData.service_type}
4. Follow up within 2 hours as promised

---
TidyBeast Automated Contact System
🌐 https://tidybeast.com
📱 +91 99590 47238
    `.trim();

    return await this.sendEmail({
      to_email: this.TARGET_EMAIL,
      to_name: 'TidyBeast Admin',
      subject: `New Contact Form Submission - ${contactData.first_name} ${contactData.last_name}`,
      message: emailContent,
      from_email: contactData.email,
      from_name: `${contactData.first_name} ${contactData.last_name}`,
      reply_to: contactData.email
    });
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmationEmail(bookingData: {
    id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    service_type: string;
    service_name: string;
    home_size?: string;
    address: string;
    date: string;
    time: string;
    price: number;
    special_requirements?: string;
    transaction_id: string;
  }): Promise<boolean> {
    const emailContent = `
🎉 NEW TIDYBEAST BOOKING CONFIRMED!

📋 BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Booking ID: ${bookingData.id}
💰 Amount Paid: ₹${bookingData.price.toLocaleString()}
🔐 Transaction ID: ${bookingData.transaction_id}

👤 CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💼 Name: ${bookingData.user_name}
📞 Phone: ${bookingData.user_phone}
📧 Email: ${bookingData.user_email}
🏠 Address: ${bookingData.address}

🧹 SERVICE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Service: ${bookingData.service_name}
🏠 Home Size: ${bookingData.home_size || 'Not specified'}
📅 Date: ${bookingData.date}
⏰ Time: ${bookingData.time}
💼 Type: ${bookingData.service_type}
${bookingData.special_requirements ? `📝 Special Requirements: ${bookingData.special_requirements}` : ''}

⚡ BOOKING STATUS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Payment Status: COMPLETED
📌 Booking Status: CONFIRMED
🕐 Confirmed: ${new Date().toLocaleString('en-IN')}

🚀 NEXT ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contact customer at ${bookingData.user_phone}
2. Confirm service details and schedule
3. Prepare cleaning team assignment
4. Send service reminder to customer

📊 This booking has been automatically processed and confirmed.

---
TidyBeast Automated Booking System
🌐 https://tidybeast.com
📱 +91 99590 47238
    `.trim();

    return await this.sendEmail({
      to_email: this.TARGET_EMAIL,
      to_name: 'TidyBeast Admin',
      subject: `New TidyBeast Booking Confirmed - ${bookingData.id}`,
      message: emailContent,
      from_email: bookingData.user_email,
      from_name: bookingData.user_name,
      reply_to: bookingData.user_email
    });
  }

  /**
   * Test email functionality
   */
  async testEmail(): Promise<boolean> {
    return await this.sendEmail({
      to_email: this.TARGET_EMAIL,
      to_name: 'TidyBeast Admin',
      subject: 'TidyBeast Email Service Test',
      message: 'This is a test email to verify the email service is working correctly.',
      from_email: 'test@tidybeast.com',
      from_name: 'TidyBeast Test'
    });
  }
}

export const emailService = EmailService.getInstance();
export default EmailService;
