// Import necessary components and functions from Clerk, Next.js, and React
import { PricingTable } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

// Define the Subscription functional component as an asynchronous function
const Subcription = async () => {
  // Get the current user information using Clerk's currentUser function
  const user = await currentUser();

  // If no user is logged in, redirect to the sign-in page
  if (!user) redirect("/sign-in");

  return (
    <main className="flex items-center">
      {/* Section for the main heading and description of the subscription page */}
      <div className="flex flex-col text-center max-w-xl mb-11">
        <h1>Choose Your Learning Journey</h1>
        <p>
          Start free, upgrade anytime. Unlock smarter Conversations, deeper
          insights, and unlimited potential with a plan that fits your goals.
        </p>
      </div>

      {/* Section for a visual indicator of the most popular option (hidden on medium and smaller screens) */}
      <div className="flex items-start max-md:hidden">
        <Image
          src="images/arrow.svg"
          alt="arrow"
          height={20}
          width={56}
          className="mr-2"
        />
        <p className="-mt-2">Most popular!</p>
      </div>

      {/* Render the PricingTable component from Clerk, which displays subscription plans */}
      <PricingTable />
    </main>
  );
};

// Export the Subscription component as default
export default Subcription;
