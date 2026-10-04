export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  title: string;
  sourceFileName: string;
  createdAt: string;
  cards: Flashcard[];
}
