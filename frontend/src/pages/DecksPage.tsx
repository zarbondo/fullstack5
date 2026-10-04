import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../DecksContext";
import { DeckCard } from "../components/DeckCard";

export function DecksPage() {
  const { decks } = useDecks();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4">Мои конспекты</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/upload")}
        >
          Загрузить PDF
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {decks.map((deck) => (
          <Grid key={deck.id} size={{ xs: 12, sm: 6 }}>
            <DeckCard deck={deck} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
