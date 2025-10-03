import React from "react";
import { Box, Paper, Typography, Grid, Avatar } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function WeatherCard({ weather, location }) {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "rgba(43, 44, 74, 0.36)",
        borderRadius: 5,
        mb: 6,
        boxShadow: "0 8px 36px #22226366",
        color: "#fff",
        maxWidth: { md: "17%", sm: "40%", xs: "40%" },
        backdropFilter: "blur(2px)",
        height: "20%",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar sx={{ width: 66, height: 66, bgcolor: "#433a8b" }}>
            <WbSunnyIcon sx={{ fontSize: 45, color: "#ffb300" }} />
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h3" fontWeight="bold" color="#ffc107">
            {weather.temp}°C
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="#fff">
            {weather.desc}
          </Typography>
          <Typography variant="body1" color="#90caf9">
            Feels like {weather.feels}°
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <LocationOnIcon
              fontSize="small"
              sx={{ mr: 0.5, color: "#e1bee7" }}
            />
            <Typography variant="body2">
              {location.city}, {location.country}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
