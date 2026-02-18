import { useReducer } from 'react';
import type { GameState, GameAction } from '../types/game';
import { ROUND_CONFIGS } from '../constants/game';
import { generateAllStimuli } from '../utils/stimulusGenerator';

const initialState: GameState = {
  phase: { kind: 'start' },
  rounds: ROUND_CONFIGS,
  stimuli: [],
  results: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        phase: { kind: 'round-intro', roundIndex: 0 },
        stimuli: generateAllStimuli(),
        results: [],
      };

    case 'BEGIN_ROUND':
      return {
        ...state,
        phase: { kind: 'round-intro', roundIndex: action.roundIndex },
      };

    case 'SHOW_ITEM':
      return {
        ...state,
        phase: { kind: 'playing', roundIndex: action.roundIndex, itemIndex: action.itemIndex },
      };

    case 'RECORD_RESULT':
      return {
        ...state,
        results: [...state.results, action.result],
      };

    case 'FINISH_GAME':
      return { ...state, phase: { kind: 'results' } };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
}
