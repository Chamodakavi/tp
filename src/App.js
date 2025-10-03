import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppBarWithSearch from "./components/AppBarWithSearch";
import WeatherCard from "./components/WeatherCard";
import SearchForm from "./components/SearchForm";
import Poster from "./components/Poster";

const BG_IMAGE =
  "url('https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2019-09/couple_bicycles.jpg?itok=ckfvovTg')";

export default function App() {
  const [location, setLocation] = useState({
    city: "Colombo",
    country: "Sri Lanka",
  });
  const [weather, setWeather] = useState({
    temp: 35,
    desc: "Sunny",
    feels: 37,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ city: "Colombo", country: "Sri Lanka" });
          setWeather({ temp: 30, desc: "Sunny", feels: 37 });
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const handleSearch = (cityName) => {
    setLocation({ city: cityName, country: "Country" });
    setWeather({ temp: 27, desc: "Partly Cloudy", feels: 29 });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `${BG_IMAGE}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(34,34,70,0.72)",
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <AppBarWithSearch onSearch={handleSearch} />

        <Box mt={5} ml={5} display={{ md: "flex", sm: "block", xs: "block" }}>
          <WeatherCard weather={weather} location={location} />
          <Box width={5} bgcolor={"black"} mx={5}></Box>
          <Box mx={5}>
            <SearchForm />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
            }}
            width={5}
            bgcolor={"pink"}
            mx={5}
          ></Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Poster />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
