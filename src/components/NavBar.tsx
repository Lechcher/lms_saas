// This component is a Client Component, meaning it can use hooks like useState and useEffect,
// and can respond to user interactions.
"use client";

// Import necessary modules and components
import React from "react"; // React library for building UI components
import Link from "next/link"; // Next.js Link component for client-side navigation
import Image from "next/image"; // Next.js Image component for optimized image rendering
import NavItems from "@/components/NavItems"; // Custom component for navigation items
import Auth from "@/components/Auth"; // Custom component for authentication related UI (e.g., sign-in/sign-out buttons)

// Define the NavBar functional component
const NavBar = () => {
  return (
    // React Fragment to group multiple elements without adding an extra node to the DOM
    <>
      {/* Header element acting as the navigation bar */}
      <header className="navbar">
        {/* Link to the homepage (/) */}
        <Link href={"/"}>
          {/* Container for the logo, with flex properties for alignment */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            {/* Company Logo */}
            <Image
              src={`/images/logo.svg`}
              alt="Converso Logo"
              width={44}
              height={46}
            />
          </div>
        </Link>

        {/* Container for navigation items and authentication components */}
        <div className="flex items-center gap-8 ">
          {/* Render navigation items */}
          <NavItems />
          {/* Render authentication UI */}
          <Auth />
        </div>
      </header>
    </>
  );
};

// Export the NavBar component as the default export
export default NavBar;
