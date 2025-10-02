import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");
  return (
    <Box sx={{ width: 250 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search for location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(search)}
        InputProps={{
          sx: { bgcolor: "#282944", borderRadius: 2, color: "#fff" },
          // endAdornment: (
          //   <InputAdornment position="end">
          //     <IconButton
          //       sx={{ color: "#90caf9" }}
          //       onClick={() => onSearch(search)}
          //     >
          //       <SearchIcon />
          //     </IconButton>
          //   </InputAdornment>
          // ),
        }}
      />
    </Box>
  );
}
