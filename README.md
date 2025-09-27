# QRify Pro - Professional QR Code Generator

QRify Pro is a powerful and professional QR code generator that allows users to create custom QR codes with advanced styling, analytics tracking, and dynamic features. It's designed for businesses, events, and marketing campaigns that require high-quality, customizable QR solutions.

## Features

- **Custom QR Code Generation**: Create QR codes with various data types (URLs, text, Wi-Fi, etc.).
- **Advanced Styling Options**: Customize colors, shapes, and add logos to your QR codes.
- **Analytics Tracking**: Monitor scans and gather insights on your QR code performance.
- **Dynamic QR Codes**: Update the content of your QR codes without reprinting.
- **User Authentication**: Secure access to your QR code management dashboard.
- **Payment Integration**: Seamless payment processing for premium features.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for backend services and authentication)
- Razorpay (for payment processing)

## Setup and Local Development

To set up the project locally, follow these steps:

1.  **Clone the repository**:
    ```sh
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```
2.  **Install dependencies**:
    ```sh
    npm install
    ```
3.  **Environment Variables**: Create a `.env` file in the root directory and add your Supabase and Razorpay credentials. (Example: `VITE_SUPABASE_URL=...`, `VITE_SUPABASE_ANON_KEY=...`, `VITE_RAZORPAY_KEY_ID=...`)
4.  **Start the development server**:
    ```sh
    npm run dev
    ```

The application will be accessible at `http://localhost:8080` (or the port configured in `vite.config.ts`).

## Deployment

This project can be deployed using any static site hosting service (e.g., Vercel, Netlify, GitHub Pages). Ensure your environment variables are correctly configured for production.
