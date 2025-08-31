# TidyBeast Data Collection System Setup Guide

This guide will help you set up the automated data collection system that captures booking information and sends it to Google Sheets and email notifications when customers complete payments.

## 🎯 What This System Does

When a customer completes a successful payment:
1. **📊 Saves booking data to Google Sheets** - All customer details, service info, and payment details
2. **📧 Sends email notification** - Formatted booking summary to `bunnybstn@gmail.com`
3. **💾 Stores locally** - Backup copy in browser's local storage
4. **📱 Background processing** - Doesn't interrupt customer experience if external services fail

## 🛠️ Setup Steps

### 1. Google Sheets Integration

#### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet called **"TidyBeast Bookings"**
3. Copy the Sheet ID from the URL (the long string between `/spreadsheets/d/` and `/edit`)
   - Example URL: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t/edit`
   - Sheet ID: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t`

#### Step 2: Set Up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Name it **"TidyBeast Booking Tracker"**
4. Delete the default code and copy-paste the entire content from `setup/google-apps-script.js`
5. Update the configuration:
   ```javascript
   const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID_HERE'; // Replace with your Sheet ID
   const ADMIN_EMAIL = 'bunnybstn@gmail.com'; // Your email
   ```

#### Step 3: Deploy as Web App
1. In Google Apps Script, click **"Deploy"** → **"New deployment"**
2. Choose type: **"Web app"**
3. Description: **"TidyBeast Booking Data Collector"**
4. Execute as: **"Me (your email)"**
5. Who has access: **"Anyone"**
6. Click **"Deploy"**
7. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
8. Update `src/services/dataCollectionService.ts`:
   ```typescript
   private readonly GOOGLE_SHEETS_URL = 'YOUR_WEB_APP_URL_HERE';
   ```

#### Step 4: Test Google Apps Script
1. In Google Apps Script editor, run the `initializeSheet()` function
2. Grant required permissions when prompted
3. Check that your Google Sheet now has headers automatically added

### 2. Email Service Integration (Optional - Multiple Options)

The system is designed to work with various email services. Choose one:

#### Option A: EmailJS (Recommended for Client-Side)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail/Outlook/etc.)
3. Create an email template with these parameters:
   - `to_email`, `subject`, `message`, `booking_id`, `customer_name`, etc.
4. Update `dataCollectionService.ts` with your EmailJS credentials:
   ```typescript
   service_id: 'your_service_id',
   template_id: 'your_template_id',
   user_id: 'your_user_id',
   ```

#### Option B: Use Google Apps Script Email (Recommended)
The Google Apps Script already includes email functionality using Gmail. It will automatically send emails to `bunnybstn@gmail.com` when new bookings come in.

#### Option C: Custom Webhook
Set up your own email webhook endpoint and update the `sendEmailViaService` method in `dataCollectionService.ts`.

### 3. Testing the Complete System

#### Step 1: Test Google Sheets Connection
1. In your browser console, run:
   ```javascript
   // Import the service
   import { dataCollectionService } from './src/services/dataCollectionService';
   
   // Run test
   dataCollectionService.testDataCollection();
   ```

#### Step 2: Test Full Booking Flow
1. Start your development server: `npm run dev`
2. Go to your website
3. Click on any service → "Book Service"
4. Fill out the booking form
5. Complete a test payment
6. Check:
   - ✅ Google Sheet has new row with booking data
   - ✅ Email received at `bunnybstn@gmail.com`
   - ✅ Console logs show successful data collection

### 4. Production Deployment

When deploying to production:

1. **Environment Variables**: Store sensitive data in environment variables:
   ```bash
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/your-id/exec
   VITE_ADMIN_EMAIL=bunnybstn@gmail.com
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_user_id
   ```

2. **Update Service Configuration**: Modify `dataCollectionService.ts` to use environment variables:
   ```typescript
   private readonly GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
   private readonly NOTIFICATION_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
   ```

3. **Error Monitoring**: Consider adding error monitoring (Sentry, LogRocket) to track issues in production.

## 📊 Data Structure

The system captures this data for each booking:

```typescript
{
  booking_id: string,           // Unique ID: timestamp-based
  timestamp: string,            // When added to sheet
  customer_name: string,        // Full name
  customer_email: string,       // Email address
  customer_phone: string,       // Phone number
  service_name: string,         // "Home Cleaning", "Deep Cleaning", etc.
  service_type: string,         // "home-cleaning", "deep-cleaning", etc.
  service_address: string,      // Full address
  service_date: string,         // "2024-01-20"
  service_time: string,         // "10:00 AM"
  amount_paid: number,          // Price in rupees
  payment_status: string,       // "completed"
  booking_status: string,       // "confirmed"
  transaction_id: string,       // Payment gateway transaction ID
  special_requirements: string, // Any special notes
  created_at: string,          // When booking was created
  confirmed_at: string         // When payment was completed
}
```

## 🔍 Monitoring & Troubleshooting

### View Stored Data
- **Google Sheets**: Check your TidyBeast Bookings sheet
- **Local Storage**: Browser DevTools → Application → Local Storage → `tidybeast_bookings`
- **Console Logs**: Browser DevTools → Console (shows data collection status)

### Common Issues

1. **Google Sheets not updating**
   - Check if Web App URL is correct in `dataCollectionService.ts`
   - Verify Google Apps Script permissions
   - Check Google Apps Script execution logs

2. **Emails not sending**
   - Verify email service configuration
   - Check spam folders
   - Review console error logs

3. **Data collection fails silently**
   - This is by design - customer experience isn't interrupted
   - Check browser console for error details
   - Review stored error logs in localStorage: `data_collection_errors`

### Monitoring Commands
```javascript
// Check pending email notifications
JSON.parse(localStorage.getItem('pending_email_notifications') || '[]')

// Check error logs
JSON.parse(localStorage.getItem('data_collection_errors') || '[]')

// View all bookings
JSON.parse(localStorage.getItem('tidybeast_bookings') || '[]')
```

## 📈 Analytics & Insights

With this system, you can:
- **Track booking trends** in Google Sheets
- **Monitor popular services** 
- **Analyze customer locations**
- **Calculate revenue metrics**
- **Follow up with customers** efficiently

The Google Sheet can be connected to Google Data Studio or other analytics tools for advanced reporting.

## 🔒 Security & Privacy

- All data transmission uses HTTPS
- Google Apps Script runs with your Google account permissions
- No sensitive payment details are stored (only transaction IDs)
- Customer data is only sent to your specified email and Google Sheet
- Local storage is used as backup only

## 🆘 Support

If you need help with setup:
1. Check the console logs for specific error messages
2. Test each component individually (Google Sheets, Email)
3. Verify all configuration URLs and IDs are correct
4. Ensure Google Apps Script has proper permissions

The system is designed to be robust - even if external services fail, bookings will still be saved locally and customers can complete their purchases successfully.
