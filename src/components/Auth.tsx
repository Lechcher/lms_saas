// Import React library
import React from "react";
// Import authentication components from Clerk for Next.js
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Auth component handles user authentication UI
const Auth = () => {
  return (
    // React Fragment to group multiple elements without adding extra nodes to the DOM
    <>
      {/* SignedOut component from Clerk: Renders its children only when the user is signed out */}
      <SignedOut>
        {/* SignInButton from Clerk: Provides a button that triggers the sign-in flow */}
        <SignInButton>
          {/* Custom button for signing in, styled with 'btn-signin' class */}
          <button className="btn-signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      {/* SignedIn component from Clerk: Renders its children only when the user is signed in */}
      <SignedIn>
        {/* UserButton from Clerk: Displays user profile information and provides options like sign-out */}
        <UserButton />
      </SignedIn>
    </>
  );
};

// Export the Auth component as the default export
export default Auth;
