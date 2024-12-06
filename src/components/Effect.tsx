import React, { EffectCallback, PropsWithChildren, useEffect } from "react";

interface Props {
  once?: boolean;
  callback: EffectCallback;
}

/**
 * Redirection 등의 Callback을 컴포넌트 형태로 사용할 수 있도록 해줍니다.
 * @example
 * ```tsx
 * // `/some/path`으로의 리디렉션
 * <Effect callback={() => navigate('/some/path')} />
 * ```
 */
export function Effect({
  once = false,
  callback,
  children,
}: PropsWithChildren<Props>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, once ? [] : [callback]);

  return <>{children}</>;
}
