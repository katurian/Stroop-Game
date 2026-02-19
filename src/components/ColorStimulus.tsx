import type { ColorName } from '../types/game';
import { COLOR_HEX } from '../constants/game';

interface Props {
  word: ColorName;
  displayColor: ColorName;
}

export function ColorStimulus({ word, displayColor }: Props) {
  return (
    <div className="flex items-center justify-center h-48">
      <span
        className="text-7xl font-extrabold tracking-wider select-none"
        style={{ color: COLOR_HEX[displayColor] }}
      >
        {word}
      </span>
    </div>
  );
}
