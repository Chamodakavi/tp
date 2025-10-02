import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchBar from "./SearchBar";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";

export default function AppBarWithSearch({ onSearch }) {
  return (
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
          <IconButton color="inherit">
            <Avatar sx={{ bgcolor: "#374151", width: 36, height: 36 }}>
              <PersonIcon sx={{ color: "#fff" }} />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
