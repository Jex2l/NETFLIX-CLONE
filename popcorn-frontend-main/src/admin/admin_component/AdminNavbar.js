import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import HomeIcon from "@mui/icons-material/Home";
import ModeContext from "../../context/Contexts/ModeContext";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Admin_navbar = () => {
  const mode = useContext(ModeContext);
  const lightStyle = {
    backgroundColor: "white",
    color: "black",
  };
  const darkStyles = {
    backgroundColor: "black",
    color: "white",
  };
  const navigate = useNavigate();
  const profile = () => {
    navigate("/account");
  };
  const transactions = () => {
    navigate("/account/transactions");
  };
  const changePass = () => {
    navigate("/account/changepassword");
  };
  const likedMovies = () => {
    navigate("/account/likedmovies");
  };
  const favorite = () => {
    navigate("/account/favorite");
  };
  const goHome = () => {
    navigate("/");
  };
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemButton onClick={profile}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={favorite}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorite" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={likedMovies}>
            <ListItemIcon>
              <ThumbUpIcon />
            </ListItemIcon>
            <ListItemText primary="Liked Movies" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={transactions}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={changePass}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={goHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Go To Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const home = () => {
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={mode.checked === false ? darkStyles : lightStyle}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src="/logo512.png"
              alt="logo"
              height={50}
              style={{ marginTop: "10px", cursor: "pointer" }}
              onClick={home}
            />
          </Typography>
          <Typography
            onClick={goHome}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
          >
          </Typography>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Admin_navbar;
