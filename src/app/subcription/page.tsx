import { PricingTable } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Subcription = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return (
    <main className="flex items-center">
      <div className="flex flex-col text-center max-w-xl mb-11">
        <h1>Choose Your Learning Journey</h1>
        <p>
          Start free, upgrade anytime. Unlock smarter Conversations, deeper
          insights, and unlimited potential with a plan that fits your goals.
        </p>
      </div>

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

      <PricingTable />
    </main>
  );
};

export default Subcription;
