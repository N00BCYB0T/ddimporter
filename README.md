# DD Importer

A web application for importing scans into DefectDojo with Microsoft Azure AD authentication.

## Features

- Microsoft Azure AD authentication using MSAL
- Import and reimport scans to DefectDojo
- Support for Generic Findings Import scan type
- Clean and minimalistic UI
- Docker support for easy deployment

## Prerequisites

- Node.js (v16 or higher) and npm (for development)
- Docker and Docker Compose (for production deployment)

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_AZURE_CLIENT_ID=your_client_id
   VITE_AZURE_TENANT_ID=your_tenant_id
   VITE_DEFECT_DOJO_URL=your_defectdojo_url
   VITE_DEFECT_DOJO_API_KEY=your_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Usage

1. Sign in with your Microsoft account
2. Enter the Engagement ID
3. (Optional) Check "Reimport Scan" and provide the Test ID
4. Select the scan file to import
5. Click "Import Scan" to submit

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. 