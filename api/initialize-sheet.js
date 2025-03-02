/**
 * Initialize Google Sheet for Material Donations
 * 
 * This serverless function creates the necessary headers and formatting
 * for the Material Donations sheet in Google Sheets.
 */

const { google } = require('googleapis');

// Headers for the Material Donations sheet
const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'Company',
  'Materials',
  'Quantity',
  'Estimated Value',
  'Comments',
  'Status'
];

exports.handler = async function(event, context) {
  // Only allow POST requests for initialization
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    // Get credentials from environment variables
    const credentials = {
      type: 'service_account',
      project_id: process.env.VITE_GOOGLE_PROJECT_ID,
      private_key_id: process.env.VITE_GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.VITE_GOOGLE_CLIENT_EMAIL,
      client_id: process.env.VITE_GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.VITE_GOOGLE_CERT_URL,
      universe_domain: 'googleapis.com'
    };

    const spreadsheetId = process.env.VITE_GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      throw new Error('Spreadsheet ID is required. Please set VITE_GOOGLE_SHEET_ID environment variable.');
    }

    // Create a JWT auth client
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Create the sheets service
    const sheets = google.sheets({ version: 'v4', auth });

    // First, check if the sheet exists
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: false,
    });

    // Look for "Material Donations" sheet
    let materialDonationSheetExists = false;
    let materialDonationSheetId = null;

    if (response.data && response.data.sheets) {
      for (const sheet of response.data.sheets) {
        if (sheet.properties.title === 'Material Donations') {
          materialDonationSheetExists = true;
          materialDonationSheetId = sheet.properties.sheetId;
          break;
        }
      }
    }

    // If sheet doesn't exist, create it
    if (!materialDonationSheetExists) {
      const addSheetResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Material Donations',
                }
              }
            }
          ]
        }
      });
      
      materialDonationSheetId = addSheetResponse.data.replies[0].addSheet.properties.sheetId;
    }

    // Add headers if sheet is empty
    const dataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Material Donations!A1:J1',
    });

    if (!dataResponse.data.values || dataResponse.data.values.length === 0) {
      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Material Donations!A1:J1',
        valueInputOption: 'RAW',
        resource: {
          values: [HEADERS]
        }
      });

      // Format header row
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: materialDonationSheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: HEADERS.length
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.0,
                      green: 0.27,
                      blue: 0.6
                    },
                    textFormat: {
                      foregroundColor: {
                        red: 1.0,
                        green: 1.0,
                        blue: 1.0
                      },
                      bold: true
                    }
                  }
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)'
              }
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: materialDonationSheetId,
                  gridProperties: {
                    frozenRowCount: 1
                  }
                },
                fields: 'gridProperties.frozenRowCount'
              }
            }
          ]
        }
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Material Donations sheet has been successfully initialized',
        sheetId: materialDonationSheetId
      })
    };
  } catch (error) {
    console.error('Error initializing sheet:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to initialize sheet',
        error: error.message
      })
    };
  }
};

// Fallback for local development environment
// This will only be used if the serverless function above is not deployed
if (typeof window === 'undefined' && typeof exports === 'undefined') {
  module.exports = (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    
    // Simulate processing delay
    setTimeout(() => {
      // Return a success response (this is just for development/demo purposes)
      res.status(200).json({ 
        message: 'Sheet initialized successfully',
        note: 'This is a simulated response. Deploy the serverless function for production use.'
      });
    }, 1000);
  };
} 