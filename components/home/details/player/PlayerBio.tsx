import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayerRating from "./PlayerRating";
import { Player } from "../../../../pages/api/playerFetching";
import findIcon from "./PlayerIcon";
import Image from "next/image";
import RegimentIcon from "../../../regiments/RegimentIcon";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface PlayerBioProps {
  viewingPlayer: Player | null;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  region: string;
}

const PlayerBio: React.FC<PlayerBioProps> = ({
  viewingPlayer,
  setViewingPlayer,
  region,
}) => {
  if (!viewingPlayer) {
    return null;
  }

  const playerName = viewingPlayer.regiment
    ? viewingPlayer.regiment + " " + viewingPlayer.name
    : viewingPlayer.name;
  const playerLocation = viewingPlayer.city
    ? viewingPlayer.city + ", " + viewingPlayer.state
    : viewingPlayer.state;

  return (
    <Modal
      open={viewingPlayer !== null}
      onClose={() => setViewingPlayer(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ ...style, position: "relative" }}>
        <div style={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton aria-label="close" onClick={() => setViewingPlayer(null)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Image
          src={findIcon(viewingPlayer.name)}
          alt={viewingPlayer.name}
          height={180}
          unoptimized
          style={{ borderRadius: "5px" }}
        />
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <RegimentIcon
              regiment={viewingPlayer.regiment}
              height={30}
              width={30}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginTop: "15px" }}
            >
              {playerName}
            </Typography>
          </div>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            color="text.secondary"
            sx={{ marginTop: "15px" }}
          >
            {playerLocation}
          </Typography>
        </div>
        <Typography variant="body2">{viewingPlayer.bio}</Typography>
        <PlayerRating player={viewingPlayer} region={region} />
      </Card>
    </Modal>
  );
};

export default PlayerBio;
