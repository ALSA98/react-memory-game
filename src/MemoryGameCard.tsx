export type MemoryGameCardProps = {
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
};

export const MemoryGameCard = (props: MemoryGameCardProps) => {
  return (
    <div
      className="aspect-square rounded-lg overflow-hidden transition cursor-pointer bg-gray-500 hover:opacity-90 active:opacity-70"
      onClick={props.onClick}
    >
      <img
        src={props.url}
        className={`w-full h-full transition ${
          !props.isFlipped ? "opacity-0" : ""
        }`}
      />
    </div>
  );
};
