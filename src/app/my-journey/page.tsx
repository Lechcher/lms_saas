// Imports necessary components from the UI library for Accordion functionality.
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Imports server-side actions for fetching companion data.
import {
  getBookmarkedCompanions,
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
// Imports currentUser to get the authenticated user's information.
import { currentUser } from "@clerk/nextjs/server";
// Imports redirect for server-side navigation.
import { redirect } from "next/navigation";
// Imports Image component from Next.js for optimized image rendering.
import Image from "next/image";
// Imports React for component creation.
import React from "react";
// Imports the CompanionsList component to display lists of companions.
import CompanionsList from "@/components/CompanionsList";

// Defines the Profile asynchronous functional component.
// This component fetches and displays user-specific data like created companions, session history, and bookmarked companions.
const Profile = async () => {
  // Fetches the current authenticated user.
  const user = await currentUser();

  // If no user is found, redirects to the sign-in page.
  if (!user) redirect("/sign-in");

  // Fetches companions created by the user.
  const companions = await getUserCompanions(user.id);
  // Fetches the user's session history.
  const sessionHistory = await getUserSessions(user.id);
  // Fetches companions bookmarked by the user.
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    // Main container for the profile page, with responsive width.
    <main className="min-lg:w-3/4">
      {/* Section for displaying user's profile information and statistics. */}
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        {/* User's profile picture and name/email. */}
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            height={110}
            width={110}
            className="rounded-full border-2 border-black"
          />

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName!} {user.lastName!}
            </h1>

            <p className="text-sm text-muted-foreground">
              {user.emailAddresses?.[0].emailAddress}
            </p>
          </div>
        </div>

        {/* User statistics: lessons completed and companions created. */}
        <div className="flex gap-4">
          {/* Lessons completed card. */}
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />

              <p className="text-2xl font-bold">{sessionHistory.length}</p>

              <div className="text-sm text-muted-foreground">
                Lessons completed
              </div>
            </div>
          </div>

          {/* Companions created card. */}
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/cap.svg"
                alt="checkmark"
                width={22}
                height={22}
              />

              <p className="text-2xl font-bold">{companions.length}</p>

              <div className="text-sm text-muted-foreground">
                Companions created
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion for displaying different lists of companions. */}
      <Accordion type="multiple">
        {/* Bookmarked Companions section. */}
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Companions {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Bookmarked Companions"
              companions={bookmarkedCompanions}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Recent Sessions section. */}
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>

        {/* My Companions section. */}
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

// Exports the Profile component as the default export.
export default Profile;
