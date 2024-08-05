import ListItem from "@mui/material/ListItem";
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
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player }) => {
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
    <ListItem>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <Image
              src={findIcon(player.name)}
              alt="img"
              height={50}
              width={50}
              unoptimized
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={playerName} secondary={playerLocation} />
      </ListItemButton>
    </ListItem>
  );
};

export default PlayerItem;
