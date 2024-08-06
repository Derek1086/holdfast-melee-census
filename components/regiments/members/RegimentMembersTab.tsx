import Card from "@mui/material/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Regiment } from "../../../pages/regiments";
import MembersList from "./MembersList";
import { RegionData } from "../../../pages/api/playerFetching";

import classes from "../Regiments.module.css";

interface RegimentMembersTabProps {
  regiment: Regiment | null;
  players: RegionData[];
  region: string;
}

const RegimentMembersTab: React.FC<RegimentMembersTabProps> = ({
  regiment,
  players,
  region,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [numMembers, setNumMembers] = useState(0);

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
        {numMembers > 0 ? <h1>Members {numMembers}</h1> : <h1>Members</h1>}
        <ArrowDropDownIcon
          style={{
            transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </Card>
      {expanded && (
        <MembersList
          regiment={regiment}
          players={players}
          region={region}
          setNumMembers={setNumMembers}
        />
      )}
    </div>
  );
};

export default RegimentMembersTab;
