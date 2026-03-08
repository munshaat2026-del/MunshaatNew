"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"; // adjust if your path differs
import { cn } from "@/lib/utils"; // optional helper for classNames; replace if you don't have it
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Locale } from "@/types";

type PaginationProps = {
  totalPages: number;
  siblingCount?: number; // number of pages to show around current (default 1)
  boundaryCount?: number; // pages to always show at beginning/end (default 1)
  locale:Locale
};

const DOTS = "DOTS";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
}

/**
 * Return a pagination range array containing numbers and DOTS
 * Example: [1, 'DOTS', 4,5,6, 'DOTS', 10]
 */
function getPaginationRange({
  total,
  current,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  total: number;
  current: number;
  siblingCount?: number;
  boundaryCount?: number;
}) {
  const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 3; // first, last, current, and two dots
  // If the number of pages is small we show them all
  if (total <= totalPageNumbers) {
    return range(1, total);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, boundaryCount + 2);
  const rightSiblingIndex = Math.min(
    current + siblingCount,
    total - boundaryCount - 1
  );

  const showLeftDots = leftSiblingIndex > boundaryCount + 2;
  const showRightDots = rightSiblingIndex < total - boundaryCount - 1;

  const pages: (number | typeof DOTS)[] = [];

  // no left dots, but right dots
  if (!showLeftDots && showRightDots) {
    const leftItemCount = boundaryCount + siblingCount * 2 + 2; // + current
    const leftRange = range(1, leftItemCount);
    pages.push(...leftRange);
    pages.push(DOTS);
    pages.push(...range(total - boundaryCount + 1, total));
    return pages;
  }

  // left dots, no right dots
  if (showLeftDots && !showRightDots) {
    pages.push(...range(1, boundaryCount));
    pages.push(DOTS);
    const rightItemCount = boundaryCount + siblingCount * 2 + 2;
    pages.push(...range(total - rightItemCount + 1, total));
    return pages;
  }

  // left & right dots
  pages.push(...range(1, boundaryCount));
  pages.push(DOTS);
  pages.push(...range(leftSiblingIndex, rightSiblingIndex));
  pages.push(DOTS);
  pages.push(...range(total - boundaryCount + 1, total));
  return pages;
}

export default function PaginationShadcn({
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
  locale
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isArabic= locale==="ar"
  const currentPage = Math.max(
    1,
    Number(searchParams?.get("page") ?? 1) || 1
  );

  const pages = useMemo(
    () =>
      getPaginationRange({
        total: Math.max(1, totalPages),
        current: currentPage,
        siblingCount,
        boundaryCount,
      }),
    [totalPages, currentPage, siblingCount, boundaryCount]
  );

  const setPage = (page: number) => {
    const p = Math.max(1, Math.min(Math.max(1, totalPages), Math.floor(page)));
    const params = new URLSearchParams(
      Array.from(searchParams ?? []) as [string, string][]
    );

    // optional: keep URLs clean by removing page when it's 1
    if (p === 1) params.delete("page");
    else params.set("page", String(p));

    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  const prev = () => setPage(currentPage - 1);
  const next = () => setPage(currentPage + 1);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2" dir="ltr">
      <Button
        variant="outline"
        size="sm"
        onClick={prev}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p, idx) =>
        p === DOTS ? (
          <span key={`dots-${idx}`} className="px-3 text-sm">
            &hellip;
          </span>
        ) : (
          <Button
            key={p}
            variant={p === currentPage ? "default" : "ghost"}
            size="sm"
            onClick={() => setPage(Number(p))}
            aria-current={p === currentPage ? "page" : undefined}
            className={cn("px-3", p === currentPage ? "font-semibold" : " ")}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={next}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}