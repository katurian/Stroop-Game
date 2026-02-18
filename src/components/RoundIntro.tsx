import type { RoundConfig } from '../types/game';
import { ITEMS_PER_ROUND, TOTAL_ROUNDS } from '../constants/game';

interface Props { // our expected props
  config: RoundConfig; // config object for our instructions
  roundIndex: number; // which round
  onReady: () => void; // returns nothing, but it dispatches an action
}

export function RoundIntro({ config, roundIndex, onReady }: Props) { // destructuring prop, checking against Props
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div>
        <h2 className="text-4xl font-extrabold text-white mb-4">
          {config.label}
        </h2>
        <p className="text-gray-300 text-lg max-w-md">
          {config.instruction}
        </p>
      </div>

      <div className="text-gray-500 text-sm">
        {`Round ${roundIndex + 1} of ${TOTAL_ROUNDS} — ${ITEMS_PER_ROUND} items`}
      </div>

      <button
        onClick={onReady}
        className="px-10 py-4 text-xl font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
      >
        Ready
      </button>
    </div>
  );
}
