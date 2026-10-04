import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useDecks } from "../DecksContext";

export function DeckDetailPage() {
  const { id } = useParams();
  const { getDeck } = useDecks();
  const navigate = useNavigate();
  const deck = id ? getDeck(id) : undefined;

  if (!deck) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">Конспект не найден.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Назад к списку
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4">{deck.title}</Typography>
        <Button variant="contained" onClick={() => navigate(`/decks/${deck.id}/study`)}>
          Начать повторение
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Источник: {deck.sourceFileName} · добавлено {deck.createdAt}
      </Typography>
      <List>
        {deck.cards.map((card, index) => (
          <ListItem key={card.id} divider>
            <ListItemText
              primary={`${index + 1}. ${card.question}`}
              secondary={card.answer}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
