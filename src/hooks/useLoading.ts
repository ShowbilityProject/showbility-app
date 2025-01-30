import { useCallback, useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const loadingPromise = useCallback(
    <T>(promise: Promise<T>) => {
      setIsLoading(true);
      promise.finally(() => setIsLoading(false));

      return promise;
    },
    [setIsLoading],
  );

  const startLoading = useCallback(
    <T>(asyncFn: () => Promise<T>) => loadingPromise(asyncFn()),
    [loadingPromise],
  );

  const loadingFn = useCallback(
    <T>(asyncFn: () => Promise<T>) =>
      () =>
        startLoading(asyncFn),
    [startLoading],
  );

  return { isLoading, loadingPromise, startLoading, loadingFn };
}
