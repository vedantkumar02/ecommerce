import { useCallback, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useFilterPanel, useProductFilters } from "@/hooks";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

function ListingFilterToggle() {
  const isDesktop = useIsDesktop();
  const { isMobileOpen, isDesktopExpanded, toggleFilters } = useFilterPanel();
  const filtersActive = isDesktop ? isDesktopExpanded : isMobileOpen;

  return (
    <button
      type="button"
      onClick={toggleFilters}
      aria-label={filtersActive ? "Close filters" : "Open filters"}
      aria-expanded={filtersActive}
      className="rounded p-1 hover:bg-slate-700">
      {isMobileOpen ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}

function ListingSearchInput() {
  const { searchQuery, setSearchQuery } = useProductFilters();

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      className="w-full rounded-lg bg-white py-2 pr-4 pl-10 text-sm text-gray-900 placeholder:text-gray-400"
    />
  );
}

function DetailSearchInput() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const submitSearch = useCallback(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      navigate("/");
      return;
    }
    navigate(`/?q=${encodeURIComponent(trimmed)}`);
  }, [navigate, searchQuery]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          submitSearch();
        }
      }}
      className="w-full rounded-lg bg-white py-2 pr-4 pl-10 text-sm text-gray-900 placeholder:text-gray-400"
    />
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Cart"
        className="rounded p-1 hover:bg-slate-700">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="History"
        className="rounded p-1 hover:bg-slate-700">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Profile"
        className="rounded p-1 hover:bg-slate-700">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </div>
  );
}

export default function Header() {
  const isListingPage = Boolean(useMatch({ path: "/", end: true }));

  return (
    <header className="bg-slate-800 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {isListingPage ? (
          <ListingFilterToggle />
        ) : (
          <button
            type="button"
            aria-label="Menu"
            className="rounded p-1 hover:bg-slate-700">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="relative mx-4 w-full max-w-xl flex-1">
          <svg
            className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {isListingPage ? <ListingSearchInput /> : <DetailSearchInput />}
        </div>

        <HeaderActions />
      </div>
    </header>
  );
}
