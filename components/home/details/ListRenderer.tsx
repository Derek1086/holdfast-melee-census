import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Player } from "../../../pages/api/playerFetching";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

var NAREGIONS = [
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["American Samoa", "AS"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["Armed Forces Americas", "AA"],
  ["Armed Forces Europe", "AE"],
  ["Armed Forces Pacific", "AP"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District Of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Guam", "GU"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Marshall Islands", "MH"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Northern Mariana Islands", "NP"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Puerto Rico", "PR"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["US Virgin Islands", "VI"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
  ["Alberta", "AB"],
  ["British Columbia", "BC"],
  ["Manitoba", "MB"],
  ["New Brunswick", "NB"],
  ["Newfoundland", "NF"],
  ["Northwest Territory", "NT"],
  ["Nova Scotia", "NS"],
  ["Nunavut", "NU"],
  ["Ontario", "ON"],
  ["Prince Edward Island", "PE"],
  ["Quebec", "QC"],
  ["Saskatchewan", "SK"],
  ["Yukon", "YT"],
  ["Newfoundland and Labrador", "NL"],
];

var EUREGIONS = [
  ["Albania", "AL"],
  ["Kazakhstan", "KZ"],
  ["Andorra", "AD"],
  ["Aland Islands", "AX"],
  ["Armenia", "AM"],
  ["Azerbaijan", "AZ"],
  ["Austria", "AT"],
  ["Belgium", "BE"],
  ["Bulgaria", "BG"],
  ["Bosnia and Herzegovina", "BA"],
  ["Belarus", "BY"],
  ["Switzerland", "CH"],
  ["Czech Republic", "CZ"],
  ["Germany", "DE"],
  ["Denmark", "DK"],
  ["Estonia", "EE"],
  ["Finland", "FI"],
  ["Faroe Islands", "FO"],
  ["United Kingdom", "GB"],
  ["Georgia", "GE"],
  ["Guernsey", "GG"],
  ["Greece", "GR"],
  ["Croatia", "HR"],
  ["Hungary", "HU"],
  ["Isle of Man", "IM"],
  ["Ireland", "IE"],
  ["Iceland", "IS"],
  ["Italy", "IT"],
  ["Jersey", "JE"],
  ["Monaco", "MC"],
  ["Liechtenstein", "LI"],
  ["Lithuania", "LT"],
  ["Luxembourg", "LU"],
  ["Latvia", "LV"],
  ["Moldova", "MD"],
  ["Macedonia", "MK"],
  ["Malta", "MT"],
  ["Svalbard and Jan Mayen", "SJ"],
  ["Montenegro", "ME"],
  ["Norway", "NO"],
  ["Poland", "PL"],
  ["Portugal", "PT"],
  ["Romania", "RO"],
  ["Serbia", "RS"],
  ["Slovakia", "SK"],
  ["Slovenia", "SI"],
  ["Sweden", "SE"],
  ["Turkey", "TR"],
  ["Ukraine", "UA"],
  ["Kosovo", "KV"],
  ["Netherlands", "NL"],
  ["Spain", "ES"],
  ["France", "FR"],
  ["Portugal", "PT"],
  ["Gibraltar", "GI"],
  ["Russia", "RU"],
  ["Cyprus", "CY"],
  ["Vatican City", "VA"],
  ["San Marino", "SM"],
  ["Algeria", "DZ"],
];

interface ListRendererProps {
  region: string;
  location: string;
  searchedPlayers: Player[] | null;
  playersInLocation: Player[] | null;
}

const ListRenderer: React.FC<ListRendererProps> = ({
  region,
  location,
  searchedPlayers,
  playersInLocation,
}) => {
  var regions = region === "NA" ? NAREGIONS : EUREGIONS;
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  const convertRegion = (input: string, to: string) => {
    if (!input || !to) {
      return "Invalid input or conversion type";
    }

    if (to === "TO_ABBREVIATED") {
      input = input.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      const matchingRegion = regions.find((region) => region[0] === input);

      if (matchingRegion) {
        return matchingRegion[1];
      } else {
        return "Unknown region";
      }
    } else if (to === "TO_NAME") {
      input = input.toUpperCase();
      const matchingRegion = regions.find((region) => region[1] === input);

      if (matchingRegion) {
        return matchingRegion[0];
      } else {
        return "Unknown region";
      }
    }

    return "Invalid conversion type";
  };

  const getAverageRating = () => {
    if (!sortedPlayers || sortedPlayers.length === 0) {
      return 0;
    }
    const validRatings = sortedPlayers
      .filter((player) => player.rating !== "")
      .map((player) => parseFloat(player.rating));

    if (validRatings.length === 0) {
      return 0;
    }

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / validRatings.length;

    return Number(averageRating.toFixed(2));
  };

  useEffect(() => {
    if (searchedPlayers && location === "") {
      setSortedPlayers(searchedPlayers);
    } else if (playersInLocation && location !== "") {
      setSortedPlayers(playersInLocation);
    }
  }, [playersInLocation, searchedPlayers, location]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "200px" }}
        onClick={() => {
          router.push("/regiments");
        }}
      >
        View Regiments
      </Button>
      <Card
        style={{
          width: "100%",
          height: "500px",
          padding: "15px",
          marginTop: "18px",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ textAlign: "center", marginBottom: "15px" }}
        >
          {location === ""
            ? "Choose Location"
            : `${location} - ${convertRegion(location, "TO_NAME")}`}
        </Typography>
        <Divider />
        {searchedPlayers ? (
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{ textAlign: "center", marginTop: "15px" }}
          >
            Players - {sortedPlayers?.length}
            <br />
            Average Impact Rating: {getAverageRating()}
          </Typography>
        ) : (
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{ textAlign: "center" }}
          >
            Players - 0<br />
            Average Impact Rating: 0
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default ListRenderer;
