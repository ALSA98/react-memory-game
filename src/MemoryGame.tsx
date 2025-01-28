import { useState, useRef } from "react";
import { MemoryGameCard } from "./MemoryGameCard";
import { Card } from "./types";
import {
  createInitialCards,
  hasTwoUnmatchedFlippedCards,
  updateCardsIfTwoMatched,
} from "./utils";

type MemoryGameProps = {
  images: string[];
};

const MemoryGame = (props: MemoryGameProps) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [cards, setCards] = useState<Card[]>(() =>
    createInitialCards(props.images)
  );
  const flipTimeout = useRef<number>();

  const unFlipUnmatchedFlippedCards = () => {
    const flippedCards = cards.filter(
      (card) => card.isFlipped && !card.isMatched
    );
    if (flippedCards.length < 2) return;

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[flippedCards[0].id].isFlipped = false;
      newCards[flippedCards[1].id].isFlipped = false;
      return newCards;
    });
  };

  const checkIfFinished = () => {
    if (cards.every((card) => card.isMatched)) {
      setIsFinished(true);
    }
  };

  const handleCardClick = (id: number) => {
    if (hasTwoUnmatchedFlippedCards(cards)) return;
    if (cards[id].isFlipped) return;
    setCards((prevCards) => {
      const currentCards = [...prevCards];
      currentCards[id].isFlipped = true;
      const updatedCards = updateCardsIfTwoMatched(currentCards);
      return updatedCards;
    });
    clearTimeout(flipTimeout.current);
    flipTimeout.current = setTimeout(unFlipUnmatchedFlippedCards, 700);

    setTimeout(checkIfFinished);
  };

  const handleStart = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      return newCards.map((card) => ({ ...card, isFlipped: true }));
    });
    setIsIntro(false);
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        return newCards.map((card) => ({ ...card, isFlipped: false }));
      });
    }, 3000);
  };

  const handleRestart = () => {
    setCards(createInitialCards(props.images));
    setIsFinished(false);
    handleStart();
  };

  return (
    <div className="mx-auto max-w-xl h-max lg:p-4 p-2 flex flex-col relative">
      <div className="grid grid-cols-4 lg:gap-4 gap-2">
        {cards.map((card) => (
          <MemoryGameCard
            url={card.url}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {(isIntro || isFinished) && (
        <div className="absolute top-0 left-0 bg-white/50 h-full w-full flex items-center justify-center flex-col">
          {isFinished && <h1 className="text-3xl font-black mb-2">YOU WON!</h1>}
          <button
            className="py-3 px-10 bg-gray-800 rounded-lg text-white mx-auto cursor-pointer "
            onClick={isFinished ? handleRestart : handleStart}
          >
            {isFinished ? "RESTART" : "START"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
