"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import { Player } from "../pages/api/playerFetching";

import classes from "./NavBar.module.css";

interface NavBarProps {
  region: string;
  updateRegionHandler: () => void;
  setLocation: (newLocation: string) => void;
  filteredPlayers: string;
  setFilteredPlayers: (id: string) => void;
  searchHandler: (input: string) => void;
  searchedPlayers: Player[] | null;
}

const NavBar: React.FC<NavBarProps> = ({
  region,
  updateRegionHandler,
  setLocation,
  filteredPlayers,
  setFilteredPlayers,
  searchHandler,
  searchedPlayers,
}) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredPlayers(event.target.value);
    setLocation("");
    searchHandler(event.target.value);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ padding: "15px" }}>
          <Box className={classes.logo}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, fontWeight: "bold" }}
            >
              HOLDFAST MELEE CENSUS
            </Typography>
          </Box>
          <Box className={classes.search}>
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
              <Autocomplete
                freeSolo
                sx={{ ml: 1, flex: 1 }}
                options={searchedPlayers ? searchedPlayers.slice(0, 6) : []}
                getOptionLabel={(option) => {
                  // Type guard to check if option is a Player
                  if (typeof option === "string") {
                    return option;
                  }
                  const playerName = option.regiment
                    ? option.regiment + " " + option.name
                    : option.name;
                  return playerName;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Players..."
                    InputProps={{
                      ...params.InputProps,
                    }}
                    onChange={inputHandler}
                    value={filteredPlayers}
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
          </Box>
          <Box className={classes.actions}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
                className={classes.region}
              >
                REGION
              </Typography>
              <Button
                variant="text"
                color="secondary"
                onClick={updateRegionHandler}
                size="large"
              >
                {region}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
