import Card from "@mui/material/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";
import { Regiment } from "../../../pages/regiments";
import MembersList from "./MembersList";
import { RegionData, Player } from "../../../pages/api/playerFetching";
import RegimentListLoader from "../../loaders/RegimentListLoader";
import SearchFilter from "../SearchFilter";

import classes from "../Regiments.module.css";

interface RegimentMembersTabProps {
  regiment: Regiment | null;
  players: RegionData[];
  region: string;
  setAverageRating: React.Dispatch<React.SetStateAction<number>>;
}

const RegimentMembersTab: React.FC<RegimentMembersTabProps> = ({
  regiment,
  players,
  region,
  setAverageRating,
}) => {
  const [numMembers, setNumMembers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (regiment && players) {
      const regionPlayers = players
        .filter((regionData) => regionData.Region === region)
        .flatMap((regionData) => regionData.players);

      const searchResults = regionPlayers.filter(
        (player: Player) =>
          player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.regiment.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredPlayers(searchResults);
      setNumMembers(searchResults.length);
    }
  }, [searchQuery, players, regiment, region]);

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
      {expanded && !loading && (
        <>
          <SearchFilter setSearchQuery={setSearchQuery} />
          <MembersList
            regiment={regiment}
            players={filteredPlayers}
            region={region}
            setNumMembers={setNumMembers}
            setLoading={setLoading}
            setAverageRating={setAverageRating}
          />
        </>
      )}
      {expanded && loading && <RegimentListLoader />}
    </div>
  );
};

export default RegimentMembersTab;
