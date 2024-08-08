"use client";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import findIcon from "./PlayerIcon";
import { Player } from "../../../../pages/api/playerFetching";
import Image from "next/image";

interface PlayerItemProps {
  player: Player | null;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerItem: React.FC<PlayerItemProps> = ({
  player,
  setViewingPlayer,
}) => {
  if (!player) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center" }}
      >
        No Player Found
      </Typography>
    );
  }

  const playerName = player.regiment
    ? player.regiment + " " + player.name
    : player.name;
  const playerLocation = player.city
    ? player.city + ", " + player.state
    : player.state;

  return (
    <ListItemButton onClick={() => setViewingPlayer(player)}>
      <ListItemAvatar>
        <Avatar sx={{ background: "transparent" }}>
          <Image
            src={findIcon(player.name)}
            alt={player.name}
            height={50}
            width={50}
            unoptimized
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={playerName} secondary={playerLocation} />
    </ListItemButton>
  );
};

export default PlayerItem;
