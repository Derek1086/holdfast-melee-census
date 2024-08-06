"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";

interface ToolBarProps {
  region: string;
  updateRegionHandler: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ region, updateRegionHandler }) => {
  const router = useRouter();

  return (
    <Box>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ padding: "15px" }}>
          <Box sx={{ width: "50%" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push("/")}
              size="large"
              tabIndex={-1}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" noWrap component="div">
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

export default ToolBar;
