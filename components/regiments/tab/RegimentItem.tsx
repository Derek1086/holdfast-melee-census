import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import RegimentIcon from "../RegimentIcon";
import { Regiment } from "../../../pages/regiments";

interface RegimentItemProps {
  regiment: Regiment;
  setRegiment: (regiment: Regiment) => void;
}

const RegimentItem: React.FC<RegimentItemProps> = ({
  regiment,
  setRegiment,
}) => {
  if (!regiment) {
    return (
      <Typography
        variant="subtitle1"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px" }}
      >
        Regiment Not found
      </Typography>
    );
  }

  return (
    <ListItemButton onClick={() => setRegiment(regiment)}>
      <ListItemAvatar>
        <Avatar sx={{ background: "transparent" }}>
          <RegimentIcon regiment={regiment.tag} height={70} width={70} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography noWrap>{regiment.name}</Typography>}
        secondary={regiment.tag}
      />
    </ListItemButton>
  );
};

export default RegimentItem;
