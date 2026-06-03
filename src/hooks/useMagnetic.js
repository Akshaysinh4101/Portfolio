import { useRef } from "react";

/**
 * Disabled magnetic effect hook.
 * Returns a standard React ref that performs no transformations,
 * keeping all buttons and interactive elements static.
 */
export const useMagnetic = () => {
  const ref = useRef(null);
  return ref;
};

export default useMagnetic;
