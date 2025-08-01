// Imports the CompanionCard component for displaying individual companion details.
import CompanionCard from "@/components/CompanionCard";
import PaginationBar from "@/components/PaginationBar";
// Imports the SearchInput component for searching companions.
import SearchInput from "@/components/SearchInput";
// Imports the SubjectFilter component for filtering companions by subject.
import SubjectFilter from "@/components/SubjectFilter";
// Imports server-side actions for fetching all companions and bookmarked companions.
import {
  getAllCompanions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
// Imports a utility function to get subject-specific colors.
import { getSubjectColor } from "@/lib/utils";
// Imports currentUser to get the authenticated user's information.
import { currentUser } from "@clerk/nextjs/server";
// Imports redirect for server-side navigation.
import { redirect } from "next/navigation";
// Imports React for component creation.
import React from "react";

// Defines the CompanionsLibrary asynchronous functional component.
// This component fetches and displays a list of companions based on search parameters.
const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  // Extracts filters from the search parameters.
  const filters = await searchParams;

  // Fetches the current authenticated user.
  const user = await currentUser();

  // If no user is found, redirects to the sign-in page.
  if (!user) redirect("/sign-in");

  // Determines the subject filter from search parameters, defaulting to an empty string if not present.
  const subject = filters.subject ? filters.subject : "";
  // Determines the topic filter from search parameters, defaulting to an empty string if not present.
  const topic = filters.topic ? filters.topic : "";
  const page = filters.page ? Number(filters.page) : 1;

  // Fetches all companions based on the subject and topic filters.
  const { companions, totalCount } = await getAllCompanions({
    subject,
    topic,
    page,
  });
  // Fetches companions bookmarked by the current user.
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  const totalPages = Math.ceil(Number(totalCount) / 9);

  return (
    // Main container for the companions library page.
    <main>
      {/* Section for the page header and filter/search inputs. */}
      <section className="flex justify-between gap-4 max-sm:flex-col ">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          {/* Renders the SearchInput component. */}
          <SearchInput />
          {/* Renders the SubjectFilter component. */}
          <SubjectFilter />
        </div>
      </section>
      {/* Section for displaying the grid of companion cards. */}
      <section className="companions-grid">
        {/* Maps through the fetched companions and renders a CompanionCard for each. */}
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            // Assigns a color to the companion card based on its subject.
            color={getSubjectColor(companion.subject)}
            // Checks if the current companion is bookmarked by the user.
            bookmarked={bookmarkedCompanions.some(
              (bookmarkedCompanion) => bookmarkedCompanion.id === companion.id
            )}
          />
        ))}
      </section>
      <PaginationBar
        page={page}
        totalPages={totalPages}
        subject={subject}
        topic={topic}
      />
    </main>
  );
};

// Exports the CompanionsLibrary component as the default export.
export default CompanionsLibrary;
