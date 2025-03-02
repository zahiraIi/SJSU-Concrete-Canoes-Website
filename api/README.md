# SJSU Concrete Canoes API

This directory contains the serverless API functions for the SJSU Concrete Canoes website. These functions handle communication with Google Sheets to store donation form submissions.

## Setup Instructions

### 1. Install Dependencies

From this directory, run:

```bash
npm install
```

### 2. Google Cloud Setup

1. Create a Google Cloud project at https://console.cloud.google.com
2. Enable the Google Sheets API
3. Create a service account with appropriate permissions
4. Generate a private key (JSON format) for the service account
5. Share your target Google Sheet with the service account email

### 3. Environment Configuration

Create a `.env` file in the root project directory with the following fields:

```
VITE_GOOGLE_SHEET_ID=your-spreadsheet-id
VITE_GOOGLE_PROJECT_ID=your-project-id
VITE_GOOGLE_PRIVATE_KEY_ID=your-private-key-id
VITE_GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Content Here\n-----END PRIVATE KEY-----\n"
VITE_GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project-id.iam.gserviceaccount.com
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_GOOGLE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project-id.iam.gserviceaccount.com
VITE_INITIALIZE_SHEET=true
```

### 4. Deployment

These functions are designed to be deployed to a serverless environment like Vercel:

```bash
vercel
```

If deploying to another platform like Netlify or AWS Lambda, you may need to adjust the function format accordingly.

### 5. Security Note

Never commit your private keys or sensitive credentials to version control. Always use environment variables or secrets management systems to store sensitive information.

The key you provided in your question (`b60507f4fa95dee10dfd1dbbed99960f16a5cb86`) should be kept confidential and never shared publicly or committed to code. Please generate a new key if you believe this one has been compromised. 