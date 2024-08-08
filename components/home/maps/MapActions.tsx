"use client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import classes from "./MapActions.module.css";

interface MapActionsProps {
  zoomInHandler: () => void;
  zoomOutHandler: () => void;
  resetZoomHandler: () => void;
}

const MapActions: React.FC<MapActionsProps> = ({
  zoomInHandler,
  zoomOutHandler,
  resetZoomHandler,
}) => {
  return (
    <div className="flex">
      <div className={`flex gap-4 items-center ${classes.actions}`}>
        <Button
          variant="text"
          color="secondary"
          sx={{ width: "100px" }}
          onClick={zoomInHandler}
        >
          Zoom In
        </Button>
        <Button
          variant="text"
          color="secondary"
          sx={{ width: "100px" }}
          onClick={zoomOutHandler}
        >
          Zoom Out
        </Button>
        <Button
          variant="text"
          color="secondary"
          sx={{ width: "100px" }}
          onClick={resetZoomHandler}
        >
          Reset
        </Button>
      </div>
      <div className={classes.legend}>
        <Card
          sx={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(to right, #ffffff, #fad2ff, #f6b2ff, #f08efd, #ed64ff, #e83cff, #e51eff, #e100ff, #de01fd)",
          }}
        >
          <div className="flex justify-between items-center p-2 text-black">
            <span>0</span>
            <span>8+</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MapActions;
