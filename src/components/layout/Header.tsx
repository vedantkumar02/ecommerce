import { useCallback, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import { useFilterPanel, useProductFilters } from "@/hooks";

const headerIconClass = "h-6 w-6";
const searchIconClass =
  "absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400";

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
      <Icon
        name={isMobileOpen ? "x" : "menu"}
        className={headerIconClass}
      />
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
        <Icon name="cart" className={headerIconClass} />
      </button>
      <button
        type="button"
        aria-label="History"
        className="rounded p-1 hover:bg-slate-700">
        <Icon name="clock" className={headerIconClass} />
      </button>
      <button
        type="button"
        aria-label="Profile"
        className="rounded p-1 hover:bg-slate-700">
        <Icon name="user" className={headerIconClass} />
      </button>
    </div>
  );
}

export default function Header() {
  const isListingPage = Boolean(useMatch({ path: "/", end: true }));
  const isProductDetailPage = Boolean(useMatch({ path: "/product/:id" }));

  return (
    <header className="sticky top-0 z-50 bg-slate-800 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {isListingPage ? (
          <ListingFilterToggle />
        ) : isProductDetailPage ? (
          <div className="pointer-events-none invisible" aria-hidden>
            <HeaderActions />
          </div>
        ) : (
          <button
            type="button"
            aria-label="Menu"
            className="rounded p-1 hover:bg-slate-700">
            <Icon name="menu" className={headerIconClass} />
          </button>
        )}

        <div className="relative mx-4 w-full max-w-xl flex-1">
          <Icon name="search" className={searchIconClass} />
          {isListingPage ? <ListingSearchInput /> : <DetailSearchInput />}
        </div>

        <HeaderActions />
      </div>
    </header>
  );
}
