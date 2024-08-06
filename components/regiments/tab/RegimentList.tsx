import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RegimentItem from "./RegimentItem";
import { NAREGIMENTS, EUREGIMENTS } from "../RegimentRegistry";
import { Regiment } from "../../../pages/regiments";

interface RegimentListProps {
  region: string;
  setRegiment: (regiment: Regiment) => void;
}

const RegimentList: React.FC<RegimentListProps> = ({ region, setRegiment }) => {
  const regiments = region === "NA" ? NAREGIMENTS : EUREGIMENTS;

  if (!regiments || regiments.length === 0) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        No Regiments Found
      </Typography>
    );
  }

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "100%",
        marginTop: "15px",
      }}
    >
      {regiments.map((regiment, index) => (
        <React.Fragment key={regiment.name}>
          <RegimentItem regiment={regiment} setRegiment={setRegiment} />
          {index < regiments.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RegimentList;
