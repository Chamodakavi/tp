import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
  Dialog,
  Button,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../utils/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AppBarWithSearch({ onSearch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, user, logout, login } = useAuth();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const openLogin = () => {
    setOpenLoginDialog(true);
    handleMenuClose(); // close menu before opening dialog
  };

  const closeLogin = () => {
    setOpenLoginDialog(false);
  };

  const handleLoginSuccess = (credentialResponse) => {
    login(credentialResponse); // from useAuth
    closeLogin();
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "rgba(34,34,64,0.92)", boxShadow: 8 }}
      >
        <Toolbar>
          {/* Logo and Title */}
          <Box display="flex" alignItems="center" mr={2}>
            <WbSunnyIcon fontSize="large" sx={{ color: "#ffa000", mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" letterSpacing={1}>
              Destination Checker
            </Typography>
          </Box>
          {/* SearchBar in center */}
          <Box flex={1} display="flex" justifyContent="center">
            {/* <SearchBar onSearch={onSearch} /> */}
          </Box>
          {/* User icon on right */}
          <Box ml={2}>
            <IconButton color="inherit" onClick={handleAvatarClick}>
              <Avatar
                sx={{ bgcolor: "#374151", width: 36, height: 36 }}
                src={isLoggedIn && user?.picture ? user.picture : undefined}
              >
                {!isLoggedIn && <PersonIcon sx={{ color: "#fff" }} />}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: { minWidth: 260 },
        }}
      >
        {isLoggedIn ? (
          <Box sx={{ px: 2, pt: 1, pb: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar src={user.picture} sx={{ mr: 1 }} />
              <Box>
                <Typography fontWeight="bold">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem>
              <AccountCircleIcon sx={{ mr: 1, color: "gray" }} />
              <ListItemText primary="Manage your Google Account" />
            </MenuItem>
            <MenuItem>
              <PersonAddIcon sx={{ mr: 1, color: "gray" }} />
              <ListItemText primary="Add another account" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                handleMenuClose();
              }}
            >
              <LogoutIcon sx={{ mr: 1, color: "gray" }} />
              <ListItemText primary="Sign out" />
            </MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={openLogin}>
            <ListItemText primary="Sign in with Google" />
          </MenuItem>
        )}
      </Menu>
      <Dialog
        open={openLoginDialog}
        onClose={closeLogin}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Sign in with Google
          </Typography>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.error("Login failed");
            }}
          />
          <Button variant="outlined" sx={{ mt: 2 }} onClick={closeLogin}>
            Cancel
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
