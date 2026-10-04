import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import type { Deck } from "../types";

export function DeckCard({ deck }: { deck: Deck }) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{deck.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Источник: {deck.sourceFileName}
        </Typography>
        <Chip
          label={`${deck.cards.length} карточек`}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/decks/${deck.id}`)}>
          Открыть
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => navigate(`/decks/${deck.id}/study`)}
        >
          Повторять
        </Button>
      </CardActions>
    </Card>
  );
}
