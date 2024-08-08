"use client";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Player } from "../../../pages/api/playerFetching";
import findIcon from "../../home/details/player/PlayerIcon";
import Image from "next/image";

interface MemberItemProps {
  member: Player;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const MemberItem: React.FC<MemberItemProps> = ({
  member,
  setViewingPlayer,
}) => {
  if (!member) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Player Not found
      </Typography>
    );
  }

  return (
    <ListItemButton onClick={() => setViewingPlayer(member)}>
      <ListItemAvatar>
        <Avatar sx={{ background: "transparent" }}>
          <Image
            src={findIcon(member.name)}
            alt={member.name}
            height={50}
            width={50}
            unoptimized
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={<Typography noWrap>{member.name}</Typography>} />
    </ListItemButton>
  );
};

export default MemberItem;
