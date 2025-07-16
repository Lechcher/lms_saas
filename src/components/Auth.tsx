import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Auth = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <button className="btn-signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default Auth;
