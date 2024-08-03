import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";

export default function PlayerAutoComplete() {
  const router = useRouter();

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <IconButton
        sx={{ p: "10px" }}
        aria-label="home"
        onClick={() => {
          router.push("/");
        }}
      >
        <HomeIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Autocomplete
        freeSolo
        sx={{ ml: 1, flex: 1 }}
        options={top100Films.slice(0, 6)}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Players..."
            InputProps={{
              ...params.InputProps,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
              "& .MuiInputBase-root": {
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
              },
            }}
          />
        )}
      />
    </Paper>
  );
}

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films: readonly FilmOptionType[] = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
