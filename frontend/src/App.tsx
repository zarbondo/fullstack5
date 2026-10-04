import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { DecksPage } from "./pages/DecksPage";
import { UploadPage } from "./pages/UploadPage";
import { DeckDetailPage } from "./pages/DeckDetailPage";
import { StudyPage } from "./pages/StudyPage";

export function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DecksPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/decks/:id" element={<DeckDetailPage />} />
        <Route path="/decks/:id/study" element={<StudyPage />} />
      </Routes>
    </>
  );
}
