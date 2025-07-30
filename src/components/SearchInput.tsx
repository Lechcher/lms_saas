// This component is a Client Component, meaning it can use hooks like useState and useEffect,
// and can respond to user interactions.
"use client";

// Import necessary modules and components
import { usePathname, useSearchParams, useRouter } from "next/navigation"; // Next.js hooks for navigation and URL parameters
import React, { useEffect, useState } from "react"; // React hooks for state and side effects
import Image from "next/image"; // Next.js Image component for optimized image rendering
import { formUrlQuery } from "@jsmastery/utils"; // Utility function to construct URL queries

// Define the SearchInput functional component
const SearchInput = () => {
  // Get the current pathname, router instance, and search parameters using Next.js hooks
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the current 'topic' query parameter from the URL, or an empty string if not present
  const query = searchParams.get("topic") || "";

  // State to manage the search query input by the user
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect hook to handle URL updates based on searchQuery changes
  useEffect(() => {
    // Only proceed if searchQuery is not empty
    if (searchQuery) {
      // Construct a new URL with the updated 'topic' query parameter
      const newUrl = formUrlQuery({
        params: searchParams.toString(), // Current search parameters
        key: "topic", // The key for the query parameter to update
        value: searchQuery, // The new value for the 'topic' query parameter
      });

      // Push the new URL to the router without scrolling
      router.push(newUrl, { scroll: false });
    }
  }, [searchQuery, router, searchParams, pathname]); // Dependencies for the useEffect hook

  return (
    // Container for the search input, styled with Tailwind CSS classes
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      {/* Search icon */}
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      {/* Input field for the search query */}
      <input
        type="text"
        placeholder="Search companions ..."
        value={searchQuery} // Controlled component: input value is tied to searchQuery state
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
      />
    </div>
  );
};

// Export the SearchInput component as the default export
export default SearchInput;
