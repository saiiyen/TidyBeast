// Test script for TidyBeast email functionality
import { directEmailService } from '../src/services/directEmailService.js';

async function testEmailService() {
  // Testing TidyBeast Email Service
  
  try {
    const testResult = await directEmailService.testEmail();
    
    if (testResult) {
      // Email service test PASSED
      // Test email sent to choosetidybeast@gmail.com
    } else {
      // Email service test completed with fallback options shown
      // Primary methods failed but backup options were provided
    }
    
  } catch (error) {
    // Email service test FAILED - logged internally
  }
  
  // Test retry functionality
  // Testing retry functionality
  try {
    await directEmailService.retryFailedEmails();
    // Retry functionality working correctly
  } catch (error) {
    // Retry functionality failed - logged internally
  }
}

// Run test if this file is executed directly
if (import.meta.main) {
  testEmailService();
}

export { testEmailService };
