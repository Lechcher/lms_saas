// Imports for necessary functions and components
import { getCompanion } from "@/lib/actions/companion.actions"; // Function to fetch companion details
import { getSubjectColor } from "@/lib/utils"; // Utility function to get subject-based colors
import { currentUser } from "@clerk/nextjs/server"; // Clerk utility to get the current user on the server
import { redirect } from "next/navigation"; // Next.js utility for server-side redirection
import Image from "next/image"; // Next.js Image component for optimized images
import React from "react"; // React library
import CompanionCall from "@/components/CompanionCall"; // Component for handling companion calls

// Define the props interface for the CompanionSession component
interface CompanionSessionPageProps {
  params: Promise<{ id: string }>; // The ID of the companion, passed as a promise from Next.js dynamic routes
}

// CompanionSession is an asynchronous component that displays details of a specific companion
// and provides an interface to interact with it.
const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params; // Extract the companion ID from the params
  const companion = await getCompanion(id); // Fetch companion details using the ID
  const user = await currentUser(); // Get the current authenticated user

  // Destructure relevant properties from the fetched companion object
  const { name, subject, title, topic, duration } = companion;

  // Redirect to sign-in page if no user is authenticated
  if (!user) redirect("/sign-in");

  // Redirect to the companions list if the companion name is not found (e.g., invalid ID)
  if (!name) redirect("/companions");

  // Log the fetched companion details to the console (for debugging purposes)
  console.log(await getCompanion(id));

  return (
    <main>
      {/* Article section displaying companion's basic information */}
      <article className="flex rounded-border justify-between  p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          {/* Subject icon and background color based on the companion's subject */}
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              height={35}
              width={35}
            />
          </div>

          {/* Companion's name and topic details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>

              {/* Subject badge */}
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>

            <p className="text-lg">{topic}</p>
          </div>
        </div>

        {/* Companion's duration information */}
        <div className="items-start text-2xl max-md:hidden">
          {duration !== 1 ? `${duration} minutes` : `${duration} minute`}
        </div>
      </article>

      {/* CompanionCall component for interactive session with the companion */}
      <CompanionCall
        {...companion} // Pass all companion properties as props
        companionId={id} // Pass the companion ID
        userName={user.firstName!} // Pass the user's first name
        userImage={user.imageUrl!} // Pass the user's image URL
      />
    </main>
  );
};

export default CompanionSession;
