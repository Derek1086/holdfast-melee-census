import Card from "@mui/material/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import RegimentList from "./RegimentList";
import { Regiment } from "../../../pages/regiments";

import classes from "../Regiments.module.css";

interface RegimentsTabProps {
  region: string;
  setRegiment: (regiment: Regiment) => void;
}

const RegimentsTab: React.FC<RegimentsTabProps> = ({ region, setRegiment }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={classes.regiments}>
      <Card
        onClick={() => setExpanded(!expanded)}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          cursor: "pointer",
        }}
      >
        <h1>Regiments</h1>
        <ArrowDropDownIcon
          style={{
            transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </Card>
      {expanded && <RegimentList region={region} setRegiment={setRegiment} />}
    </div>
  );
};

export default RegimentsTab;
