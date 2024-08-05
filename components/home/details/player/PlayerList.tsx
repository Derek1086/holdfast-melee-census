import List from "@mui/material/List";
import PlayerItem from "./PlayerItem";
import Typography from "@mui/material/Typography";
import { Player } from "../../../../pages/api/playerFetching";

interface PlayerListProps {
  players: Player[] | null;
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
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
      {players.map((player) => (
        <PlayerItem key={player.id} player={player} />
      ))}
    </List>
  );
};

export default PlayerList;
