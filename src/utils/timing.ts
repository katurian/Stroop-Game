import { MAX_TIME_MS, MIN_TIME_MS, ITEMS_PER_ROUND } from '../constants/game';

export function getAllottedTimeMs(itemIndex: number): number {
  const roundProgression = itemIndex / (ITEMS_PER_ROUND - 1);
  return Math.round(MAX_TIME_MS - roundProgression * (MAX_TIME_MS - MIN_TIME_MS)); // we multiply the progression by the range. so if we are halfway through it's .5 * 2000
}
