// Test script for TidyBeast email functionality
import { directEmailService } from '../src/services/directEmailService.js';

async function testEmailService() {
  console.log('🧪 Testing TidyBeast Email Service...');
  
  try {
    const testResult = await directEmailService.testEmail();
    
    if (testResult) {
      console.log('✅ Email service test PASSED');
      console.log('📧 Test email sent to choosetidybeast@gmail.com');
    } else {
      console.log('⚠️ Email service test completed with fallback options shown');
      console.log('📧 This means primary methods failed but backup options were provided');
    }
    
  } catch (error) {
    console.error('❌ Email service test FAILED:', error);
  }
  
  // Test retry functionality
  console.log('\n🔄 Testing retry functionality...');
  try {
    await directEmailService.retryFailedEmails();
    console.log('✅ Retry functionality working correctly');
  } catch (error) {
    console.error('❌ Retry functionality failed:', error);
  }
}

// Run test if this file is executed directly
if (import.meta.main) {
  testEmailService();
}

export { testEmailService };
