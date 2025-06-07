"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  count: number;
  categorySlug: string;
  filters: string;
};

export default function PaginationWithLinks({
  count,
  categorySlug,
  filters,
}: Props) {
  const [activePage, setActivePage] = useState(1);
  // Helper to update or add the _page param in the URL
  function buildHref(page: number) {
    const base = `/products/category/${categorySlug}`;
    const params = new URLSearchParams(filters);

    // Always set _limit=12
    params.set("_limit", "12");

    // Always set _page=1 for the first page, otherwise use the page number
    params.set("_page", String(page || 1));

    return `${base}?${params.toString()}`;
  }

  const searchParams = useSearchParams();
  const activePageUrl = new URLSearchParams(searchParams.toString())
    .toString()
    .split("&")
    .find((param) => param.startsWith("_page="))
    ?.split("=")[1];

  useEffect(() => {
    setActivePage(parseInt(activePageUrl ?? "1"));
  }, [activePageUrl]);

  return (
    <Pagination
      count={count}
      page={activePage}
      hideNextButton
      hidePrevButton
      shape="rounded"
      sx={{ bgcolor: "none", direction: "ltr" }}
      renderItem={(item) => (
        <PaginationItem
          sx={{
            border: "1px solid var(--color-primary-400)",
            bgcolor:
              item.page == activePage
                ? "var(--color-primary-400) !important"
                : "none",
            ":hover": {
              bgcolor: "var(--color-primary-200) !important",
            },
          }}
          component={Link}
          href={buildHref(item.page!)}
          {...item}
        />
      )}
    />
  );
}
