import Typography from "@mui/material/Typography";
import { Regiment } from "../../../pages/regiments";
import { findRegimentIcon } from "../RegimentIcon";
import Image from "next/image";

import classes from "../Regiments.module.css";

interface RegimentInfoProps {
  regiment: Regiment | null;
}

const RegimentInfo: React.FC<RegimentInfoProps> = ({ regiment }) => {
  if (!regiment) {
    return <div className={classes.info} />;
  }

  const icon = findRegimentIcon(regiment.tag);

  if (!icon) {
    return <div className={classes.info} />;
  }

  return (
    <div className={classes.info}>
      <div className="flex justify-center items-center w-full">
        <Image
          src={icon}
          alt={regiment.tag}
          height={150}
          width={150}
          unoptimized
        />
      </div>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ textAlign: "center", marginTop: "15px", marginBottom: "15px" }}
      >
        {regiment.name}
      </Typography>
      {regiment.description.map((line, index) => (
        <Typography
          key={index}
          variant="body1"
          component="div"
          color="text.secondary"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          {line}
        </Typography>
      ))}
    </div>
  );
};

export default RegimentInfo;
