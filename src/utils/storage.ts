const PLAYER_NAME_KEY = 'stroop-player-name';
const BEST_TIME_KEY = 'stroop-best-response-time';

export function getPlayerName(): string | null {
  return localStorage.getItem(PLAYER_NAME_KEY);
}

export function savePlayerName(name: string): void {
  localStorage.setItem(PLAYER_NAME_KEY, name);
}

export function getBestResponseTime(): number | null {
  const stored = localStorage.getItem(BEST_TIME_KEY);
  if (stored === null) return null;
  return Number(stored);
}

export function saveBestResponseTime(timeMs: number): void {
  localStorage.setItem(BEST_TIME_KEY, String(timeMs));
}
