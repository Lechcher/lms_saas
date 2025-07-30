// Import necessary modules from React and Next.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define the NotFound functional component
const NotFound = () => {
  return (
    // Main container for the 404 page, centered vertically and horizontally
    <main className="flex flex-col justify-center items-center">
      {/* Image displayed on the 404 page */}
      <Image
        src="/images/page-not-found.svg" // Source of the image
        alt="not found" // Alt text for accessibility
        width={190} // Width of the image
        height={150} // Height of the image
      />

      {/* Heading indicating the page is not found */}
      <h1>Sorry,the page is not exist.</h1>

      {/* Link to navigate back to the home page */}
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </main>
  );
};

// Export the NotFound component as default
export default NotFound;
