import { useGameReducer } from './hooks/useGameReducer';
import { StartScreen } from './components/StartScreen';
import { RoundIntro } from './components/RoundIntro';
import { GamePlay } from './components/GamePlay';

function App() {
  const { state, dispatch } = useGameReducer();
  const { phase } = state;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {phase.kind === 'start' && (
          <StartScreen onStart={() => dispatch({ type: 'START_GAME' })} />
        )}

        {phase.kind === 'round-intro' && (
          <RoundIntro
            config={state.rounds[phase.roundIndex]}
            roundIndex={phase.roundIndex}
            onReady={() =>
              dispatch({ type: 'SHOW_ITEM', roundIndex: phase.roundIndex, itemIndex: 0 })
            }
          />
        )}

        {phase.kind === 'playing' && (
          <GamePlay state={state} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}

export default App;
