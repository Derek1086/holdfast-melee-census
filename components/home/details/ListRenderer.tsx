"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LocationRenderer from "./location/LocationRenderer";
import PlayerList from "./player/PlayerList";
import { useRouter } from "next/router";
import { Player } from "../../../pages/api/playerFetching";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FlagIcon from "@mui/icons-material/Flag";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Button from "@mui/material/Button";

export const getAverageRating = (sortedPlayers: Player[]) => {
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
  const router = useRouter();

  useEffect(() => {
    if (searchedPlayers && location === "") {
      const sortedSearchResults = searchedPlayers.sort(
        (a: Player, b: Player) => {
          const ratingA = a.rating ? Number(a.rating) : 0;
          const ratingB = b.rating ? Number(b.rating) : 0;
          return ratingB - ratingA;
        }
      );
      setSortedPlayers(sortedSearchResults);
    } else if (playersInLocation && location !== "") {
      setSortedPlayers(playersInLocation);
    }
  }, [playersInLocation, searchedPlayers, location]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Page Navigation */}
      <div className="w-full flex gap-2">
        <div className="w-1/3 flex justify-center">
          <div className="hidden sm:block w-full">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                router.push("/regiments");
              }}
              startIcon={<FlagIcon />}
              fullWidth
            >
              Regiments
            </Button>
          </div>
          <div className="block sm:hidden">
            <IconButton
              color="secondary"
              size="large"
              onClick={() => {
                router.push("/regiments");
              }}
            >
              <FlagIcon />
            </IconButton>
          </div>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="hidden sm:block w-full">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                router.push("/players");
              }}
              startIcon={<PeopleAltIcon />}
              fullWidth
            >
              Players
            </Button>
          </div>
          <div className="block sm:hidden">
            <IconButton
              color="secondary"
              size="large"
              onClick={() => {
                router.push("/players");
              }}
            >
              <PeopleAltIcon />
            </IconButton>
          </div>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="hidden sm:block w-full">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                router.push("/leaderboards");
              }}
              startIcon={<LeaderboardIcon />}
              fullWidth
            >
              Leaderboards
            </Button>
          </div>
          <div className="block sm:hidden">
            <IconButton
              color="secondary"
              size="large"
              onClick={() => {
                router.push("/leaderboards");
              }}
            >
              <LeaderboardIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Player List */}
      <Card
        style={{
          width: "100%",
          height: "75vh",
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
            Average Impact Rating: {getAverageRating(sortedPlayers)}
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
