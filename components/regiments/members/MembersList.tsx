import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MemberItem from "./MemberItem";
import { RegionData, Player } from "../../../pages/api/playerFetching";
import { Regiment } from "../../../pages/regiments";
import PlayerBio from "../../home/details/player/PlayerBio";

interface MembersListProps {
  regiment: Regiment | null;
  players: RegionData[];
  region: string;
  setNumMembers: React.Dispatch<React.SetStateAction<number>>;
}

const MembersList: React.FC<MembersListProps> = ({
  regiment,
  players,
  region,
  setNumMembers,
}) => {
  const [members, setMembers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const loadPlayers = () => {
      if (regiment) {
        setLoading(true);
        try {
          const regionData = players;
          const allPlayers = regionData.flatMap((region) => region.players);
          const filteredPlayers = allPlayers.filter(
            (player) => player.regiment === regiment.tag
          );
          setMembers(filteredPlayers);
          setNumMembers(filteredPlayers.length);
        } catch (error) {
          console.error("Failed to fetch players", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPlayers();
  }, [regiment]);

  if (!regiment) {
    return null;
  }

  if (loading) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Loading players...
      </Typography>
    );
  }

  if (!members || members.length === 0) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        No Players Found
      </Typography>
    );
  }

  return (
    <>
      <PlayerBio
        viewingPlayer={viewingPlayer}
        setViewingPlayer={setViewingPlayer}
        region={region}
      />
      <div style={{ height: "480px" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            overflow: "auto",
            maxHeight: "100%",
            marginTop: "15px",
          }}
        >
          {members.map((member, index) => (
            <React.Fragment key={member.id}>
              <MemberItem member={member} setViewingPlayer={setViewingPlayer} />
              {index < members.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </>
  );
};

export default MembersList;
