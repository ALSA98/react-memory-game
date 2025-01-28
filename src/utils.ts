import { Card } from "./types";

export const shuffleArray = (originalArray: string[]): string[] => {
  const arr = [...originalArray];
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const createInitialCards = (images: string[]): Card[] => {
  const duplicatedImages = [...images, ...images];
  const shuffledImages = shuffleArray(duplicatedImages);
  return shuffledImages.map((image, index) => ({
    id: index,
    url: image,
    isFlipped: false,
    isMatched: false,
  }));
};

export const hasTwoUnmatchedFlippedCards = (currentCards: Card[]): boolean => {
  const flippedCards = currentCards.filter(
    (card) => card.isFlipped && !card.isMatched
  );
  return flippedCards.length === 2;
};

export const updateCardsIfTwoMatched = (currentCards: Card[]) => {
  const flippedCards = currentCards.filter(
    (card) => card.isFlipped && !card.isMatched
  );
  if (flippedCards.length < 2) {
    return currentCards;
  }
  if (flippedCards[0].url === flippedCards[1].url) {
    const updatedCards = [...currentCards];
    updatedCards[flippedCards[0].id].isMatched = true;
    updatedCards[flippedCards[1].id].isMatched = true;
    return updatedCards;
  }
  return currentCards;
};
