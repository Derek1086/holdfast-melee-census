import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LocationRenderer from "./location/LocationRenderer";
import PlayerList from "./player/PlayerList";
import { useRouter } from "next/router";
import { Player } from "../../../pages/api/playerFetching";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

interface ListRendererProps {
  region: string;
  location: string;
  searchedPlayers: Player[] | null;
  playersInLocation: Player[] | null;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const ListRenderer: React.FC<ListRendererProps> = ({
  region,
  location,
  searchedPlayers,
  playersInLocation,
  setViewingPlayer,
}) => {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

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
      <div className="w-full flex gap-4">
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "50%" }}
          onClick={() => {
            router.push("/regiments");
          }}
        >
          Regiments
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "50%" }}
          onClick={() => {
            router.push("/players");
          }}
        >
          Players
        </Button>
      </div>
      <Card
        style={{
          width: "100%",
          height: "500px",
          padding: "15px",
          marginTop: "18px",
        }}
      >
        <LocationRenderer region={region} location={location} />
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
        <PlayerList
          players={sortedPlayers}
          setViewingPlayer={setViewingPlayer}
        />
      </Card>
    </div>
  );
};

export default ListRenderer;
