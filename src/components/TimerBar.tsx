interface Props {
  timeRemaining: number;
}

export function TimerBar({ timeRemaining }: Props) {
  let barColor: string;
  if (timeRemaining > 0.5) {
    barColor = '#6ccd30'; // retro green
  } else if (timeRemaining > 0.25) {
    barColor = '#faea27'; // retro yellow
  } else {
    barColor = '#ff3e00'; // retro red
  }

  return (
    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full transition-none rounded-full"
        style={{ width: `${timeRemaining * 100}%`, backgroundColor: barColor }}
      />
    </div>
  );
}
