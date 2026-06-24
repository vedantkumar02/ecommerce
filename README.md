# E-Commerce Product Listing

A product browsing app that fetches data from [DummyJSON](https://dummyjson.com/docs/products) and provides a listing page with filters and pagination, plus a product detail page.

Live demo: https://ecommerce-vedant.vercel.app/

## Features

- Product listing with filter sidebar (category, price range, brand) and paginated grid
- Product cards showing image, title, price, and rating
- Product detail page with image gallery, description, brand, category, and reviews
- Combined filters with URL-synced state (shareable links, back-navigation preserves filters)
- Search and sort
- Responsive layout with collapsible mobile filters
- Skeleton loading states
- Maintenance screen when the API is unavailable, with retry
- Invalid product IDs show a 404 page; unknown URLs redirect to home
- Shared `PaginationControls` (listing + gallery variants) and reusable `Icon` component

## Tech Stack

- React 19 (functional components + hooks)
- TypeScript
- Vite
- React Router 7
- Tailwind CSS 4
- Axios
- TanStack Query (server-state caching)

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
git clone https://github.com/vedantkumar02/ecommerce.git
cd ecommerce
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Create a `.env` file from `.env.example`:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

### Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start development server        |
| `npm run build`   | Type-check and production build |
| `npm run preview` | Preview production build        |
| `npm run lint`    | Run ESLint                      |

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Set the environment variable `VITE_API_BASE_URL` to `https://dummyjson.com`.
4. Deploy and add the production URL to the **Live demo** line at the top of this README.

For client-side routing on direct URL visits, add a `vercel.json` rewrite so unknown paths serve `index.html` and the app can handle redirects:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Assumptions

This is a **frontend-only** project. All data comes from DummyJSON; there is no custom backend.

- **DummyJSON limitations:** The API does not support combined server-side filtering (e.g. category + brand + price range together). When filters cannot be expressed via a single API call, the app fetches the full catalog (`limit=0`) and filters client-side. This is the best approach available without a backend and works well for DummyJSON (~100 products).
- **Price filter:** Applied on the client after fetch, since DummyJSON has no price-range endpoint.
- **Brand list:** Derived from fetched products, scoped by selected categories when possible.
- **Search debounce:** Search and category changes are debounced (600ms) to reduce API calls while typing.
- **Pagination:** 28 products per page. Page resets to 1 when any filter changes.
- **Filter state in URL:** All filter values live in query params so they survive refresh and detail-page navigation.
- **API errors:** All API failures show a user-friendly maintenance message instead of raw error text.

## Architecture

```
src/
├── pages/              # Route screens (Home, ProductDetailPage, NotFoundPage)
├── components/         # Feature-grouped UI (filters, product, layout, ui)
│   ├── pagination/     # PaginationControls (listing + gallery variants)
│   └── ui/             # Primitives including Icon, Button, Skeleton, MaintenanceMessage
├── hooks/              # Data fetching and filter logic
├── context/            # React context providers (filters, filter panel)
├── services/httpServices/  # Axios client and API functions
├── lib/                # Query client and query keys
├── router/             # React Router configuration
└── constants/          # Shared constants (sort options, debounce)
```

### Data flow

1. **Filter state** is managed by `useProductFiltersLogic`, synced bidirectionally with URL search params via `ProductFiltersProvider`.
2. **Product listing** uses `useProductListing`, which reads filter state and calls `useProducts` (TanStack Query) with either paginated API params or `fetchAll` for client-side filtering.
3. **API layer** (`productService.ts`) wraps DummyJSON endpoints behind a typed Axios client.
4. **Caching** via TanStack Query: products, categories, and product detail are cached and deduplicated across navigations.

### Routing

- `/` - Listing page with sidebar filters (`Layout` → `Sidebar` → `Home`)
- `/product/:id` - Product detail (no sidebar; filters preserved in URL for back navigation)
- `*` (any other path) - Redirects to `/`
- Route `errorElement` - Unexpected route errors show maintenance UI with retry

`ProductCard` passes `location.state.from` so the back button returns to the listing URL with active filters.

### Error handling

| Scenario                            | Behavior                                  |
| ----------------------------------- | ----------------------------------------- |
| API failure (network, 500, timeout) | Maintenance message + **Try again**       |
| Invalid product ID (API 404)        | **Product not found** page + Back to home |
| Unknown URL                         | Redirect to `/`                           |
| Unexpected route error              | Maintenance message + Back to home        |

### UI patterns

- **`PaginationControls`**: single pagination component with `listing` (product grid, ellipsis) and `gallery` (image carousel, Prev/Next) variants
- **`Icon`**: shared SVG icons used across pagination, navigation, header, and sidebar
- **`MaintenanceMessage`**: neutral maintenance UI for API failures
- **`NotFoundPage`**: 404 page for invalid products

## Improvements (Given More Time)

- Add Zod runtime validation on API responses
- Add E2E tests (Playwright) for filter → detail → back flows
- Lazy-load routes with `React.lazy`
- Add dark mode and design tokens in Tailwind theme config

**Out of scope (requires backend):** server-side combined filtering for large catalogs instead of client-side `fetchAll`.
