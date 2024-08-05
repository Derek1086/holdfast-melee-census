import React from "react";
import List from "@mui/material/List";
import PlayerItem from "./PlayerItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Player } from "../../../../pages/api/playerFetching";

interface PlayerListProps {
  players: Player[] | null;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  setViewingPlayer,
}) => {
  if (!players || players?.length === 0) {
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
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "70%",
        marginTop: "15px",
      }}
    >
      {players.map((player, index) => (
        <React.Fragment key={player.id}>
          <PlayerItem setViewingPlayer={setViewingPlayer} player={player} />
          {index < players.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default PlayerList;
