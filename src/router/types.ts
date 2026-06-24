export type ProductDetailLocationState = {
  from?: string;
};

export function getListingBackPath(
  state: unknown,
  fallback = "/",
): string {
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "string" &&
    state.from.length > 0
  ) {
    return state.from;
  }

  return fallback;
}
