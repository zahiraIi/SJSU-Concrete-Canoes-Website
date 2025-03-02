# Material Donation Form Integration with Google Sheets

This document provides step-by-step instructions on how to set up the Google Sheets integration for the material donation form using a service account.

## Setting Up Google Sheets with Service Account

1. **Create a New Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Give it a name (e.g., "SJSU Concrete Canoe - Material Donations")
   - Note the spreadsheet ID (the long string in the URL between `/d/` and `/edit`)

2. **Create a Google Cloud Project**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or use an existing one)
   - Enable the Google Sheets API for the project

3. **Create a Service Account**
   - In the Google Cloud Console, go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Enter a name and description for your service account
   - Click "Create and Continue"
   - Grant the role "Editor" to allow the service account to edit spreadsheets
   - Click "Continue" and then "Done"

4. **Generate a Service Account Key**
   - Click on the service account you just created
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Select "JSON" as the key type
   - Click "Create" (this will download a JSON key file)

5. **Share the Google Sheet with the Service Account**
   - Open your Google Sheet
   - Click the "Share" button
   - Enter the service account email address (found in the JSON key file under `client_email`)
   - Make sure to grant "Editor" access
   - Click "Share"

6. **Configure Environment Variables**
   - Create a `.env` file in the root of your project based on the `.env.example` template
   - Fill in the following values from your service account JSON key:
     - `VITE_GOOGLE_SHEET_ID`: Your spreadsheet ID (from step 1)
     - `VITE_GOOGLE_PROJECT_ID`: The `project_id` from your JSON key
     - `VITE_GOOGLE_PRIVATE_KEY_ID`: The `private_key_id` from your JSON key
     - `VITE_GOOGLE_PRIVATE_KEY`: The `private_key` from your JSON key (make sure to keep the newline characters)
     - `VITE_GOOGLE_CLIENT_EMAIL`: The `client_email` from your JSON key
     - `VITE_GOOGLE_CLIENT_ID`: The `client_id` from your JSON key
     - `VITE_GOOGLE_CERT_URL`: The `client_x509_cert_url` from your JSON key

7. **Set Up Serverless Functions** (if deploying to production)
   - If you're deploying to a production environment, you'll need to set up serverless functions to securely handle the service account credentials
   - Deploy the functions in the `api` directory to your hosting provider (Vercel, Netlify, etc.)
   - Install the `googleapis` package on your serverless function environment
   - Uncomment the actual function code in the serverless functions

## Testing the Integration

1. Run the website locally using `npm run dev`
2. Navigate to the Donation page
3. Select "Material Donations"
4. Fill out the form and submit it
5. Check your Google Sheet to verify that the data has been added

## Troubleshooting

- **Environment Variables Not Loading**: Make sure your `.env` file is correctly set up and that you're restarting the development server when you make changes to it.
- **CORS Issues**: When using serverless functions, ensure that your API endpoints have proper CORS headers.
- **Authorization Issues**: Make sure you've shared the Google Sheet with the service account email and that the service account has the correct permissions.
- **Service Account Key Format**: The private key in the service account JSON should be properly formatted, including newline characters, which may need special handling in environment variables.

## Security Considerations

- **NEVER commit your service account JSON key to version control**
- **NEVER hard-code sensitive credentials in your source code**
- Use environment variables to store sensitive information
- Consider using a secret management solution for production environments
- Limit the permissions of your service account to only what is necessary

## Updating the Sheet Structure

If you need to modify the sheet structure:

1. Update the `headers` array in the `initializeSheet` method in the `GoogleSheetsService` class
2. Update the row data creation in the `submitDonation` method to match the new structure
3. Run the initialization once to update the sheet headers 