import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";

export default function SearchForm() {
  const [inputs, setInputs] = useState({ city: "", country: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate fetching data with input values
    setResult({
      airQuality: { aqi: 52, level: "Moderate" },
      population: 3400000,
      safetyRating: 4.7,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        mx: "auto",
        p: 3,
        bgcolor: "rgba(43,44,74,0.85)",
        borderRadius: 5,
        boxShadow: "0 8px 40px #22226377",
        color: "#fff",
        backdropFilter: "blur(3px)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
        sx={{ letterSpacing: 1 }}
      >
        Enter Destination
      </Typography>

      <TextField
        name="city"
        label="City"
        value={inputs.city}
        onChange={handleChange}
        variant="filled"
        fullWidth
        required
        sx={{
          mb: 2,
          input: { color: "#cfd8dc" },
          label: { color: "#80d8ff" },
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      />

      <TextField
        name="country"
        label="Country"
        value={inputs.country}
        onChange={handleChange}
        variant="filled"
        fullWidth
        required
        sx={{
          mb: 3,
          input: { color: "#cfd8dc" },
          label: { color: "#80d8ff" },
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!inputs.city || !inputs.country}
      >
        Search
      </Button>

      {result && (
        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#284a62" }}>
              <CardContent>
                <AirIcon sx={{ fontSize: 30, color: "#4db6ac", mb: 1 }} />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#81d4fa"
                >
                  Air Quality
                </Typography>
                <Typography variant="h5" color="#b2dfdb">
                  AQI: {result.airQuality.aqi}
                </Typography>
                <Typography variant="body2" color="#b2dfdb">
                  {result.airQuality.level}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#293d49" }}>
              <CardContent>
                <PeopleIcon sx={{ fontSize: 30, color: "#fa7268", mb: 1 }} />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#ffab91"
                >
                  Population
                </Typography>
                <Typography variant="h5" color="#ffccbc">
                  {result.population.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#243e3d" }}>
              <CardContent>
                <SecurityIcon sx={{ fontSize: 30, color: "#a3d8f4", mb: 1 }} />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#81d4fa"
                >
                  Safety Rating
                </Typography>
                <Typography variant="h5" color="#b3e5fc">
                  {result.safetyRating} / 5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
