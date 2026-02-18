import { useRef, useCallback } from 'react';

export function usePlayerStopwatch() {
  const startTimeRef = useRef(0);

  const setStartTime = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  const getResponseTime = useCallback((): number => {
    return Math.round(performance.now() - startTimeRef.current);
  }, []);

  return { setStartTime, getResponseTime };
}
