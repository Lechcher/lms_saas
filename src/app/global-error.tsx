"use client"; // This directive marks the file as a Client Component

// Import necessary modules
import * as Sentry from "@sentry/nextjs"; // Sentry for error tracking
import NextError from "next/error"; // Next.js default error page component
import { useEffect } from "react"; // React hook for side effects

// Define the GlobalError component, which handles global errors in the application
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  // Use useEffect to capture exceptions with Sentry when an error occurs
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]); // Dependency array ensures this runs when the error object changes

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}