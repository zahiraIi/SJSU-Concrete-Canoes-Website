/**
 * Material Donation Submission Handler
 * 
 * Serverless function to handle donation submissions to Google Sheets
 * 
 * This file should be deployed to a serverless environment like:
 * - Vercel Functions
 * - Netlify Functions
 * - AWS Lambda
 * - etc.
 */

const { google } = require('googleapis');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    let donation;
    try {
      donation = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          message: 'Invalid request body - expected JSON' 
        })
      };
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'materials', 'quantity'];
    const missingFields = requiredFields.filter(field => !donation[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}` 
        })
      };
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donation.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          message: 'Invalid email format' 
        })
      };
    }

    if (donation.phone && donation.phone.replace(/\D/g, '').length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Phone number must have at least 10 digits' 
        })
      };
    }

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

    // Format the data for insertion
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      donation.name,
      donation.email,
      donation.phone,
      donation.company || '',
      donation.materials,
      donation.quantity,
      donation.estimatedValue || '',
      donation.comments || '',
      'Pending' // Default status
    ];

    // Append the row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Material Donations',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData]
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Material donation submitted successfully',
        data: {
          timestamp,
          ...donation,
          status: 'Pending'
        }
      })
    };
  } catch (error) {
    console.error('Error submitting material donation:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to submit material donation',
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
        message: 'Donation submitted successfully',
        note: 'This is a simulated response. Deploy the serverless function for production use.'
      });
    }, 1000);
  };
} 