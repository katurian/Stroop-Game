const BEST_TIME_KEY = 'stroop-best-response-time';
const BEST_ACCURACY_KEY = 'stroop-best-accuracy';

export function getBestResponseTime(): number | null {
  const stored = localStorage.getItem(BEST_TIME_KEY);
  if (stored === null) return null;
  return Number(stored);
}

export function saveBestResponseTime(timeMs: number): void {
  localStorage.setItem(BEST_TIME_KEY, String(timeMs));
}

export function getBestAccuracy(): number | null {
  const stored = localStorage.getItem(BEST_ACCURACY_KEY);
  if (stored === null) return null;
  return Number(stored);
}

export function saveBestAccuracy(percent: number): void {
  localStorage.setItem(BEST_ACCURACY_KEY, String(percent));
}
