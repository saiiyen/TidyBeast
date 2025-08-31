// Google Apps Script Setup for TidyBeast Booking Data Collection
// This script should be deployed as a web app in Google Apps Script
// Instructions: https://script.google.com/home/start

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://script.google.com/
 * 2. Create a new project called "TidyBeast Booking Tracker"
 * 3. Replace the default code with this file's contents
 * 4. Create a new Google Sheet called "TidyBeast Bookings"
 * 5. Update the SHEET_ID variable below with your sheet ID
 * 6. Deploy as web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy the web app URL and update it in dataCollectionService.ts
 * 8. Test the integration
 */

// Configuration - UPDATE THESE VALUES
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Bookings'; // Name of the sheet tab

// Email configuration (optional - for additional notifications)
const ADMIN_EMAIL = 'bunnybstn@gmail.com';
const NOTIFICATION_SUBJECT = 'New TidyBeast Booking Received';

/**
 * Main function to handle incoming POST requests
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addBooking') {
      return handleAddBooking(data.data);
    } else if (data.action === 'test') {
      return handleTest();
    }
    
    return createResponse(false, 'Unknown action');
  } catch (error) {
    console.error('Error processing POST request:', error);
    return createResponse(false, 'Error processing request: ' + error.message);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('TidyBeast Booking Tracker is running! Use POST requests to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Add booking data to Google Sheet
 */
function handleAddBooking(bookingData) {
  try {
    const sheet = getOrCreateSheet();
    
    // Prepare row data in the correct order
    const rowData = [
      new Date(), // Timestamp when added to sheet
      bookingData.booking_id,
      bookingData.customer_name,
      bookingData.customer_email,
      bookingData.customer_phone,
      bookingData.service_name,
      bookingData.service_type,
      bookingData.service_address,
      bookingData.service_date,
      bookingData.service_time,
      bookingData.amount_paid,
      bookingData.payment_status,
      bookingData.booking_status,
      bookingData.transaction_id,
      bookingData.special_requirements,
      bookingData.created_at,
      bookingData.confirmed_at
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    try {
      sendEmailNotification(bookingData);
    } catch (emailError) {
      console.warn('Email notification failed:', emailError);
      // Don't fail the whole operation if email fails
    }
    
    return createResponse(true, 'Booking data added successfully', {
      booking_id: bookingData.booking_id,
      row_added: sheet.getLastRow()
    });
    
  } catch (error) {
    console.error('Error adding booking:', error);
    return createResponse(false, 'Error adding booking: ' + error.message);
  }
}

/**
 * Get or create the bookings sheet with proper headers
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet;
  
  try {
    sheet = spreadsheet.getSheetByName(SHEET_NAME);
  } catch (error) {
    // Sheet doesn't exist, create it
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  // Check if headers exist, if not, add them
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp Added',
      'Booking ID',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Service Name',
      'Service Type',
      'Service Address',
      'Service Date',
      'Service Time',
      'Amount Paid (₹)',
      'Payment Status',
      'Booking Status',
      'Transaction ID',
      'Special Requirements',
      'Created At',
      'Confirmed At'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    
    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 120); // Booking ID
    sheet.setColumnWidth(3, 150); // Name
    sheet.setColumnWidth(4, 200); // Email
    sheet.setColumnWidth(5, 120); // Phone
    sheet.setColumnWidth(6, 150); // Service Name
    sheet.setColumnWidth(7, 120); // Service Type
    sheet.setColumnWidth(8, 250); // Address
    sheet.setColumnWidth(9, 100); // Date
    sheet.setColumnWidth(10, 100); // Time
    sheet.setColumnWidth(11, 100); // Amount
    sheet.setColumnWidth(12, 120); // Payment Status
    sheet.setColumnWidth(13, 120); // Booking Status
    sheet.setColumnWidth(14, 150); // Transaction ID
    sheet.setColumnWidth(15, 200); // Special Requirements
    sheet.setColumnWidth(16, 150); // Created At
    sheet.setColumnWidth(17, 150); // Confirmed At
  }
  
  return sheet;
}

/**
 * Send email notification about new booking
 */
function sendEmailNotification(bookingData) {
  const subject = `${NOTIFICATION_SUBJECT} - ${bookingData.booking_id}`;
  
  const emailBody = `
🎉 NEW TIDYBEAST BOOKING CONFIRMED!

📋 BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Booking ID: ${bookingData.booking_id}
💰 Amount Paid: ₹${Number(bookingData.amount_paid).toLocaleString()}
🔐 Transaction ID: ${bookingData.transaction_id}

👤 CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💼 Name: ${bookingData.customer_name}
📞 Phone: ${bookingData.customer_phone}
📧 Email: ${bookingData.customer_email}
🏠 Address: ${bookingData.service_address}

🧹 SERVICE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Service: ${bookingData.service_name}
📅 Date: ${bookingData.service_date}
⏰ Time: ${bookingData.service_time}
💼 Type: ${bookingData.service_type}
${bookingData.special_requirements && bookingData.special_requirements !== 'None' ? `📝 Special Requirements: ${bookingData.special_requirements}` : ''}

⚡ BOOKING STATUS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Payment Status: ${bookingData.payment_status.toUpperCase()}
📌 Booking Status: ${bookingData.booking_status.toUpperCase()}
🕐 Created: ${new Date(bookingData.created_at).toLocaleString('en-IN')}
✅ Confirmed: ${new Date(bookingData.confirmed_at).toLocaleString('en-IN')}

🚀 NEXT ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contact customer at ${bookingData.customer_phone}
2. Confirm service details and schedule
3. Prepare cleaning team assignment
4. Send service reminder to customer

📊 This data has been automatically added to Google Sheets for tracking.

---
TidyBeast Automated Booking System
🌐 https://tidybeast.com
📱 +919959047238
  `;

  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: emailBody,
      htmlBody: emailBody.replace(/\n/g, '<br>').replace(/━/g, '─')
    });
    
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}

/**
 * Handle test requests
 */
function handleTest() {
  try {
    const sheet = getOrCreateSheet();
    const testData = {
      booking_id: 'TEST-' + new Date().getTime(),
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      customer_phone: '+919876543210',
      service_name: 'Home Cleaning',
      service_type: 'home-cleaning',
      service_address: 'Test Address, Hyderabad',
      service_date: '2024-01-20',
      service_time: '10:00 AM',
      amount_paid: 1800,
      payment_status: 'completed',
      booking_status: 'confirmed',
      transaction_id: 'test-txn-' + new Date().getTime(),
      special_requirements: 'Test booking from Google Apps Script',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString()
    };
    
    return handleAddBooking(testData);
  } catch (error) {
    return createResponse(false, 'Test failed: ' + error.message);
  }
}

/**
 * Create standardized API response
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function that can be run manually in the Apps Script editor
 */
function runManualTest() {
  console.log('Running manual test...');
  const result = handleTest();
  console.log('Test result:', result.getContent());
}

/**
 * Function to initialize the sheet (run this once after setup)
 */
function initializeSheet() {
  try {
    const sheet = getOrCreateSheet();
    console.log('Sheet initialized successfully');
    console.log('Sheet name:', sheet.getName());
    console.log('Headers added:', sheet.getLastRow() > 0);
    return 'Sheet initialized successfully!';
  } catch (error) {
    console.error('Error initializing sheet:', error);
    return 'Error initializing sheet: ' + error.message;
  }
}
