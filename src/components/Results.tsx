import { useState, useEffect } from 'react';
import type { ItemResult, RoundConfig } from '../types/game';
import { calculateScore } from '../utils/scoring';
import { ITEMS_PER_ROUND } from '../constants/game';
import { getBestResponseTime, saveBestResponseTime, getBestAccuracy, saveBestAccuracy } from '../utils/storage';

interface Props {
  results: ItemResult[];
  roundConfigs: RoundConfig[];
  onRestart: () => void;
}

export function Results({ results, roundConfigs, onRestart }: Props) {
  const score = calculateScore(results);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestAccuracy, setBestAccuracy] = useState<number | null>(null);

  useEffect(() => {
    // update best response time
    const previousBestTime = getBestResponseTime();
    if (score.averageResponseTimeMs !== null) {
      if (previousBestTime === null || score.averageResponseTimeMs < previousBestTime) {
        saveBestResponseTime(score.averageResponseTimeMs);
        setBestTime(score.averageResponseTimeMs);
      } else {
        setBestTime(previousBestTime);
      }
    } else {
      setBestTime(previousBestTime);
    }

    // update best accuracy
    const previousBestAccuracy = getBestAccuracy();
    if (previousBestAccuracy === null || score.accuracyPercent > previousBestAccuracy) {
      saveBestAccuracy(score.accuracyPercent);
      setBestAccuracy(score.accuracyPercent);
    } else {
      setBestAccuracy(previousBestAccuracy);
    }
  }, [score.averageResponseTimeMs, score.accuracyPercent]);

  const roundScores = roundConfigs.map((config, i) => {
    const roundResults = results.filter(result => result.roundIndex === i);
    const correct = roundResults.filter(result => result.correct).length;
    return { label: config.label, correct, total: ITEMS_PER_ROUND };
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div>
        <p className="text-indigo-400 text-base font-semibold uppercase tracking-widest mb-2">
          Game Over
        </p>
        <h2 className="text-5xl font-extrabold text-white">
          Your Results
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
        <div className="bg-gray-800 rounded-xl p-5">
          <p className="text-4xl font-extrabold text-indigo-400">{score.accuracyPercent}%</p>
          <p className="text-gray-400 text-base mt-1">Accuracy</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-5">
          <p className="text-4xl font-extrabold text-indigo-400">
            {score.averageResponseTimeMs !== null ? `${score.averageResponseTimeMs}ms` : '—'}
          </p>
          <p className="text-gray-400 text-base mt-1">Avg Response</p>
        </div>
      </div>

      <div className="text-gray-300 text-base">
        {score.correctCount} / {score.totalItems} correct
      </div>

      <div className="w-full max-w-xs space-y-2">
        {roundScores.map((roundScore, i) => (
          <div key={i} className="flex justify-between text-base text-gray-400 bg-gray-800/50 rounded-lg px-4 py-3">
            <span>{roundScore.label}</span>
            <span className="font-semibold text-white">{roundScore.correct}/{roundScore.total}</span>
          </div>
        ))}
      </div>

      {(bestAccuracy !== null || bestTime !== null) && (
        <div className="w-full max-w-xs bg-gray-800/50 rounded-xl p-4 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">Personal Bests</p>
          {bestAccuracy !== null && (
            <div className="flex justify-between text-base text-gray-400">
              <span>Best accuracy</span>
              <span className="font-semibold" style={{ color: '#faea27' }}>{bestAccuracy}%</span>
            </div>
          )}
          {bestTime !== null && (
            <div className="flex justify-between text-base text-gray-400">
              <span>Fastest avg</span>
              <span className="font-semibold" style={{ color: '#faea27' }}>{bestTime}ms</span>
            </div>
          )}
        </div>
      )}

      <button
        onClick={onRestart}
        className="px-12 py-5 text-2xl font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
      >
        Play Again
      </button>
    </div>
  );
}
