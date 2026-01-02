/**
 * Test file for C029 rule - Catch block logging
 */

// ❌ Bad: Empty catch block (C035 - ERROR)
async function emptyExample() {
  try {
    await fetchData();
  } catch (error) {
    // Empty - should trigger C035
  }
}

// ❌ Bad: Silent catch block (C029 - WARNING)
async function silentExample() {
  try {
    await processData();
  } catch (error) {
    const result = 'fallback';
    return result;
  }
}

// ⚠️ Basic: Has log but no error object (C029 - INFO with GKG)
async function basicExample() {
  try {
    await validateInput();
  } catch (error) {
    console.log("Error occurred");
    return null;
  }
}

// ✅ Good: Has error object
async function goodExample() {
  try {
    await saveData();
  } catch (error: any) {
    console.error('Failed:', error.message);
  }
}

// ✅ Excellent: Has context
async function excellentExample() {
  try {
    await processPayment();
  } catch (error: any) {
    console.error('Payment failed:', {
      error: error.message,
      stack: error.stack,
      operation: 'processPayment',
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

// ✅ Excellent: Rethrow
async function rethrowExample() {
  try {
    await connectToDatabase();
  } catch (error: any) {
    throw new Error(\`Connection failed: \${error.message}\`);
  }
}

// Dummy functions
async function fetchData() { throw new Error('Network error'); }
async function processData() { throw new Error('Processing error'); }
async function validateInput() { throw new Error('Validation error'); }
async function saveData() { throw new Error('Save error'); }
async function processPayment() { throw new Error('Payment error'); }
async function connectToDatabase() { throw new Error('Connection error'); }
