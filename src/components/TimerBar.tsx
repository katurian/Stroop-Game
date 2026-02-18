interface Props {
  timeRemaining: number;
}

export function TimerBar({ timeRemaining }: Props) {
  const barColor =
    timeRemaining > 0.5
      ? 'bg-green-500'
      : timeRemaining > 0.25
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${barColor} transition-none rounded-full`}
        style={{ width: `${timeRemaining * 100}%` }}
      />
    </div>
  );
}
