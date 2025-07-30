// Imports the CompanionForm component for creating or editing companions.
import CompanionForm from "@/components/CompanionForm";
// Imports the newCompanionPermission function to check if the user can create a new companion.
import { newCompanionPermission } from "@/lib/actions/companion.actions";
// Imports the auth function from Clerk for authentication.
import { auth } from "@clerk/nextjs/server";
// Imports redirect for server-side navigation.
import { redirect } from "next/navigation";
// Imports Image component from Next.js for optimized image rendering.
import Image from "next/image";
// Imports React for component creation.
import React from "react";
// Imports Link component from Next.js for client-side navigation.
import Link from "next/link";

// Defines the NewCompanion asynchronous functional component.
// This component allows users to create new companions or informs them if they've reached their limit.
const NewCompanion = async () => {
  // Retrieves the userId from the authentication context.
  const { userId } = await auth();

  // If no userId is found, redirects to the sign-in page.
  if (!userId) redirect("/sign-in");

  // Checks if the user has permission to create a new companion.
  const canCreateCompanion = await newCompanionPermission();

  return (
    // Main container for the new companion page, with responsive width and centering.
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {/* Conditionally renders content based on whether the user can create a companion. */}
      {canCreateCompanion ? (
        // If the user can create a companion, display the Companion Builder form.
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>

          {/* Renders the CompanionForm component. */}
          <CompanionForm />
        </article>
      ) : (
        // If the user cannot create a companion (limit reached), display a promotional message.
        <article className="companion-limit">
          {/* Displays an image indicating the companion limit has been reached. */}
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          {/* A badge indicating an upgrade is available. */}
          <div className="cta-badge">Upgrade your plan</div>
          {/* Heading for the limit message. */}
          <h1>You’ve Reached Your Limit</h1>
          {/* Explanatory text for the user. */}
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          {/* Link to the subscription page for upgrading the plan. */}
          <Link
            href="/subcription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

// Exports the NewCompanion component as the default export.
export default NewCompanion;
