"use client";
// Import functions for adding and removing bookmarks from companion actions
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
// Import Next.js components for image optimization and linking
import Image from "next/image";
import Link from "next/link";
// Import Next.js hook for getting the current pathname
import { usePathname } from "next/navigation";
// Import React's useState hook for managing component state
import { useState } from "react";

// Define the props interface for the CompanionCard component
interface CompanionCardProps {
  id: string; // Unique identifier for the companion
  name: string; // Name of the companion
  topic: string; // Topic associated with the companion
  subject: string; // Subject of the companion
  duration: number; // Duration of the companion's lesson in minutes
  color: string; // Color associated with the companion (e.g., for card background)
  bookmarked: boolean; // Boolean indicating if the companion is bookmarked by the user
}

// CompanionCard component displays a single companion's information and actions
const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  // Get the current pathname to use for revalidation after bookmark actions
  const pathname = usePathname();

  // State to manage the bookmarked status of the companion
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  // Handler function for bookmarking/unbookmarking a companion
  const handleBookmark = async () => {
    if (isBookmarked) {
      // If currently bookmarked, remove the bookmark
      await removeBookmark(id, pathname);
    } else {
      // If not bookmarked, add the bookmark
      await addBookmark(id, pathname);
    }

    // Toggle the bookmarked state locally for immediate UI update
    setIsBookmarked(!isBookmarked);
  };

  return (
    // Article element representing the companion card, with dynamic background color
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        {/* Display the subject of the companion */}
        <div className="subject-badge">{subject}</div>
        {/* Bookmark button */}
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              isBookmarked
                ? "/icons/bookmark-filled.svg" // Filled bookmark icon if bookmarked
                : "/icons/bookmark.svg" // Outline bookmark icon if not bookmarked
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      {/* Companion's name and topic */}
      <h2 className="text-2xl font-bold line-clamp-1">{name}</h2>
      <p className="text-sm line-clamp-1">{topic}</p>
      {/* Companion's duration */}
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      {/* Link to the companion's detailed lesson page */}
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
