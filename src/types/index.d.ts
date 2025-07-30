// This file contains global type definitions and interfaces used throughout the application.

// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

/**
 * Defines the available subjects for companions.
 */
enum Subject {
  maths = "maths",
  language = "language",
  science = "science",
  history = "history",
  coding = "coding",
  geography = "geography",
  economics = "economics",
  finance = "finance",
  business = "business",
}

/**
 * Represents a Companion object, extending a DocumentList with specific properties.
 */
type Companion = Models.DocumentList<Models.Document> & {
  $id: string;
  name: string;
  subject: Subject;
  topic: string;
  duration: number;
  bookmarked: boolean;
};

/**
 * Interface for the data required to create a new companion.
 */
interface CreateCompanion {
  name: string;
  subject: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
}

/**
 * Interface for parameters used to retrieve all companions, including pagination and filtering.
 */
interface GetAllCompanions {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
}

/**
 * Interface for building a client, potentially for authentication or session management.
 */
interface BuildClient {
  key?: string;
  sessionToken?: string;
}

/**
 * Interface for the data required to create a new user.
 */
interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

/**
 * Interface for search parameters, typically from a URL query.
 */
interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Interface for Avatar component properties.
 */
interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Interface for a saved message, including its role and content.
 */
interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

/**
 * Interface for properties passed to the CompanionCall component.
 */
interface CompanionCallProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
}
