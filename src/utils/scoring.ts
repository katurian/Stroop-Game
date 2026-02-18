import type { ItemResult } from '../types/game';

export interface ScoreSummary {
  totalItems: number;
  correctCount: number;
  accuracyPercent: number;
  averageResponseTimeMs: number | null;
  clickedCount: number;
}

export function calculateScore(results: ItemResult[]): ScoreSummary {
  const totalItems = results.length;
  const correctCount = results.filter(result => result.correct).length;
  const accuracyPercent = totalItems > 0 ? Math.round((correctCount / totalItems) * 100) : 0;

  const clickedResults = results.filter(result => result.clicked && result.responseTimeMs !== null);
  const clickedCount = clickedResults.length;
  let averageResponseTimeMs: number | null;
  if (clickedCount > 0) {
    const totalResponseTimeMs = clickedResults.reduce((runningTotal, result) => runningTotal + result.responseTimeMs!, 0); // adding up response times
    averageResponseTimeMs = Math.round(totalResponseTimeMs / clickedCount); // taking response time average for items where the player clicked
  } else {
    averageResponseTimeMs = null;
  }

  return { totalItems, correctCount, accuracyPercent, averageResponseTimeMs, clickedCount };
}
