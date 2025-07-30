// This component is a Client Component, meaning it can use hooks like useState and useEffect,
// and can respond to user interactions.
"use client";

// Import necessary modules and components
import React, { useEffect, useState } from "react"; // React hooks for state and side effects
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // UI components for a customizable select dropdown
import { subjects } from "@/constants"; // Array of predefined subjects
import { useRouter, useSearchParams } from "next/navigation"; // Next.js hooks for navigation and URL parameters
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"; // Utility functions for manipulating URL query parameters

// Define the SubjectFilter functional component
const SubjectFilter = () => {
  // Get the router instance and search parameters using Next.js hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the current 'subject' query parameter from the URL, or an empty string if not present
  const query = searchParams.get("subject") || "";

  // State to manage the currently selected subject in the filter
  const [subject, setSubject] = useState(query);

  // useEffect hook to handle URL updates based on subject selection changes
  useEffect(() => {
    let newUrl = "";
    // If 'all' subjects are selected, remove the 'subject' query parameter from the URL
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(), // Current search parameters
        keysToRemove: ["subject"], // Key to remove from the URL
      });
    } else {
      // Otherwise, update or add the 'subject' query parameter with the selected subject
      newUrl = formUrlQuery({
        params: searchParams.toString(), // Current search parameters
        key: "subject", // The key for the query parameter to update
        value: subject, // The new value for the 'subject' query parameter
      });
    }
    // Push the new URL to the router without scrolling
    router.push(newUrl, { scroll: false });
  }, [router, searchParams, subject]); // Dependencies for the useEffect hook

  return (
    <div>
      {/* Select component for subject filtering */}
      <Select onValueChange={setSubject} value={subject}>
        {" "}
        {/* Handles value change and sets the selected subject */}
        <SelectTrigger className="input capitalize">
          {" "}
          {/* Trigger for the select dropdown */}
          <SelectValue placeholder="Subject" />{" "}
          {/* Placeholder text for the select input */}
        </SelectTrigger>
        <SelectContent>
          {" "}
          {/* Content of the select dropdown */}
          <SelectItem value="all">All subjects</SelectItem>{" "}
          {/* Option to select all subjects */}
          {/* Map over the subjects array to render each subject as a selectable item */}
          {subjects.map((subject) => (
            <SelectItem value={subject} key={subject} className="capitalize">
              {" "}
              {/* Individual subject item */}
              {subject} {/* Display the subject name */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Export the SubjectFilter component as the default export
export default SubjectFilter;
