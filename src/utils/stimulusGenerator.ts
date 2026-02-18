import { shuffle, sample, without } from 'lodash';
import type { ColorName, ShapeName, ColorStimulus, ShapeStimulus, Stimulus } from '../types/game';
import { COLORS, SHAPES, ITEMS_PER_ROUND } from '../constants/game';

function generateMatchSequence(): boolean[] {
  const half = Math.floor(ITEMS_PER_ROUND / 2);
  const pattern = [
    ...Array(half).fill(true) as boolean[],
    ...Array(ITEMS_PER_ROUND - half).fill(false) as boolean[],
  ];
  return shuffle(pattern);
}

export function generateColorStimuli(roundType: 'color-match' | 'color-mismatch'): ColorStimulus[] { // returning an array of color stimulus objects
  const matchSequence = generateMatchSequence();
  return matchSequence.map((isMatch) => { // iterating through match sequence
    let shouldClick: boolean;
    const word = sample(COLORS)!;
    let displayColor: ColorName;

    if (isMatch === true) { // if match, being more explicit here for readability 
      displayColor = word; // assigning a randomly selected color
    } else { // if mismatch, we have to set the mismatch
      displayColor = sample(without(COLORS, word))!; // so we sample again, but excluding original sample
    }
  
    if (roundType === 'color-match') {
      shouldClick = isMatch; // evaluates to true, we should click
    } else { // roundType is color-mismatch
      shouldClick = !isMatch; // evaluates to true, we should click
    }

    return { kind: 'color', word, displayColor, shouldClick };
  });
}

export function generateShapeStimuli(): ShapeStimulus[] {
  const matchSequence = generateMatchSequence();

  return matchSequence.map((isMatch) => {
    const word = sample(SHAPES)!;
    let displayShape: ShapeName;
    if (isMatch) {
      displayShape = word;
    } else {
      displayShape = sample(without(SHAPES, word))!;
    }
    const shouldClick = !isMatch;

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
