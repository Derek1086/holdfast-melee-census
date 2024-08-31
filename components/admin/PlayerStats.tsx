import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PlayerItem from "../../components/home/details/player/PlayerItem";
import Divider from "@mui/material/Divider";
import { Player } from "../../pages/api/playerFetching";
import { getFullName } from "../../pages/admin";

interface PlayerStatsProps {
  naPlayers: Player[] | null;
  euPlayers: Player[] | null;
  overallRatings: {
    averageRating: string;
    bestPlayer: Player;
    worstPlayer: Player;
  };
  naRatings: {
    averageRating: string;
    bestPlayer: Player;
    worstPlayer: Player;
  };
  euRatings: {
    averageRating: string;
    bestPlayer: Player;
    worstPlayer: Player;
  };
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  naStateRatings: {
    highestAvgState: string;
    highestAvg: number;
    lowestAvgState: string;
    lowestAvg: number;
  };
  euStateRatings: {
    highestAvgState: string;
    highestAvg: number;
    lowestAvgState: string;
    lowestAvg: number;
  };
  naMostPlayersState: {
    mostPlayersState: string;
    maxCount: number;
  };
  euMostPlayersState: {
    mostPlayersState: string;
    maxCount: number;
  };
  naMostPlayersStateFullName: string | undefined;
  euMostPlayersStateFullName: string | undefined;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({
  naPlayers,
  euPlayers,
  overallRatings,
  naRatings,
  euRatings,
  setViewingPlayer,
  naStateRatings,
  euStateRatings,
  naMostPlayersState,
  euMostPlayersState,
  naMostPlayersStateFullName,
  euMostPlayersStateFullName,
}) => {
  if (!naPlayers || !euPlayers) {
    return <></>;
  }

  return (
    <div className="w-full md:w-1/2 md:mt-0 mt-4">
      <Card
        sx={{
          width: "100%",
          height: "100%",
          padding: "15px",
        }}
      >
        <div className="w-full mb-2">
          <Typography
            variant="h6"
            noWrap
            component="div"
            textAlign={"center"}
            color={"secondary"}
          >
            Total Players: {naPlayers.length + euPlayers.length}
          </Typography>
          <div className="h-full w-full block md:flex mt-2">
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Average Impact
              </Typography>
              <div className="md:mt-6 mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {overallRatings.averageRating}
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Best Player
              </Typography>
              <div className="mt-2" />
              <PlayerItem
                player={overallRatings.bestPlayer}
                setViewingPlayer={setViewingPlayer}
              />
            </div>
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Worst Player
              </Typography>
              <div className="mt-2" />
              <PlayerItem
                player={overallRatings.worstPlayer}
                setViewingPlayer={setViewingPlayer}
              />
            </div>
          </div>
        </div>
        <Divider />
        {/* NA REGION */}
        <div className="w-full mt-4 mb-2">
          <Typography
            variant="h6"
            noWrap
            component="div"
            textAlign={"center"}
            color={"secondary"}
          >
            NA Players: {naPlayers.length}
          </Typography>
          <div className="h-full w-full block md:flex mt-2">
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Average Impact
              </Typography>
              <div className="md:mt-6 mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {naRatings.averageRating}
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Best Player
              </Typography>
              <div className="mt-2" />
              <PlayerItem
                player={naRatings.bestPlayer}
                setViewingPlayer={setViewingPlayer}
              />
            </div>
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Worst Player
              </Typography>
              <div className="mt-2" />
              <PlayerItem
                player={naRatings.worstPlayer}
                setViewingPlayer={setViewingPlayer}
              />
            </div>
          </div>
          <div className="h-full w-full block md:flex mt-2">
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Best State
              </Typography>
              <div className="mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {getFullName(naStateRatings.highestAvgState, "NA")} (
                {naStateRatings.highestAvg.toFixed(2)})
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Worst State
              </Typography>
              <div className="mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {getFullName(naStateRatings.lowestAvgState, "NA")} (
                {naStateRatings.lowestAvg.toFixed(2)})
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Most Popular State
              </Typography>
              <div className="mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {naMostPlayersStateFullName} ({naMostPlayersState.maxCount})
              </Typography>
            </div>
          </div>
        </div>
        <Divider />
        {/* EU REGION */}
        <div className="w-full mt-4 mb-2">
          <Typography
            variant="h6"
            noWrap
            component="div"
            textAlign={"center"}
            color={"secondary"}
          >
            EU Players: {euPlayers.length}
          </Typography>
          <div className="h-full w-full block md:flex mt-2">
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Average Impact
              </Typography>
              <div className="md:mt-6 mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {euRatings.averageRating}
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Best Player
              </Typography>
              <div className="mt-2" />
              <PlayerItem
                player={euRatings.bestPlayer}
                setViewingPlayer={setViewingPlayer}
              />
            </div>
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Worst Player
              </Typography>
              <div className="mt-2" />
              <PlayerItem
                player={euRatings.worstPlayer}
                setViewingPlayer={setViewingPlayer}
              />
            </div>
          </div>
          <div className="h-full w-full block md:flex mt-2">
            <div className="md:w-1/3 w-full">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Best Country
              </Typography>
              <div className="mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {getFullName(euStateRatings.highestAvgState, "EU")} (
                {euStateRatings.highestAvg.toFixed(2)})
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Worst Country
              </Typography>
              <div className="mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {getFullName(euStateRatings.lowestAvgState, "EU")} (
                {euStateRatings.lowestAvg.toFixed(2)})
              </Typography>
            </div>
            <div className="md:w-1/3 w-full md:mt-0 mt-2">
              <Typography
                variant="body1"
                noWrap
                component="div"
                textAlign={"center"}
                color={"text.secondary"}
              >
                Most Popular Country
              </Typography>
              <div className="mt-2" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign={"center"}
              >
                {euMostPlayersStateFullName} ({euMostPlayersState.maxCount})
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerStats;
