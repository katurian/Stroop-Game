import { shuffle, sample, without } from 'lodash';
import type { ColorStimulus, ShapeStimulus, Stimulus } from '../types/game';
import { COLORS, SHAPES, ITEMS_PER_ROUND } from '../constants/game';

function generateMatchSequence(): boolean[] {
  const half = Math.floor(ITEMS_PER_ROUND / 2);
  const pattern = [
    ...Array(half).fill(true) as boolean[],
    ...Array(ITEMS_PER_ROUND - half).fill(false) as boolean[],
  ];
  return shuffle(pattern);
}

export function generateColorStimuli(roundType: 'color-match' | 'color-mismatch'): ColorStimulus[] {
  const matchSequence = generateMatchSequence();

  return matchSequence.map((isMatch) => {
    const word = sample(COLORS)!;
    const displayColor = isMatch ? word : sample(without(COLORS, word))!;
    const wordMatchesColor = word === displayColor;
    const shouldClick = roundType === 'color-match' ? wordMatchesColor : !wordMatchesColor;

    return { kind: 'color', word, displayColor, shouldClick };
  });
}

export function generateShapeStimuli(): ShapeStimulus[] {
  const matchSequence = generateMatchSequence();

  return matchSequence.map((isMatch) => {
    const word = sample(SHAPES)!;
    const displayShape = isMatch ? word : sample(without(SHAPES, word))!;
    const wordMatchesShape = word === displayShape;
    const shouldClick = !wordMatchesShape;

    return { kind: 'shape', word, displayShape, shouldClick };
  });
}

export function generateAllStimuli(): Stimulus[][] {
  return [
    generateColorStimuli('color-match'),
    generateColorStimuli('color-mismatch'),
    generateShapeStimuli(),
  ];
}
