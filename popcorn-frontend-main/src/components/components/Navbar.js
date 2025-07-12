import React, { useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  Avatar,
  Drawer,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ModeContext from "../../context/Contexts/ModeContext";
import FilterContext from "../../context/Contexts/FilterContext";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const home = () => {
    navigate("/");
  };
  const movies = () => {
    navigate("/filter/movies");
  };
  const tvseries = () => {
    navigate("/filter/tv-series");
  };
  const hollywood = () => {
    navigate("/filter/hollywood");
  };
  const bollywood = () => {
    navigate("/filter/bollywood");
  };
  const contact = () => {
    navigate("/contact");
  };
  const pricing = () => {
    navigate("/pricing");
  };
  const [state, setState] = useState({
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
          <ListItemButton onClick={home}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={movies}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movies" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={tvseries}>
            <ListItemIcon>
              <TvIcon />
            </ListItemIcon>
            <ListItemText primary="TV-Series" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={contact}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={pricing}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Pricing" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const login = () => {
    navigate("/login");
  };
  const signup = () => {
    navigate("/signup");
  };
  const account = () => {
    navigate("/account");
  };
  const mode = useContext(ModeContext);
  const lightStyle = {
    backgroundColor: "white",
    color: "black",
  };
  const darkStyles = {
    backgroundColor: "black",
    color: "white",
  };
  const iconDarkStyle = {
    color: "white",
    paddingLeft: "20px",
  };
  const iconLightStyle = {
    color: "black",
    paddingLeft: "20px",
  };
  const token = localStorage.getItem("token");
  let query = "";
  const { searchMovies } = useContext(FilterContext);
  const search = (e) => {
    e.preventDefault();
    let searchq = document.getElementById("search").value;
    searchMovies(searchq);
    query = `/search/${searchq}`;
    navigate(query);
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
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            <MenuItem onClick={movies}>Movies</MenuItem>
            <MenuItem onClick={tvseries}>Tv-Series</MenuItem>
            <MenuItem onClick={hollywood}>Hollywood</MenuItem>
            <MenuItem onClick={bollywood}>Bollywood</MenuItem>
          </Typography>
          <Search style={{ border: "1px solid black", display: "flex" }}>
            <IconButton
              aria-label="search"
              onClick={search}
              style={mode.checked === false ? iconDarkStyle : iconLightStyle}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              id="search"
            />
          </Search>
          <Box sx={{ flexGrow: 0, paddingLeft: "10px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/avtar.png" />
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
              {!token ? (
                <div>
                  <MenuItem onClick={login}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem onClick={signup}>
                    <Typography textAlign="center">Signup</Typography>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={account}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </div>
              )}
              <MenuItem>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        onClick={() =>
                          mode.checked === false
                            ? mode.setChecked(true)
                            : mode.setChecked(false)
                        }
                      />
                    }
                    label={
                      <Typography
                        color="black"
                        fontSize="12px"
                        fontFamily={"Merriweather, serif"}
                      >
                        {mode.checked === true ? "Light Mode" : "Dark Mode"}
                      </Typography>
                    }
                  />
                </FormGroup>
              </MenuItem>
            </Menu>
          </Box>
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
