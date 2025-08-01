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

interface PaginationBarProps {
  page: number;
  totalPages: number;
  subject?: string;
  topic?: string;
}

const PaginationBar = ({
  page,
  totalPages,
  subject,
  topic,
}: PaginationBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", Math.max(1, Math.min(newPage, totalPages)).toString());
    if (subject) params.set("subject", subject);
    if (topic) params.set("topic", topic);
    router.push(`?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
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
    } else {
      let startPage = Math.max(1, page - Math.floor(maxPageNumbersToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

      if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
      }

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
    <main className="mb-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${Math.max(1, page - 1)}`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(page + 1, totalPages)}`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default PaginationBar;
