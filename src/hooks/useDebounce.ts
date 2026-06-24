import { useEffect, useRef, useState } from "react";

export default function useDebounce<T>(
  value: T,
  delay: number,
  resetKey?: string,
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const prevResetKey = useRef(resetKey);

  useEffect(() => {
    if (resetKey !== undefined && resetKey !== prevResetKey.current) {
      prevResetKey.current = resetKey;
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay, resetKey]);

  return debouncedValue;
}
