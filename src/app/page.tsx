import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id={123}
          name="Neura the Brainy Explorer"
          topic="Topic: Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#E5D0FF"
        />
        <CompanionCard
          id={125}
          name="Countsy the Number Wizard"
          topic="Topic: Derivatives & IntegralsDerivatives & Integrals"
          subject="Maths"
          duration={30}
          color="#FFDA6E"
        />
        <CompanionCard
          id={124}
          name="Verba the Vocabulary Builder"
          topic="Topic: English Literature"
          subject="Language"
          duration={30}
          color="#BDE7FF"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recent compeleted sessions"
          companions={recentSessions}
          className="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default HomePage;
