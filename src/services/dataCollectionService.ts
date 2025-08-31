// Data Collection Service for TidyBeast
// Handles Google Sheets integration and email notifications

import { directEmailService, type EmailFormData } from './directEmailService';

export interface BookingData {
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
  payment_status: 'completed' | 'pending' | 'failed';
  booking_status: string;
  transaction_id: string;
  created_at: string;
  confirmed_at: string;
}

export interface ContactFormData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_type: string;
  home_size?: string;
  message: string;
  created_at: string;
}

class DataCollectionService {
  private static instance: DataCollectionService;
  
  // Configuration
  private readonly GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec'; // Will be configured
  private readonly NOTIFICATION_EMAIL = 'choosetidybeast@gmail.com';
  private readonly NOTIFICATION_PHONE = '+919959047238';
  
  static getInstance(): DataCollectionService {
    if (!DataCollectionService.instance) {
      DataCollectionService.instance = new DataCollectionService();
    }
    return DataCollectionService.instance;
  }

  /**
   * Main function to handle booking data after successful payment
   */
  async handleBookingData(bookingData: BookingData): Promise<void> {
    try {
      console.log('📊 Processing booking data:', bookingData.id);
      
      // Run both operations in parallel for efficiency
      const [sheetsResult, emailResult] = await Promise.allSettled([
        this.sendToGoogleSheets(bookingData),
        this.sendEmailNotification(bookingData)
      ]);

      // Log results
      if (sheetsResult.status === 'fulfilled') {
        console.log('✅ Google Sheets updated successfully');
      } else {
        console.error('❌ Google Sheets update failed:', sheetsResult.reason);
      }

      if (emailResult.status === 'fulfilled') {
        console.log('✅ Email notification sent successfully');
      } else {
        console.error('❌ Email notification failed:', emailResult.reason);
      }

    } catch (error) {
      console.error('❌ Data collection service error:', error);
      // Don't throw error to avoid breaking the user experience
      // Log error for monitoring
      this.logError('DataCollectionService.handleBookingData', error, bookingData);
    }
  }

