import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StyleIcon from "@mui/icons-material/Style";
import { Link as RouterLink } from "react-router-dom";

export function NavBar() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar sx={{ gap: 2 }}>
        <StyleIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Учебные карточки
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Мои конспекты
        </Button>
        <Button color="inherit" component={RouterLink} to="/upload">
          Загрузить PDF
        </Button>
      </Toolbar>
    </AppBar>
  );
}
