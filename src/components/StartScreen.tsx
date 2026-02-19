import { useState, useEffect } from 'react';
import { getPlayerName, savePlayerName, getBestResponseTime } from '../utils/storage';

interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props) {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    setPlayerName(getPlayerName());
    setBestTime(getBestResponseTime());
  }, []);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed.length === 0) return;
    savePlayerName(trimmed);
    setPlayerName(trimmed);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      {!playerName && (
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName(); }}
            placeholder="Enter your name"
            className="px-4 py-3 text-lg rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleSaveName}
            className="px-5 py-3 text-lg font-bold rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      )}
      {playerName && (
        <p className="text-3xl font-bold text-indigo-400">
          Hello {playerName}!
        </p>
      )}

      <div>
        <h1 className="text-6xl font-extrabold text-white mb-3">
          Stroop Game
        </h1>
        <p className="text-gray-400 text-xl max-w-md">
          In psychology, the <a className="text-indigo-400" href="https://en.wikipedia.org/wiki/Stroop_effect">Stroop effect</a> is the delay in reaction time between neutral and incongruent stimuli.
        </p>
      </div>

      <div className="text-left text-gray-300 text-lg space-y-3 max-w-sm">
        <p>
          <span className="font-semibold text-indigo-400">Round 1:</span> Click if the color of the word matches the word itself.
        </p>
        <p>
          <span className="font-semibold text-indigo-400">Round 2:</span> Click if the color of the word does <span className="text-red-500 font-bold">not</span> match the word itself.
        </p>
        <p>
          <span className="font-semibold text-indigo-400">Round 3:</span> Click if the word does <span className="text-red-500 font-bold">not</span> match the shape shown.
        </p>
      </div>

      <button
        onClick={onStart}
        className="px-12 py-5 text-2xl font-bold rounded-xl bg-indigo-400 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
      >
        Start Game
      </button>
    </div>
  );
}
