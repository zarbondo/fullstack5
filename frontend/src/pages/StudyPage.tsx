import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useDecks } from "../DecksContext";
import { Flashcard } from "../components/Flashcard";

export function StudyPage() {
  const { id } = useParams();
  const { getDeck } = useDecks();
  const navigate = useNavigate();
  const deck = id ? getDeck(id) : undefined;
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!deck) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="warning">Конспект не найден.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Назад к списку
        </Button>
      </Container>
    );
  }

  if (deck.cards.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="info">В этом конспекте пока нет карточек.</Alert>
      </Container>
    );
  }

  const card = deck.cards[index];
  const totalCards = deck.cards.length;
  const progress = ((index + 1) / totalCards) * 100;

  function handleNext() {
    setRevealed(false);
    setIndex((prev) => (prev + 1) % totalCards);
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {deck.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Карточка {index + 1} из {deck.cards.length}
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 3 }} />
      <Flashcard card={card} revealed={revealed} />
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={() => setRevealed((prev) => !prev)}>
          {revealed ? "Скрыть ответ" : "Показать ответ"}
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Следующая
        </Button>
      </Stack>
    </Container>
  );
}
