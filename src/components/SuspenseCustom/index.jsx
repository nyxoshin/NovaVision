import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useRef,
} from "react";

const SmartSuspense = ({
  children,
  fallback,
  fallbackMinDurationMs = 0,
}) => {
  const [isWaitingFallbackMinDurationMs, setIsWaitingFallbackMinDurationMs] =
    useState(false);

  const PromiseThrower = () => {
    throw new Promise(() => {});
  };

  const FallbackDelayer = ({
    fallback,
    onShowFallback,
  }) => {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
      setShowFallback(true);
      onShowFallback();
    }, [onShowFallback]);

    return showFallback ? fallback : null;
  };
  //

  const timeoutIdRef = useRef(undefined);

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
