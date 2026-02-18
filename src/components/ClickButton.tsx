interface Props {
  onClick: () => void;
  disabled: boolean;
}

export function ClickButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-5 text-2xl font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white transition-transform duration-75 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none"
    >
      Click!
    </button>
  );
}
