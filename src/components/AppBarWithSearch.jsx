import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Dialog,
  Button,
} from "@mui/material";
import SearchBar from "./SearchBar";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import { GoogleLogin } from "@react-oauth/google";

export default function AppBarWithSearch({ onSearch }) {
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleSuccess = (credentialResponse) => {
    console.log("Success:", credentialResponse);
    // Save token or handle login
    handleLoginClose(); // Close login window after login
  };

  const handleError = () => {
    console.log("Login Failed");
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
            <IconButton color="inherit" onClick={handleLoginOpen}>
              <Avatar sx={{ bgcolor: "#374151", width: 36, height: 36 }}>
                <PersonIcon sx={{ color: "#fff" }} />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Dialog
        open={openLogin}
        onClose={handleLoginClose}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Sign in with Google
          </Typography>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleLoginClose}>
            Cancel
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
