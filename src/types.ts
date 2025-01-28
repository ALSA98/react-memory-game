export type Card = {
  id: number;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type MemoryGameProps = {
  images: string[];
};

export type MemoryGameCardProps = {
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
};
