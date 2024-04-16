import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

const pages = ["Playground", "Home",  "About Us"];
const petsitterSettings = ["Switch to Pet Owner", "Petsitter Account", "Logout"];
const ownerSettings = ["Switch to Caretaker", "Account", "Logout"];
const notSignedInSettings = ["Login", "Register", "Petsitter Login", "Petsitter Register"]
const authPages = [];

function NavBar({ token, setToken, setRole, setUser, role }) {
  const settings = (role === "petsitter") ? petsitterSettings : (role === "owner") ? ownerSettings : notSignedInSettings;
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(#09203f, #1f98b5);",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img id="logo-image" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onChange={(e) => setLastName(e.target.value)}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton onClick={() => {
                  navigate(`/`);
                }} sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }} >
                AllTails
                <PetsIcon sx={{ fontSize: 40 }}/>
              </IconButton>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  navigate(`/${page.toLowerCase()}`);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {!token &&
              authPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(`/${page.toLowerCase()}`);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0, color: "white", display: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={() => {
                  navigate(`/account`);
                }} sx={{ p: 1, color: "white" }} >
                My Account
              </IconButton>
             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: "white" }}> 
              <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                      setToken("");
                      setRole("");
                      setUser();
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                      localStorage.removeItem("role")
                      navigate("/login");
                    } else if (setting === "Switch to Caretaker"){
                      navigate("/Petsitter Login");
                    } else {
                      navigate(`/${setting.toLowerCase()}`);
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;