import { useEffect, useRef, useCallback, useState } from 'react';
import type { GameState, GameAction, ItemResult } from '../types/game';
import { ITEMS_PER_ROUND, TOTAL_ROUNDS, INTER_ITEM_DELAY_MS } from '../constants/game';
import { getAllottedTimeMs } from '../utils/timing';
import { useItemTimer } from '../hooks/useItemTimer';
import { usePlayerStopwatch } from '../hooks/usePlayerStopwatch';
import { TimerBar } from './TimerBar';
import { ClickButton } from './ClickButton';
import { ColorStimulus } from './ColorStimulus';
import { ShapeStimulus } from './ShapeStimulus';

interface Props {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function GamePlay({ state, dispatch }: Props) {
  const phase = state.phase;
  const isPlaying = phase.kind === 'playing';
  const roundIndex = isPlaying ? phase.roundIndex : 0;
  const itemIndex = isPlaying ? phase.itemIndex : 0;

  const stimulus = isPlaying ? state.stimuli[roundIndex][itemIndex] : null;
  const allottedTime = getAllottedTimeMs(itemIndex);
  const roundConfig = state.rounds[roundIndex];

  const itemHandledRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setStartTime, getResponseTime } = usePlayerStopwatch();

  const advanceToNext = useCallback(() => {
    console.log('advanceToNext:', { roundIndex, itemIndex });
    if (itemIndex < ITEMS_PER_ROUND - 1) { // if we arent out of items for this round
      dispatch({ type: 'SHOW_ITEM', roundIndex, itemIndex: itemIndex + 1 }); // then we increment itemIndex to move to the next item
    } else if (roundIndex < TOTAL_ROUNDS - 1) { // else, if this current round is not the last round
      dispatch({ type: 'BEGIN_ROUND', roundIndex: roundIndex + 1 }); // then return new state. we increment roundIndex to move to next round
    } else { // out of items, out of rounds. so game is finished.
      dispatch({ type: 'FINISH_GAME' }); // return new state 
    }
  }, [dispatch, roundIndex, itemIndex]);

  const recordAndAdvance = useCallback((result: ItemResult) => {
    console.log('recordAndAdvance:', result);
    dispatch({ type: 'RECORD_RESULT', result });
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      advanceToNext();
    }, INTER_ITEM_DELAY_MS); // ms buffer between items
  }, [dispatch, advanceToNext]);

  const handleExpire = useCallback(() => { // if player never clicks
    if (itemHandledRef.current || !stimulus) return;
    itemHandledRef.current = true;

    const isCorrect = !stimulus.shouldClick;
    console.log('handleExpire:', { stimulus, isCorrect });
    recordAndAdvance({
      roundIndex,
      itemIndex,
      stimulus,
      clicked: false,
      responseTimeMs: null, // no response to measure, so null!
      correct: isCorrect,
      allottedTimeMs: allottedTime,
    });
  }, [stimulus, roundIndex, itemIndex, allottedTime, recordAndAdvance]);

  const isTimerActive = isPlaying && !isTransitioning;
  const { timeRemaining, cancel } = useItemTimer({
    allottedTimeMs: allottedTime,
    onExpire: handleExpire,
    isActive: isTimerActive,
  });

  // reset click and start tracking on each new item
  useEffect(() => {
    if (!isPlaying) return;
    console.log('new item:', { roundIndex, itemIndex, stimulus });
    itemHandledRef.current = false;
    setIsTransitioning(false);
    setStartTime();
  }, [isPlaying, roundIndex, itemIndex, setStartTime]);

  const handleClick = useCallback(() => { // if player clicks
    if (itemHandledRef.current || isTransitioning || !stimulus) return;
    itemHandledRef.current = true;
    cancel();

    const responseTimeMs = getResponseTime();
    const isCorrect = stimulus.shouldClick;
    console.log('handleClick:', { stimulus, isCorrect, responseTimeMs });
    recordAndAdvance({
      roundIndex,
      itemIndex,
      stimulus,
      clicked: true,
      responseTimeMs,
      correct: isCorrect,
      allottedTimeMs: allottedTime,
    });
  }, [isTransitioning, cancel, getResponseTime, stimulus, roundIndex, itemIndex, allottedTime, recordAndAdvance]);

  // added keyboard support so space or enter is also supported
  useEffect(() => {
    if (!isPlaying) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPlaying, handleClick]);

  if (!isPlaying || !stimulus) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center text-md text-base text-gray-400">
        <span>{roundConfig.label}</span>
        <span>
          {itemIndex + 1} / {ITEMS_PER_ROUND}
        </span>
      </div>

      <TimerBar timeRemaining={timeRemaining} />

      <p className="text-center text-gray-500 text-xl">
        {roundConfig.type === 'color-match' && 'Click if the color of the word matches the word itself.'}
        {roundConfig.type === 'color-mismatch' && <>Click if the color of the word does <span className="text-red-500 font-bold">not</span> match the word itself.</>}
        {roundConfig.type === 'shape-mismatch' && <>Click if the word does <span className="text-red-500 font-bold">not</span> match the shape shown.</>}
      </p>

      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {stimulus.kind === 'color' ? (
          <ColorStimulus word={stimulus.word} displayColor={stimulus.displayColor} />
        ) : (
          <ShapeStimulus word={stimulus.word} displayShape={stimulus.displayShape} />
        )}
      </div>

      <ClickButton onClick={handleClick} disabled={isTransitioning} />

      <p className="text-center text-gray-600 text-md">
        or press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400 text-md">Space</kbd>
      </p>
    </div>
  );
}
