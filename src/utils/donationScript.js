/**
 * Google Apps Script to handle material donation form submissions
 * and store them in a Google Spreadsheet.
 * 
 * HOW TO USE:
 * 1. Create a new Google Sheet at https://sheets.google.com
 * 2. Go to Extensions > Apps Script
 * 3. Replace the code in the Apps Script editor with this script
 * 4. Save the project (give it a name like "DonationFormHandler")
 * 5. Deploy > New Deployment > Select "Web app"
 * 6. Set "Who has access" to "Anyone" (this allows your form to send data)
 * 7. Deploy and copy the Web app URL
 * 8. Replace "YOUR_GOOGLE_SCRIPT_ID" in the Donate.tsx file with your script URL
 */

// Set up the spreadsheet with headers if it doesn't exist
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Material Donations');
  
  // Create the sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Material Donations');
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Materials',
      'Quantity',
      'Estimated Value',
      'Comments'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#DDDDDD');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

/**
 * Process form data from a POST request and add it to the spreadsheet
 */
function doPost(e) {
  try {
    const sheet = setup();
    const data = e.parameter;
    
    // Prepare row data
    const rowData = [
      new Date(), // Timestamp
      data.name,
      data.email,
      data.phone,
      data.company || '',
      data.materials,
      data.quantity,
      data.estimatedValue || '',
      data.comments || ''
    ];
    
    // Append data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing donation form:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - useful for testing if the script is deployed correctly
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 'status': 'The donation form handler is running' }))
    .setMimeType(ContentService.MimeType.JSON);
} 