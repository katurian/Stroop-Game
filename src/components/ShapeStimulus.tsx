import type { ShapeName } from '../types/game';
import { ShapeSVG } from './ShapeSVG';

interface Props {
  word: ShapeName;
  displayShape: ShapeName;
}

export function ShapeStimulus({ word, displayShape }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-4">
      <span className="text-5xl font-extrabold tracking-wider text-white select-none">
        {word}
      </span>
      <ShapeSVG shape={displayShape} size={100} />
    </div>
  );
}
