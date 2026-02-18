import { ROUND_CONFIGS } from '../constants/game';

interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <div>
        <h1 className="text-5xl font-extrabold text-white mb-3">
          Geode Brain Game
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          Not sure what to put here. ermmmmm
        </p>
      </div>

      <div className="text-left text-gray-300 text-sm space-y-2 max-w-sm">
        {ROUND_CONFIGS.map((config, index) => (
          <p key={config.type}>
            <span className="font-semibold text-indigo-400">Round {index + 1}:</span> {config.instruction}
          </p>
        ))}
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 text-xl font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
      >
        Start Game
      </button>
    </div>
  );
}
