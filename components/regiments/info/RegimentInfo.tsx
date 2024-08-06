import Typography from "@mui/material/Typography";
import { Regiment } from "../../../pages/regiments";

import classes from "../Regiments.module.css";

interface RegimentInfoProps {
  regiment: Regiment | null;
}

const RegimentInfo: React.FC<RegimentInfoProps> = ({ regiment }) => {
  if (!regiment) {
    return <div className={classes.info} />;
  }

  return <div className={classes.info}>{regiment.name}</div>;
};

export default RegimentInfo;
