import React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const addmovie = () => {
    navigate("/addmovie");
  };
  const addwebseries = () => {
    navigate("/addwebseries");
  };
  const addepisode = () => {
    navigate("/addepisode");
  };
  const addseason = () => {
    navigate("/addseason");
  };
  const changecarousel = () => {
    navigate("/change-carousel");
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
          <ListItemButton onClick={addmovie}>
            <ListItemIcon>
              <AddIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Movie" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={addwebseries}>
            <ListItemIcon>
              <AddIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Web Series" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={addepisode}>
            <ListItemIcon>
              <AddIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Episodes" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={addseason}>
            <ListItemIcon>
              <AddIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Season" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={changecarousel}>
            <ListItemIcon>
              <ViewCarouselIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Change Carousel" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <MovieCreationIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Show Movies" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <MovieCreationIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Show Web Series" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SupervisorAccountIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Admin" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SupervisorAccountIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            POPCORN
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

export default Navbar;
