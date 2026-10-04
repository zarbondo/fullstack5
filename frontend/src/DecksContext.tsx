import { createContext, useContext, useState, type ReactNode } from "react";
import type { Deck } from "./types";
import { initialDecks } from "./data/mockData";

interface DecksContextValue {
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  getDeck: (id: string) => Deck | undefined;
}

const DecksContext = createContext<DecksContextValue | null>(null);

export function DecksProvider({ children }: { children: ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>(initialDecks);

  function addDeck(deck: Deck) {
    setDecks((prev) => [deck, ...prev]);
  }

  function getDeck(id: string) {
    return decks.find((deck) => deck.id === id);
  }

  return (
    <DecksContext.Provider value={{ decks, addDeck, getDeck }}>
      {children}
    </DecksContext.Provider>
  );
}

export function useDecks() {
  const ctx = useContext(DecksContext);
  if (!ctx) {
    throw new Error("useDecks должен вызываться внутри DecksProvider");
  }
  return ctx;
}
