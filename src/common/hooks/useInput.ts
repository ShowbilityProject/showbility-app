import { useCallback, useState } from "react";

interface Options {
  numeric?: boolean;
}

export const useInput = (options?: Options) => {
  const [value, setValue] = useState("");

  const onChangeText = useCallback(
    options?.numeric
      ? (text: string) => setValue(text.replace(/[^0-9]/g, ""))
      : setValue,
    [setValue, options?.numeric],
  );

  return {
    value,
    onChangeText,
    ...(options?.numeric && {
      keyboardType: "numeric" as const,
    }),
  };
};
