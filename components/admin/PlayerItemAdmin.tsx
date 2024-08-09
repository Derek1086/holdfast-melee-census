"use client";
import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import findIcon from "../home/details/player/PlayerIcon";
import { Player } from "../../pages/api/playerFetching";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "./UserForm";
import Button from "@mui/material/Button";

interface PlayerItemAdminProps {
  player: Player | null;
  deletePlayer: (playerId: string, region: string) => void;
  region: string;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  setEditingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerItemAdmin: React.FC<PlayerItemAdminProps> = ({
  player,
  deletePlayer,
  region,
  setViewingPlayer,
  setEditingPlayer,
}) => {
  const [open, setOpen] = useState(false);

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
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ ...modalStyle, position: "relative" }}>
          <div style={{ position: "absolute", top: 4, right: 4 }}>
            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginTop: "15px" }}
            textAlign={"center"}
          >
            Delete Player: {playerName}?
          </Typography>
          <div className="flex gap-4 justify-center items-center mt-4">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpen(false)}
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deletePlayer(player.id, region)}
              size="large"
            >
              Delete
            </Button>
          </div>
        </Card>
      </Modal>
      <ListItem
        secondaryAction={
          <div className="gap-4">
            <IconButton
              aria-label="view"
              onClick={() => setViewingPlayer(player)}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => setEditingPlayer(player)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        }
      >
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
      </ListItem>
    </div>
  );
};

export default PlayerItemAdmin;
