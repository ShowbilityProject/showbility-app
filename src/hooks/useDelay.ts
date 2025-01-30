import { useState } from "react";
import { useTimeout } from "./useTimeout";

export function useDelay(delay: number) {
  const [delayOver, setDelayOver] = useState(false);
  useTimeout(() => setDelayOver(true), delay);

  return delayOver;
}
