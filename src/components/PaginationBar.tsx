"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Defines the props for the PaginationBar component
interface PaginationBarProps {
  page: number; // The current page number
  totalPages: number; // The total number of pages
  subject?: string; // Optional subject filter
  topic?: string; // Optional topic filter
}

// PaginationBar component for navigating through pages
const PaginationBar = ({ page, totalPages }: PaginationBarProps) => {
  const router = useRouter(); // Next.js router for navigation
  const searchParams = useSearchParams(); // Hook to access URL search parameters

  // Handles page change by updating the URL search parameters
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    // Ensures the new page is within valid bounds (1 to totalPages)
    params.set("page", Math.max(1, Math.min(newPage, totalPages)).toString());
    router.push(`?${params.toString()}`); // Navigates to the new URL with updated page parameter
  };

  // Renders the page numbers for the pagination bar
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Maximum number of page numbers to display at once

    // If total pages are less than or equal to the max numbers to show, display all pages
    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`?page=${i}`}
              isActive={i === page} // Highlights the current page
              onClick={() => handlePageChange(i)} // Handles click to change page
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Logic for displaying a subset of page numbers with ellipses for many pages
      let startPage = Math.max(1, page - Math.floor(maxPageNumbersToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

      // Adjust startPage if endPage is too close to totalPages
      if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }

      // Add first page and ellipsis if necessary
      if (startPage > 1) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink
              href={`?page=${1}`}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
        }
      }

      // Add the main range of page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`?page=${i}`}
              isActive={i === page}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Add last page and ellipsis if necessary
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />);
        }
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={`?page=${totalPages}`}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <section className="mb-4">
      <Pagination>
        <PaginationContent>
          {/* Previous page button */}
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${Math.max(1, page - 1)}`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1} // Disable if on the first page
            />
          </PaginationItem>
          {/* Render dynamic page numbers */}
          {renderPageNumbers()}
          {/* Next page button */}
          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(page + 1, totalPages)}`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages} // Disable if on the last page
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default PaginationBar;
