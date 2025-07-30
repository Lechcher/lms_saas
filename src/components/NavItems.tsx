// This component is a Client Component, meaning it can use hooks like useState and useEffect,
// and can respond to user interactions.
"use client";

// Import necessary modules and components
import React from "react"; // React library for building UI components
import Link from "next/link"; // Next.js Link component for client-side navigation
import { usePathname } from "next/navigation"; // Hook to get the current URL pathname
import { cn } from "@/lib/utils"; // Utility function for conditionally joining class names

// Define an array of navigation items, each with a label and a href (path)
const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

// Define the NavItems functional component
const NavItems = () => {
  // Get the current pathname using the usePathname hook
  const pathName = usePathname();

  return (
    // Navigation container with flex properties for alignment
    <nav className={"flex items-center gap-4"}>
      {/* Map over the navItems array to render each navigation link */}
      {navItems.map(({ label, href }) => (
        <Link
          href={href} // The destination path for the link
          key={label} // Unique key for each list item, using the label
          // Conditionally apply classes: if the current pathname matches the link's href,
          // apply "text-primary font-semibold" for styling the active link.
          className={cn(pathName === href && "text-primary font-semibold")}
        >
          {label} {/* The visible text for the navigation link */}
        </Link>
      ))}
    </nav>
  );
};

// Export the NavItems component as the default export
export default NavItems;
