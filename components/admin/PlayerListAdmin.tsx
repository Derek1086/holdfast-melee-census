import React from "react";
import List from "@mui/material/List";
import PlayerItemAdmin from "./PlayerItemAdmin";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Player } from "../../pages/api/playerFetching";

interface PlayerListAdminProps {
  players: Player[] | null;
  deletePlayer: (playerId: string, region: string) => void;
  region: string;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  setEditingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  loading: boolean;
}

const PlayerListAdmin: React.FC<PlayerListAdminProps> = ({
  players,
  deletePlayer,
  region,
  setViewingPlayer,
  setEditingPlayer,
  loading,
}) => {
  if ((!players || players?.length === 0) && !loading) {
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
        maxHeight: "75vh",
        marginTop: "15px",
      }}
    >
      {players?.map((player, index) => (
        <React.Fragment key={player.id}>
          <PlayerItemAdmin
            player={player}
            deletePlayer={deletePlayer}
            region={region}
            setViewingPlayer={setViewingPlayer}
            setEditingPlayer={setEditingPlayer}
          />
          {index < players.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default PlayerListAdmin;
