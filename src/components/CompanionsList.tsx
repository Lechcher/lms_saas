// Import React for building the component.
import React from "react";

// Import UI components for table display from the project's UI library.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Import utility functions for class name concatenation and subject color retrieval.
import { cn, getSubjectColor } from "@/lib/utils";

// Import Next.js components for navigation and image display.
import Link from "next/link";
import Image from "next/image";

// Define the props interface for the CompanionsList component.
interface CompanionsListProps {
  title: string; // Title to display above the list.
  companions?: Companion[]; // Optional array of Companion objects to display.
  className?: string; // Optional CSS class names for styling.
}

// Define the CompanionsList functional component.
const CompanionsList = ({
  title,
  companions,
  className,
}: CompanionsListProps) => {
  return (
    // Article element to contain the list, with dynamic class names.
    <article className={cn("companion-list", className)}>
      {/* Title of the companion list */}
      <h2 className="font-bold text-3xl">{title}</h2>

      {/* Table component to display companions */}
      <Table>
        {/* Table header */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body, mapping through companions to display each one */}
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              {" "}
              {/* Each companion is a table row */}
              <TableCell>
                {/* Link to the companion's detail page */}
                <Link href={`/companions/${id}`} className="flex gap-3">
                  {/* Subject icon with background color based on subject */}
                  <div
                    className={`size-[72px] flex items-center justify-center rounded-lg max-md:hidden`}
                    style={{
                      backgroundColor: getSubjectColor(subject),
                    }}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={35}
                      height={35}
                    />
                  </div>
                  {/* Companion name and topic */}
                  <div className="flex flex-col gap-2 line-clamp-1">
                    <p className="font-bold text-2xl">{name}</p>
                    <p className="text-lg">{topic}</p>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                {/* Subject badge for larger screens */}
                <div className="subject-badge w-fit max-md:hidden">
                  {subject}
                </div>
                {/* Subject icon for smaller screens */}
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell>
                {/* Duration display */}
                <div className="flex items-center gap-2 w-full justify-end">
                  <p className="text-xl">
                    {duration}{" "}
                    <span className="max-md:hidden">
                      {duration == 0 ? "minute" : "minutes"}
                    </span>
                  </p>
                  <Image
                    src={`/icons/clock.svg`}
                    alt="duration"
                    height={14}
                    width={14}
                    className="md:hidden"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};
export default CompanionsList;
