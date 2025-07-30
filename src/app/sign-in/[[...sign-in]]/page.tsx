// Imports the SignIn component from the @clerk/nextjs library.
// This component provides a pre-built UI for user sign-in.
import { SignIn } from "@clerk/nextjs";

// Defines the SignInPage functional component.
// This component is responsible for rendering the sign-in interface.
const SignInPage = () => {
  return (
    // The main element acts as a container, centering its content both horizontally and vertically
    // using Tailwind CSS utility classes (flex, items-center, justify-center).
    <main className="flex items-center justify-center">
      {/* Renders the SignIn component provided by Clerk. */}
      <SignIn />
    </main>
  );
};

// Exports the SignInPage component as the default export for this module.
export default SignInPage;
