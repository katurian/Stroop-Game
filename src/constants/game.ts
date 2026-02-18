import type { ColorName, ShapeName, RoundConfig } from '../types/game';

export const COLORS: ColorName[] = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];

export const COLOR_HEX: Record<ColorName, string> = {
  RED: '#DC2626',
  BLUE: '#2563EB',
  GREEN: '#16A34A',
  YELLOW: '#CA8A04',
  PURPLE: '#9333EA',
  ORANGE: '#EA580C',
};

export const SHAPES: ShapeName[] = ['SQUARE', 'RECTANGLE', 'TRIANGLE'];

export const ITEMS_PER_ROUND = 10;
export const TOTAL_ROUNDS = 3;
export const MAX_TIME_MS = 3000;
export const MIN_TIME_MS = 1000;
export const INTER_ITEM_DELAY_MS = 400;

export const ROUND_CONFIGS: RoundConfig[] = [
  {
    type: 'color-match',
    label: 'Round 1: Color Match',
    instruction: 'Click if the color of the word matches the word itself.',
  },
  {
    type: 'color-mismatch',
    label: 'Round 2: Color Mismatch',
    instruction: 'Click if the color of the word does not match the word itself.',
  },
  {
    type: 'shape-mismatch',
    label: 'Round 3: Shape Mismatch',
    instruction: 'Click if the word does not match the shape shown.',
  },
];
