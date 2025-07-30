// This file contains server-side actions for managing companion data, session history, and user permissions.
// It uses Supabase for database interactions and Clerk for authentication.

"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

/**
 * Creates a new companion entry in the database.
 * @param formData - The data for the new companion.
 * @returns The created companion data.
 * @throws Error if companion creation fails.
 */
export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

/**
 * Retrieves all companions based on provided filters and pagination.
 * @param limit - The maximum number of companions to return.
 * @param page - The page number for pagination.
 * @param subject - Optional subject to filter companions by.
 * @param topic - Optional topic to filter companions by.
 * @returns An array of companions.
 * @throws Error if fetching companions fails.
 */
export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}`)
      .or(`topic.ilike.%${topic}, name.ilike.%${topic}`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

/**
 * Retrieves a single companion by its ID.
 * @param id - The ID of the companion to retrieve.
 * @returns The companion data, or undefined if not found.
 */
export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

/**
 * Adds a companion to the user's session history.
 * @param companionId - The ID of the companion to add to history.
 * @returns The session history data.
 * @throws Error if adding to session history fails.
 */
export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Retrieves recent session history for the current user.
 * @param limit - The maximum number of recent sessions to retrieve.
 * @returns An array of companions from recent sessions.
 * @throws Error if fetching recent sessions fails.
 */
export const getRecentSession = async (limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

/**
 * Retrieves session history for a specific user.
 * @param userId - The ID of the user.
 * @param limit - The maximum number of sessions to retrieve.
 * @returns An array of companions from the user's sessions.
 * @throws Error if fetching user sessions fails.
 */
export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select("companions:companion_id (*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

/**
 * Retrieves all companions created by a specific user.
 * @param userId - The ID of the user (author).
 * @returns An array of companions created by the user.
 * @throws Error if fetching user companions fails.
 */
export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Checks if the current user has permission to create a new companion based on their subscription plan or features.
 * @returns True if the user can create a new companion, false otherwise.
 * @throws Error if checking permission fails.
 */
export const newCompanionPermission = async () => {
  const { userId, has } = await auth();

  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return false;
  } else {
    return true;
  }
};

/**
 * Adds a companion to the user's bookmarks.
 * @param companionId - The ID of the companion to bookmark.
 * @param path - The path to revalidate after adding the bookmark.
 * @returns The bookmark data.
 * @throws Error if adding bookmark fails.
 */
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);
  return data;
};

/**
 * Removes a companion from the user's bookmarks.
 * @param companionId - The ID of the companion to unbookmark.
 * @param path - The path to revalidate after removing the bookmark.
 * @returns The removed bookmark data.
 * @throws Error if removing bookmark fails.
 */
export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

/**
 * Retrieves all bookmarked companions for a specific user.
 * @param userId - The ID of the user.
 * @returns An array of bookmarked companions.
 * @throws Error if fetching bookmarked companions fails.
 */
export const getBookmarkedCompanions = async (userId?: string) => {
  const supabase = createSupabaseClient();

  if (userId === null) return;

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }

  return data.map(({ companions }) => companions);
};
