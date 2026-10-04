import type { Deck } from "../types";

export const initialDecks: Deck[] = [
  {
    id: "deck-1",
    title: "Структуры данных",
    sourceFileName: "siaod_lecture_3.pdf",
    createdAt: "2026-09-20",
    cards: [
      {
        id: "card-1-1",
        question: "Какая сложность доступа к элементу массива по индексу?",
        answer: "O(1) — адрес вычисляется по формуле без перебора.",
      },
      {
        id: "card-1-2",
        question: "Что такое коэффициент заполнения хеш-таблицы?",
        answer: "α = n / m, где n — число элементов, m — число корзин.",
      },
      {
        id: "card-1-3",
        question: "Какое свойство выполняется в min-heap?",
        answer: "Каждый родитель не больше своих потомков.",
      },
    ],
  },
  {
    id: "deck-2",
    title: "Базы данных",
    sourceFileName: "mmbd_lecture_1.pdf",
    createdAt: "2026-09-25",
    cards: [
      {
        id: "card-2-1",
        question: "Что такое схема «звезда»?",
        answer: "Таблица фактов в центре, вокруг — таблицы измерений.",
      },
      {
        id: "card-2-2",
        question: "Для чего нужен слой staging?",
        answer: "Промежуточное хранение сырых данных перед очисткой и загрузкой в витрину.",
      },
    ],
  },
];
