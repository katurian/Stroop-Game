import { test, expect } from 'vitest';
import { calculateScore } from './scoring';
import type { ItemResult } from '../types/game';

function makeResult(clicked: boolean, responseTimeMs: number | null, correct: boolean): ItemResult {
  return {
    roundIndex: 0,
    itemIndex: 0,
    stimulus: { kind: 'color', word: 'RED', displayColor: 'RED', shouldClick: true },
    allottedTimeMs: 3000,
    clicked,
    responseTimeMs,
    correct,
  };
}

test('calculateScore returns correct accuracy and average response time', () => {
  const results: ItemResult[] = [
    makeResult(true, 200, true),
    makeResult(true, 400, true),
    makeResult(false, null, true),
    makeResult(true, 600, false),
    makeResult(false, null, false),
  ];

  const score = calculateScore(results);

  expect(score.totalItems).toBe(5);
  expect(score.correctCount).toBe(3);
  expect(score.accuracyPercent).toBe(60);
  expect(score.averageResponseTimeMs).toBe(400);
});

test('calculateScore returns null average when no items were clicked', () => {
  const results: ItemResult[] = [
    makeResult(false, null, true),
    makeResult(false, null, false),
  ];

  const score = calculateScore(results);

  expect(score.averageResponseTimeMs).toBeNull();
  expect(score.accuracyPercent).toBe(50);
});


test('calculateScore returns null average when no items were clicked', () => {
  const results: ItemResult[] = [
    makeResult(false, null, true),
    makeResult(false, null, false),
  ];

  const score = calculateScore(results);

  expect(score.averageResponseTimeMs).toBeNull();
  expect(score.accuracyPercent).toBe(50);
});
