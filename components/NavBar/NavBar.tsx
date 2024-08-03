import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlayerAutoComplete from "./PlayerAutoComplete";

import classes from "./NavBar.module.css";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
            <PlayerAutoComplete />
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
              <Button variant="contained" color="secondary">
                NA
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
