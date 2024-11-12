import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Link, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} position="fixed" variant="outlined" 

    zIndex={1000}
    >
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <>
              <Typography
                textAlign="center"
                flex="1"
                fontWeight="700"
                color="orange"
              >
                ADMIN
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{
                  marginRight: 1,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/users">
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/buildings">
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="Buildings" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/communications">
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Communications" />
          </ListItemButton>
        </List>
        <Divider />
        <Box display="flex" textAlign="center" justifyItems="center" mx="auto">
          <IconButton
            color="green"
            aria-label="come back to public"
            onClick={()=>navigate('/')}
           
          >
            <ArrowCircleLeftIcon color="green"/>
           
          </IconButton>
          {open && <Typography  flex="1">Come back public</Typography>}
        </Box>
      </Drawer>
    </Box>
  );
}
