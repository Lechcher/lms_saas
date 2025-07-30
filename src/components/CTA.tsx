// Import React for building the component.
import React from "react";
// Import Image component from Next.js for optimized image rendering.
import Image from "next/image";
// Import Link component from Next.js for client-side navigation.
import Link from "next/link";

// Define the CTA (Call To Action) functional component.
const CTA = () => {
  return (
    // Section element with a specific class for styling.
    <section className="cta-section">
      {/* Badge/tagline for the CTA */}
      <div className="cta-badge">Start learning your way.</div>
      {/* Main heading for the CTA */}
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companion
      </h2>
      {/* Descriptive paragraph explaining the benefits */}
      <p>
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image src={`images/cta.svg`} alt="cta" width={362} height={232} />
      <button className="btn-primary">
        <Image src={`icons/plus.svg`} alt="plus" width={12} height={12} />
        <Link href={`/companions/new`}>
          <p>Build New Companion</p>
        </Link>
      </button>
    </section>
  );
};

export default CTA;
