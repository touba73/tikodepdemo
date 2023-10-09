import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Header() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My todos</Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Header;
