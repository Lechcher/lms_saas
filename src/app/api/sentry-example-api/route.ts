// Import NextResponse for handling API responses in Next.js
import { NextResponse } from "next/server";

// Export `dynamic = "force-dynamic"` to ensure this route is always dynamic
// and not statically optimized, which is useful for testing error monitoring.
export const dynamic = "force-dynamic";

// Define a custom error class that extends the native Error class.
// This allows for specific error types to be caught and identified by Sentry.
class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError"; // Set the name of the error for identification
  }
}

// A faulty API route to test Sentry's error monitoring capabilities.
// This GET function is intentionally designed to throw an error.
export function GET() {
  // Throw an instance of the custom error, with a message indicating its purpose.
  throw new SentryExampleAPIError("This error is raised on the backend called by the example page.");
  // This line will not be reached because of the error thrown above.
  // It's included to show what a successful response would look like if no error occurred.
  return NextResponse.json({ data: "Testing Sentry Error..." });
}
