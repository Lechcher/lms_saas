// Import necessary types and components from Next.js and other libraries
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css"; // Import global CSS styles
import NavBar from "@/components/NavBar"; // Import the NavBar component
import { ClerkProvider } from "@clerk/nextjs"; // Import ClerkProvider for authentication

// Initialize the Bricolage_Grotesque font with specific settings
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage", // Define a CSS variable for the font
  subsets: ["latin"], // Specify font subsets to load
});

// Define metadata for the application, used for SEO and browser tabs
export const metadata: Metadata = {
  title: "Converso", // Title of the application
  description: "Real-time AI Teaching Platform", // Description of the application
};

// Define the RootLayout functional component, which wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{ // Define the type for children prop
  children: React.ReactNode;
}>) {
  return (
    // Wrap the application with ClerkProvider for authentication context
    <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
      {/* Set the HTML language to English */}
      <html lang="en">
        {/* Apply font and anti-aliasing styles to the body */}
        <body className={`${bricolage.variable} antialiased`}>
          {/* Render the navigation bar */}
          <NavBar />
          {/* Render the child components (pages) */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
