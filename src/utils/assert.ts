type ErrorLike = Error | string | undefined;
const createError = (error: ErrorLike = "Error") =>
  typeof error === "string" ? new Error(error) : error;

export const assert = (
  condition: unknown,
  error?: ErrorLike,
): asserts condition => {
  if (!condition) {
    throw createError(error);
  }
};

export function ensure<T>(value: T, error?: ErrorLike): NonNullable<T> {
  if (value == null) throw createError(error);
  return value;
}
