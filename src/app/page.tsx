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

const HomePage = async () => {
  const user = await currentUser();

  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSession();
  const bookmarkedCompanions = await getBookmarkedCompanions(user?.id);

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            bookmarked={bookmarkedCompanions.some(
              (bookmarkedCompanion) => bookmarkedCompanion.id === companion.id
            )}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recent compeleted sessions"
          companions={recentSessionsCompanions}
          className="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default HomePage;
