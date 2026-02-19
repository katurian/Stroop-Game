export type ColorName = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'PURPLE' | 'ORANGE';

export type ShapeName = 'SQUARE' | 'RECTANGLE' | 'TRIANGLE';

export type RoundType = 'color-match' | 'color-mismatch' | 'shape-mismatch';

export interface ColorStimulus {
  kind: 'color';
  word: ColorName;
  displayColor: ColorName;
  shouldClick: boolean;
}

export interface ShapeStimulus {
  kind: 'shape';
  word: ShapeName;
  displayShape: ShapeName;
  shouldClick: boolean;
}

export type Stimulus = ColorStimulus | ShapeStimulus;

export interface ItemResult {
  roundIndex: number;
  itemIndex: number;
  stimulus: Stimulus;
  clicked: boolean;
  responseTimeMs: number | null;
  correct: boolean;
  allottedTimeMs: number;
}

export type GamePhase =
  | { kind: 'start' }
  | { kind: 'round-intro'; roundIndex: number }
  | { kind: 'playing'; roundIndex: number; itemIndex: number }
  | { kind: 'results' };

export interface RoundConfig {
  type: RoundType;
  label: string;
}

export interface GameState {
  phase: GamePhase;
  rounds: RoundConfig[];
  stimuli: Stimulus[][];
  results: ItemResult[];
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'BEGIN_ROUND'; roundIndex: number }
  | { type: 'SHOW_ITEM'; roundIndex: number; itemIndex: number }
  | { type: 'RECORD_RESULT'; result: ItemResult }
  | { type: 'FINISH_GAME' }
  | { type: 'RESET' };
