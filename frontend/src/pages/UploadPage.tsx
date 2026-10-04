import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDecks } from "../DecksContext";
import type { Deck } from "../types";

export function UploadPage() {
  const { addDeck } = useDecks();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !file) {
      setError("Укажите название конспекта и выберите PDF-файл.");
      return;
    }

    const newDeck: Deck = {
      id: `deck-${Date.now()}`,
      title: title.trim(),
      sourceFileName: file.name,
      createdAt: new Date().toISOString().slice(0, 10),
      cards: [
        {
          id: `card-${Date.now()}-1`,
          question: "Демо-вопрос, сгенерированный после загрузки конспекта",
          answer: "Демо-ответ (реальная генерация появится после подключения backend).",
        },
      ],
    };

    addDeck(newDeck);
    navigate(`/decks/${newDeck.id}`);
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Загрузить конспект
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Название конспекта"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
          />
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            {file ? file.name : "Выбрать PDF-файл"}
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </Button>
          <Button type="submit" variant="contained">
            Создать карточки
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
