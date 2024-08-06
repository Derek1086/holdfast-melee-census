import Avatar from "@mui/material/Avatar";
import Image from "next/image";

import _2bir from "../../regimentIcons/2bir.png";
import _2pir from "../../regimentIcons/2pir.png";
import _3dwi from "../../regimentIcons/3dwi.png";
import _3eme from "../../regimentIcons/3eme.png";
import _7fub from "../../regimentIcons/7fub.png";
import _15pp from "../../regimentIcons/15pp.png";
import _25ri from "../../regimentIcons/25ri.png";
import _26th from "../../regimentIcons/26th.png";
import _33rd from "../../regimentIcons/33rd.png";
import _45e from "../../regimentIcons/45e.png";
import _45th from "../../regimentIcons/45th.png";
import _51st from "../../regimentIcons/51st.png";
import _63e from "../../regimentIcons/63e.png";
import _77th from "../../regimentIcons/77th.png";
import _87rre from "../../regimentIcons/87rre.png";
import _88th from "../../regimentIcons/88th.png";
import altpr from "../../regimentIcons/altpr.png";
import eb from "../../regimentIcons/eb.png";
import ir21 from "../../regimentIcons/ir21.png";
import kra from "../../regimentIcons/kra.png";
import maniaki from "../../regimentIcons/maniaki.png";
import no16 from "../../regimentIcons/no16.png";
import qrr from "../../regimentIcons/qrr.png";
import sbat from "../../regimentIcons/sbat.png";
import space from "../../regimentIcons/space.png";
import trr from "../../regimentIcons/trr.png";
import trrb from "../../regimentIcons/trrb.png";

interface RegimentIconProps {
  regiment: string;
  height: number;
  width: number;
}

export const findRegimentIcon = (regiment: string) => {
  switch (regiment) {
    case "2.BIR":
      return _2bir;
    case "2.PIR":
      return _2pir;
    case "3. Dywizja":
      return _3dwi;
    case "3eme":
      return _3eme;
    case "7.Fuß":
      return _7fub;
    case "15pp":
      return _15pp;
    case "25RI":
      return _25ri;
    case "26th":
      return _26th;
    case "33rd":
      return _33rd;
    case "45e":
      return _45e;
    case "45th":
      return _45th;
    case "51st":
      return _51st;
    case "63e":
      return _63e;
    case "77th":
      return _77th;
    case "87RRE":
      return _87rre;
    case "88th":
      return _88th;
    case "Altpr_IR11":
      return altpr;
    case "E|B":
      return eb;
    case "IR21":
      return ir21;
    case "KRA":
      return kra;
    case "MANIAKI":
      return maniaki;
    case "No. 16":
      return no16;
    case "QRR":
      return qrr;
    case "S-Bat":
      return sbat;
    case "SPACE":
      return space;
    case "TRR":
      return trr;
    case "TRRB":
      return trrb;
    default:
      return null;
  }
};

const RegimentIcon: React.FC<RegimentIconProps> = ({
  regiment,
  height,
  width,
}) => {
  const regimentIcon = findRegimentIcon(regiment);
  if (!regimentIcon) {
    return <></>;
  }

  return (
    <Avatar sx={{ background: "transparent" }}>
      <Image
        src={regimentIcon}
        alt={regiment}
        height={height}
        width={width}
        unoptimized
      />
    </Avatar>
  );
};

export default RegimentIcon;
