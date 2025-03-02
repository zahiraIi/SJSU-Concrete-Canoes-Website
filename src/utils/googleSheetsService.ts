/**
 * Google Sheets Service for Material Donations
 * This utility handles the connection to Google Sheets using a service account
 */

interface MaterialDonation {
  name: string;
  email: string;
  phone: string;
  company?: string;
  materials: string;
  quantity: string;
  estimatedValue?: string;
  comments?: string;
}

class GoogleSheetsService {
  private apiEndpoint = '/api';
  
  /**
   * Submit a material donation to the Google Sheet
   */
  async submitDonation(donation: MaterialDonation): Promise<{ success: boolean; message: string }> {
    try {
      // Send the donation data directly to your serverless function
      const response = await fetch(`${this.apiEndpoint}/submit-donation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donation)
      });
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to submit donation';
        
        try {
          // Try to parse error as JSON
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // If parsing fails, use the raw text
          if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }
      
      // Safely parse the JSON response
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Error parsing response JSON:', jsonError);
        // If JSON parsing fails, still return success if the HTTP status was good
        return { success: true, message: 'Donation was submitted but response could not be parsed' };
      }
      
      return { 
        success: result.success, 
        message: result.message || 'Donation submitted successfully' 
      };
    } catch (error) {
      console.error('Error submitting donation:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  }
  
  /**
   * Initialize the sheet by creating it if it doesn't exist and adding headers
   * This should be called once during setup
   */
  async initializeSheet(): Promise<{ success: boolean; message: string }> {
    try {      
      const response = await fetch(`${this.apiEndpoint}/initialize-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Empty body as all config is now server-side
      });
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to initialize sheet';
        
        try {
          // Try to parse error as JSON
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // If parsing fails, use the raw text
          if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }
      
      // Safely parse the JSON response
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Error parsing response JSON:', jsonError);
        // If JSON parsing fails, still return success if the HTTP status was good
        return { success: true, message: 'Sheet was initialized but response could not be parsed' };
      }
      
      return { 
        success: result.success, 
        message: result.message || 'Sheet initialized successfully' 
      };
    } catch (error) {
      console.error('Error initializing sheet:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  }
}

export default GoogleSheetsService; 