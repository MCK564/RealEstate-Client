import React, { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LandscapeIcon from "@mui/icons-material/Landscape";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RestoreIcon from '@mui/icons-material/Restore';

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Popover,
  Stack,
  Tooltip,
} from "@mui/material";
import NavLink from "../components/base/NavLink";

import {
  ArrowDropDown,
  BarChart,
  Favorite,
  Logout,
  Person,
} from "@mui/icons-material";
import appEnqueueSnackbar from "../utils/AppSnackbar";


const pages = [
  {
    text: "Nhà đất bán",
    to: "/for-sale",
  },
  {
    text: "Nhà đất cho thuê",
    to: "/for-rent",
  },
  {
    text: "Dự án",
    to: "/projects",
  },
];

const authlinks = [
  {
    text: "Đăng nhập",
    to: "/login",
  },
  {
    text: "Đăng ký",
    to: "/register",
  },
];
const AppBrand = () => {
  return (
    <Box
      component={RouterLink}
      to={"/"}
      display="flex"
      alignItems={"center"}
      sx={{ textDecoration: "none", color: "inherit" }}
    >
      <LandscapeIcon sx={{ mr: 1 }} color="success" />
      <Typography variant="h6">RealEstate</Typography>
    </Box>
  );
};

const NavLinks = ({ links }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {links.map((link) => (
        <Box key={link.text}>
          <NavLink text={link.text} to={link.to} />
        </Box>
      ))}
    </Box>
  );
};

const FavoriteButton = ({ fontSize = "medium" }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Danh sách yêu thích">
      <IconButton onClick={() => navigate("/favorite")}>
        <Favorite fontSize={fontSize} color="error" />
      </IconButton>
    </Tooltip>
  );
};

const DrawerMenu = ({ open, onClose }) => {
  const navigate = useNavigate();
  const navToPage = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "80vw", maxWidth: 300 } }}
    >
      <Box
        onClick={() => navToPage("/")}
        display={"flex"}
        justifyContent={"center"}
        p={2}
      >
        <AppBrand />
      </Box>

      <Stack px={2}>
    {!localStorage.getItem('token') && <NavLinks links={authlinks} /> } 
        <Button
          onClick={() => navToPage("/new-post")}
          variant="contained"
          fullWidth
          disableElevation
        >
          Đăng tin
        </Button>

        {pages.map((link) => (
          <Box
            key={link.text}
            onClick={() => navToPage(link.to)}
            to={link.to}
            py={1}
            sx={{cursor:"pointer",
          "&:hover":{
            color:"green"
          }
          }}

          >
            <Typography variant="body1">{link.text}</Typography>
          </Box>
        ))}
      </Stack>
    </Drawer>
  );
};

const ActionButton = ({ text, onClick, icon, color = "inherit" }) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      size="large"
      fullWidth
      sx={{ justifyContent: "start" }}
      startIcon={icon}
    >
      {text}
    </Button>
  );
};

const UserActionPopover = ({ anchorEl, setAnchorEl }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    setAnchorEl(null);
    appEnqueueSnackbar("Đăng xuất thành công", { variant: "success" });
    window.location.href = "/login";
  };
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Paper sx={{ minWidth: 300 }}>
        <Stack spacing={0}>
          <ActionButton
            text="Thông tin cá nhân"
            onClick={() =>{
              setAnchorEl(null)
              navigate("/profile")
            } }
            icon={<Person />}
          />
          <ActionButton
            text="Danh sách bài đăng"
            onClick={() => {navigate("/owner_post")
            setAnchorEl(null)
          }}
            icon={<PostAddIcon />}
          />
          <ActionButton
          text="Lịch sử giao dịch"
          onClick={() =>{
            setAnchorEl(null)
            navigate("/payment-history")
          } }
          icon={<RestoreIcon/>}
          />

          <Divider />
          <ActionButton
            text={"Đăng xuất"}
            color="error"
            onClick={onLogout}
            icon={<Logout />}
          />
        </Stack>
      </Paper>
    </Popover>
  );
};

export const MainAppbar = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fullname, setFullname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [avatar_link, setAvatar_link] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogIn(token !== null);
    const storedFullname = localStorage.getItem("fullname");
    setFullname(storedFullname || "");
    const role = localStorage.getItem("role");
    setIsAdmin(role === "ROLE_ADMIN");
    const al = localStorage.getItem("avatar");
    setAvatar_link(al);
  }, []);
  return (
    <>
      <AppBar position="fixed" variant="outlined" elevation={0} color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <AppBrand />
            {/* large screen */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box mx="auto">
              <NavLinks links={pages} />
              </Box>
             
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {isAdmin && (
                  <Button
                    onClick={() => navigate("/admin")}
                    variant="contained"
                    color="success"
                  >
                    Tới trang quản lý
                  </Button>
                )}
                {isLogIn ? (
                  <>
                    <FavoriteButton />

                    <Button
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      color="inherit"
                      endIcon={<ArrowDropDown />}
                    >
                      <Avatar src={avatar_link} alt="avatar" />
                   
                    </Button>
                  </>
                ) : (
                  <NavLinks links={authlinks} />
                )}
                <Button
                  component={RouterLink}
                  to="/new-post"
                  color="error"
                  variant="outlined"
                >
                  Đăng tin
                </Button>
              </Box>
            </Box>
            {/* small screen */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "end",
                alignItems: "center",
                gap: 1,
              }}
            >
              {isLogIn && (
                <>
                  <FavoriteButton />

                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    color="inherit"
                    endIcon={<ArrowDropDown />}
                  >
                    <Avatar src={avatar_link} alt="avatar" />
                  </Button>
                </>
              )}

              <IconButton onClick={() => setOpenDrawer((prev) => !prev)}>
                <BarChart sx={{ rotate: "-90deg" }} fontSize="small" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* hidden */}
      <DrawerMenu open={openDrawer} onClose={() => setOpenDrawer(false)} />
      <UserActionPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};