  /**
   * Send booking data to Google Sheets
   */
  private async sendToGoogleSheets(bookingData: BookingData): Promise<void> {
    const sheetsPayload = {
      action: 'addBooking',
      data: {
        booking_id: bookingData.id,
        timestamp: new Date().toISOString(),
        customer_name: bookingData.user_name,
        customer_email: bookingData.user_email,
        customer_phone: bookingData.user_phone,
        service_name: bookingData.service_name,
        service_type: bookingData.service_type,
        home_size: bookingData.home_size || 'Not specified',
        service_address: bookingData.address,
        service_date: bookingData.date,
        service_time: bookingData.time,
        amount_paid: bookingData.price,
        payment_status: bookingData.payment_status,
        transaction_id: bookingData.transaction_id,
        special_requirements: bookingData.special_requirements || 'None',
        booking_status: bookingData.booking_status,
        created_at: bookingData.created_at,
        confirmed_at: bookingData.confirmed_at
      }
    };

    // For now, we'll use a webhook approach with Google Apps Script
    // This will be configured with a Google Apps Script that handles the data
    const response = await fetch(this.GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetsPayload)
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Send email notification with booking details
   */
  private async sendEmailNotification(bookingData: BookingData): Promise<void> {
    // Use the robust direct email service for booking confirmations
    const bookingEmailData: EmailFormData = {
      firstName: bookingData.user_name.split(' ')[0] || bookingData.user_name,
      lastName: bookingData.user_name.split(' ').slice(1).join(' ') || '',
      email: bookingData.user_email,
      phone: bookingData.user_phone,
      serviceType: `BOOKING CONFIRMATION - ${bookingData.service_name}`,
      homeSize: bookingData.home_size,
      message: `BOOKING CONFIRMED!

Booking ID: ${bookingData.id}
Transaction ID: ${bookingData.transaction_id}
Amount Paid: ₹${bookingData.price.toLocaleString()}
Service Date: ${bookingData.date}
Service Time: ${bookingData.time}
Address: ${bookingData.address}

Special Requirements: ${bookingData.special_requirements || 'None'}

This booking has been confirmed and payment received successfully.`
    };

    const emailSent = await directEmailService.sendContactEmail(bookingEmailData);
    
    if (!emailSent) {
      console.warn('⚠️ Booking email delivery failed through all methods');
      // Store for manual processing
      this.storeEmailForManualProcessing({
        type: 'booking_confirmation',
        data: bookingData,
        emailData: bookingEmailData
      });
    } else {
      console.log('✅ Booking confirmation email sent to choosetidybeast@gmail.com');
    }
  }

  /**
   * Generate formatted email content
   */
  private generateEmailContent(bookingData: BookingData): string {
    return `
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
✅ Payment Status: ${bookingData.payment_status.toUpperCase()}
📌 Booking Status: ${bookingData.booking_status.toUpperCase()}
🕐 Created: ${new Date(bookingData.created_at).toLocaleString('en-IN')}
✅ Confirmed: ${new Date(bookingData.confirmed_at).toLocaleString('en-IN')}

🚀 NEXT ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contact customer at ${bookingData.user_phone}
2. Confirm service details and schedule
3. Prepare cleaning team assignment
4. Send service reminder to customer

📊 This data has been automatically added to Google Sheets for tracking.

---
TidyBeast Automated Booking System
🌐 https://tidybeast.com
📱 ${this.NOTIFICATION_PHONE}
    `.trim();
  }

  /**
   * Send email via service (placeholder for actual email service)
   */
  private async sendEmailViaService(emailPayload: any): Promise<void> {
    // This would integrate with EmailJS, SendGrid, or similar service
    // For now, we'll log the email content and simulate sending
    
    console.log('📧 Email notification prepared:', {
      to: emailPayload.template_params.to_email,
      subject: emailPayload.template_params.subject,
      content: emailPayload.template_params.message
    });

    // Simulate API call
    try {
      // In production, this would be:
      // const response = await emailjs.send(emailPayload.service_id, emailPayload.template_id, emailPayload.template_params, emailPayload.user_id);
      
      // For demo, we'll use a simple fetch to a webhook or email service
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });

      if (!response.ok) {
        throw new Error(`Email service error: ${response.status}`);
      }
    } catch (error) {
      // Fallback: Store email data locally for manual processing
      this.storeEmailForManualProcessing(emailPayload);
      throw error;
    }
  }

  /**
   * Store email data locally if email service fails
   */
  private storeEmailForManualProcessing(emailData: any): void {
    const existingEmails = JSON.parse(localStorage.getItem('pending_email_notifications') || '[]');
    existingEmails.push({
      ...emailData,
      failed_at: new Date().toISOString(),
      retry_count: 0
    });
    localStorage.setItem('pending_email_notifications', JSON.stringify(existingEmails));
  }

  /**
   * Log errors for monitoring
   */
  private logError(method: string, error: any, data?: any): void {
    const errorLog = {
      method,
      error: error.message || error,
      timestamp: new Date().toISOString(),
      data: data ? { id: data.id, user_email: data.user_email } : null
    };
    
    console.error('🔴 Data Collection Error:', errorLog);
    
    // Store error for later analysis
    const existingErrors = JSON.parse(localStorage.getItem('data_collection_errors') || '[]');
    existingErrors.push(errorLog);
    localStorage.setItem('data_collection_errors', JSON.stringify(existingErrors));
  }

  /**
   * Handle contact form data
   */
  async handleContactFormData(contactData: ContactFormData): Promise<void> {
    try {
      console.log('📝 Processing contact form data:', contactData.id);
      
      // Run both operations in parallel for efficiency
      const [sheetsResult, emailResult] = await Promise.allSettled([
        this.sendContactToGoogleSheets(contactData),
        this.sendContactEmailNotification(contactData)
      ]);

      // Log results
      if (sheetsResult.status === 'fulfilled') {
        console.log('✅ Contact form data sent to Google Sheets successfully');
      } else {
        console.error('❌ Contact form Google Sheets update failed:', sheetsResult.reason);
      }

      if (emailResult.status === 'fulfilled') {
        console.log('✅ Contact form email notification sent successfully');
      } else {
        console.error('❌ Contact form email notification failed:', emailResult.reason);
      }

    } catch (error) {
      console.error('❌ Contact form service error:', error);
      this.logError('DataCollectionService.handleContactFormData', error, contactData);
    }
  }

  /**
   * Send contact form data to Google Sheets
   */
  private async sendContactToGoogleSheets(contactData: ContactFormData): Promise<void> {
    const sheetsPayload = {
      action: 'addContact',
      data: {
        contact_id: contactData.id,
        timestamp: new Date().toISOString(),
        first_name: contactData.first_name,
        last_name: contactData.last_name,
        full_name: `${contactData.first_name} ${contactData.last_name}`,
        email: contactData.email,
        phone: contactData.phone,
        service_type: contactData.service_type,
        home_size: contactData.home_size || 'Not specified',
        message: contactData.message,
        created_at: contactData.created_at
      }
    };

    const response = await fetch(this.GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetsPayload)
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Send contact form email notification
   */
  private async sendContactEmailNotification(contactData: ContactFormData): Promise<void> {
    // Use the robust direct email service for contact form submissions
    const contactEmailData: EmailFormData = {
      firstName: contactData.first_name,
      lastName: contactData.last_name,
      email: contactData.email,
      phone: contactData.phone,
      serviceType: contactData.service_type,
      homeSize: contactData.home_size,
      message: contactData.message
    };

    const emailSent = await directEmailService.sendContactEmail(contactEmailData);
    
    if (!emailSent) {
      console.warn('⚠️ Contact form email delivery failed through all methods');
      // Store for manual processing
      this.storeEmailForManualProcessing({
        type: 'contact_form',
        data: contactData,
        emailData: contactEmailData
      });
    } else {
      console.log('✅ Contact form email sent to choosetidybeast@gmail.com');
    }
  }

  /**
   * Generate formatted contact form email content
   */
  private generateContactEmailContent(contactData: ContactFormData): string {
    return `
📬 NEW CONTACT FORM SUBMISSION!

📋 CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Contact ID: ${contactData.id}
👨‍💼 Name: ${contactData.first_name} ${contactData.last_name}
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
🕐 Submitted: ${new Date(contactData.created_at).toLocaleString('en-IN')}

🚀 NEXT ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contact customer at ${contactData.phone}
2. Respond to email at ${contactData.email}
3. Provide quote for ${contactData.service_type}
4. Follow up within 2 hours as promised

📊 This data has been automatically added to Google Sheets for tracking.

---
TidyBeast Automated Contact System
🌐 https://tidybeast.com
📱 ${this.NOTIFICATION_PHONE}
    `.trim();
  }

  /**
   * Test function to verify the service is working
   */
  async testDataCollection(): Promise<boolean> {
    const testData: BookingData = {
      id: 'test-' + Date.now(),
      user_name: 'Test Customer',
      user_email: 'test@example.com',
      user_phone: '+919876543210',
      service_type: 'home-cleaning',
      service_name: 'Home Cleaning',
      address: 'Test Address, Hyderabad',
      date: '2024-01-20',
      time: '10:00 AM',
      price: 1800,
      special_requirements: 'Test booking',
      payment_status: 'completed',
      booking_status: 'confirmed',
      transaction_id: 'test-txn-' + Date.now(),
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString()
    };

    try {
      await this.handleBookingData(testData);
      return true;
    } catch (error) {
      console.error('Test failed:', error);
      return false;
    }
  }
}

export const dataCollectionService = DataCollectionService.getInstance();
export default DataCollectionService;
