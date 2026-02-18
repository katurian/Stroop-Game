import { useState, useEffect, useRef, useCallback } from 'react';

interface UseItemTimerOptions {
  allottedTimeMs: number;
  onExpire: () => void;
  isActive: boolean;
}

export function useItemTimer({ allottedTimeMs, onExpire, isActive }: UseItemTimerOptions) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef(0);
  const frameIdRef = useRef(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isActive) {
      setElapsedMs(0);
      return;
    }

    startTimeRef.current = performance.now();

    const updateTimer = () => {
      const now = performance.now();
      const currentElapsedMs = now - startTimeRef.current;
      setElapsedMs(Math.min(currentElapsedMs, allottedTimeMs));
      if (currentElapsedMs < allottedTimeMs) { // during final browser call this will evaluate to false and we wont recall 
        frameIdRef.current = requestAnimationFrame(updateTimer); // call updateTimer on next repaint
      }
    };
    frameIdRef.current = requestAnimationFrame(updateTimer); // on next repaint call updateTimer

    timeoutIdRef.current = setTimeout(() => {
      cancelAnimationFrame(frameIdRef.current);
      setElapsedMs(allottedTimeMs); // make sure timer bar is 0% once we run outta time
      onExpireRef.current(); // we call onExpire, which dispatches an action
    }, allottedTimeMs); // lines above execute once player's time is up after x ms

    return () => {
      cancelAnimationFrame(frameIdRef.current); // clean up
      clearTimeout(timeoutIdRef.current);
    };
  }, [allottedTimeMs, isActive]); // only call useEffect when these two change

  const cancel = useCallback(() => {
    cancelAnimationFrame(frameIdRef.current);
    clearTimeout(timeoutIdRef.current);
  }, []);

  const timeRemaining = isActive ? Math.max(0, 1 - elapsedMs / allottedTimeMs) : 1;

  return { elapsedMs, timeRemaining, cancel };
}
