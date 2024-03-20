/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useRef,
} from "react";
import { IFallbackDelayer, ISuspenceCustom } from "../../interfaces/components";

const SmartSuspense = ({
  children,
  fallback,
  fallbackDelayMs = 0,
  fallbackMinDurationMs = 0,
}: ISuspenceCustom) => {
  const [isWaitingFallbackMinDurationMs, setIsWaitingFallbackMinDurationMs] =
    useState(false);

  const PromiseThrower = () => {
    throw new Promise(() => {});
  };

  const FallbackDelayer = ({
    fallback,
    fallbackDelayMs = 0,
    onShowFallback,
  }: IFallbackDelayer) => {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
      if (typeof fallbackDelayMs == "number") {
        const timeoutId = setTimeout(() => {
          setShowFallback(true);
          onShowFallback();
        }, fallbackDelayMs);

        return () => {
          clearInterval(timeoutId);
        };
      } else {
        setShowFallback(true);
        onShowFallback();
      }
    }, [fallbackDelayMs, onShowFallback]);

    return showFallback ? fallback : null;
  };
  //

  const timeoutIdRef = useRef<any>(undefined);

  const startWaitingFallbackMinDurationMs = useCallback(() => {
    setIsWaitingFallbackMinDurationMs(true);

    timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setIsWaitingFallbackMinDurationMs(false);
    }, fallbackMinDurationMs);
  }, [fallbackMinDurationMs]);

  useEffect(() => {
    return () => timeoutIdRef.current && clearInterval(timeoutIdRef.current);
  }, []);

  return (
    <Suspense
      fallback={
        <FallbackDelayer
          fallback={fallback}
          fallbackDelayMs={fallbackDelayMs}
          onShowFallback={startWaitingFallbackMinDurationMs}
        />
      }
    >
      {isWaitingFallbackMinDurationMs && <PromiseThrower />}
      {children}
    </Suspense>
  );
};

export default SmartSuspense;
