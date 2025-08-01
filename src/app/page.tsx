// Import necessary components and utilities
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import React from "react";
import {
  getAllCompanions,
  getBookmarkedCompanions,
  getRecentSession,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

// Define the HomePage functional component as an asynchronous function
const HomePage = async () => {
  // Get the current user information using Clerk's currentUser function
  const user = await currentUser();

  // Fetch popular companions (limited to 3)
  const companions = await getAllCompanions({ limit: 3 });
  // Fetch recently completed session companions
  const recentSessionsCompanions = await getRecentSession();
  // Fetch bookmarked companions for the current user
  const bookmarkedCompanions = await getBookmarkedCompanions(user?.id);

  return (
    <main>
      {/* Main heading for popular companions */}
      <h1>Popular Companions</h1>

      {/* Section to display popular companions */}
      <section className="home-section">
        {/* Map through the companions and render a CompanionCard for each */}
        {companions.companions.map((companion) => (
          <CompanionCard
            key={companion.id} // Unique key for each companion card
            {...companion} // Spread all companion properties as props
            color={getSubjectColor(companion.subject)} // Determine card color based on subject
            bookmarked={bookmarkedCompanions.some(
              (bookmarkedCompanion) => bookmarkedCompanion.id === companion.id
            )} // Check if the companion is bookmarked by the user
          />
        ))}
      </section>

      {/* Section for recent completed sessions and CTA */}
      <section className="home-section">
        {/* Display a list of recently completed sessions */}
        <CompanionsList
          title="Recent compeleted sessions"
          companions={recentSessionsCompanions}
          className="w-2/3 max-lg:w-full"
        />
        {/* Call to Action component */}
        <CTA />
      </section>
    </main>
  );
};

// Export the HomePage component as default
export default HomePage;
