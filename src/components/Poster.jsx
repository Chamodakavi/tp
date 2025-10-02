import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function Poster() {
  return (
    <Card
      sx={{
        maxWidth: "60%",
        mx: "auto",
        mt: 5,
        borderRadius: 6,
        background: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
        boxShadow: "0 10px 40px rgba(255,110,127,0.5)",
        color: "#051923",
        fontFamily: "'Poppins', 'Roboto', sans-serif",
        textAlign: "center",
        py: 5,
        px: 4,
      }}
      elevation={8}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "700",
            fontStyle: "italic",
            letterSpacing: 1.2,
            mb: 2,
            textTransform: "capitalize",
            textShadow:
              "1px 1px 3px rgba(255,255,255,0.8), 2px 2px 7px rgba(255,110,127,0.6)",
          }}
        >
          Find the best place
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "600",
            fontFamily: "'Dancing Script', cursive",
            mb: 1,
            letterSpacing: 0.8,
            color: "#d9006c",
            textShadow: "1px 1px 2px #fcc7dc",
          }}
        >
          for memorable vacation
        </Typography>
        <Box
          sx={{
            mt: 3,
            fontSize: "1rem",
            fontWeight: "600",
            color: "#333",
            opacity: 0.7,
            letterSpacing: 0.5,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Your journey starts here — explore, discover, and enjoy every moment!
        </Box>
      </CardContent>
    </Card>
  );
}
