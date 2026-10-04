import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { Flashcard as FlashcardType } from "../types";

interface FlashcardProps {
  card: FlashcardType;
  revealed: boolean;
}

export function Flashcard({ card, revealed }: FlashcardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
        backgroundColor: revealed ? "#eef6ff" : "background.paper",
      }}
    >
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="overline" color="text.secondary">
            {revealed ? "Ответ" : "Вопрос"}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {revealed ? card.answer : card.question}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
