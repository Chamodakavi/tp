import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
} from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { getWeatherData } from "../utils/OpenWeatherAPI";
import { getAirQuality, getCountryData } from "../utils/OpenWeatherAPI";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../utils/AuthContext";

export default function SearchForm() {
  // Store city and country separately in inputs state
  const [inputs, setInputs] = useState({ city: "", country: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn, login } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);

  // Handle inputs change individually by name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setOpenLogin(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Fetch by city only (country can be used elsewhere)
      const data = await getWeatherData(inputs.city.trim());
      const dataAir = await getAirQuality(inputs.city.trim());
      const dataCountry = await getCountryData(inputs.country.trim());

      console.log("Air Quality Data:", dataAir);
      console.log("country:", dataCountry);

      setResult({
        airQuality: dataAir, // placeholders
        population: dataCountry,
        safetyRating: 4.7,
        weatherDetails: data,
      });
    } catch {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    login(credentialResponse);
    setOpenLogin(false);
  };
  const handleError = () => {
    console.log("Login Failed");
  };
  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        //maxWidth: 600,
        mx: "auto",
        ml: { md: "auto", sm: -5, xs: -5 },
        p: 3,
        pb: { sm: 5, xs: 5 },
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

      {/* Country input */}
      <TextField
        name="country"
        label="Country"
        value={inputs.country}
        onChange={handleChange}
        variant="filled"
        fullWidth
        sx={{
          mb: 2,
          input: { color: "#cfd8dc" },
          label: { color: "#80d8ff" },
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      />

      {/* City input */}
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!inputs.city || loading}
      >
        {loading ? "Loading..." : "Search"}
      </Button>

      {error && (
        <Typography mt={2} color="error">
          {error}
        </Typography>
      )}

      {result && (
        <Grid container spacing={2} mt={4}>
          {/* Air Quality Card */}
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
                  AQI: {result.airQuality?.quality ?? "N/A"}
                </Typography>
                <Typography variant="body2" color="#b2dfdb">
                  {result.airQuality?.level ?? "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Population Card */}
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
                  {result.population
                    ? result.population.toLocaleString()
                    : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Safety Rating Card */}
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
                  {result.safetyRating ?? "N/A"} / 5
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Weather Details Card */}
          {result.weatherDetails && (
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#1e3d59" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    color="#fff"
                  >
                    Weather in {result.weatherDetails.name},{" "}
                    {result.weatherDetails.sys?.country}
                  </Typography>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <WbSunnyIcon sx={{ fontSize: 48, color: "#ffd54f" }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h3" fontWeight="bold" color="#fff">
                        {kelvinToCelsius(result.weatherDetails.main?.temp)} °C
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ textTransform: "capitalize", color: "#ddd" }}
                      >
                        {result.weatherDetails.weather?.[0]?.description}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography mt={2} color="#ccc">
                    Humidity: {result.weatherDetails.main?.humidity}% | Wind:{" "}
                    {result.weatherDetails.wind?.speed} m/s | Clouds:{" "}
                    {result.weatherDetails.clouds?.all}%
                  </Typography>

                  <Typography mt={1} color="#ccc">
                    Pressure: {result.weatherDetails.main?.pressure} hPa |
                    Visibility: {result.weatherDetails.visibility} meters
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}

      <>
        {/* Your form JSX here */}
        <Dialog
          open={openLogin}
          onClose={() => setOpenLogin(false)}
          maxWidth="xs"
          fullWidth
        >
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Sign in with Google
            </Typography>
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleError} />
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setOpenLogin(false)}
            >
              Cancel
            </Button>
          </Box>
        </Dialog>
      </>
    </Box>
  );
}
