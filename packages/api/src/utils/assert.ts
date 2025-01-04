export const assert = (
  condition: unknown,
  error?: Error | string,
): asserts condition => {
  if (!condition) {
    throw typeof error === "string" ? new Error(error) : error;
  }
};
