import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PlayerItem from "../../components/home/details/player/PlayerItem";
import Divider from "@mui/material/Divider";
import { Player } from "../../pages/api/playerFetching";
import { getFullName } from "../../pages/admin";

interface PlayerStatsProps {
  naPlayers: Player[] | null;
  euPlayers: Player[] | null;
  setViewingPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({
  naPlayers,
  euPlayers,
  setViewingPlayer,
}) => {
  if (!naPlayers || !euPlayers) {
    return <></>;
  }

  const calculateRatings = (players: Player[]) => {
    const ratedPlayers = players.filter(
      (player) => player.rating && Number(player.rating) > 0
    );

    const totalRating = ratedPlayers.reduce(
      (sum, player) => sum + Number(player.rating),
      0
    );

    const averageRating =
      ratedPlayers.length > 0
        ? (totalRating / ratedPlayers.length).toFixed(2)
        : "0.00";

    const bestPlayer = ratedPlayers.reduce((best, player) => {
      return Number(player.rating) > Number(best.rating) ? player : best;
    }, ratedPlayers[0]);

    const worstPlayer = ratedPlayers.reduce((worst, player) => {
      return Number(player.rating) < Number(worst.rating) ? player : worst;
    }, ratedPlayers[0]);

    return { averageRating, bestPlayer, worstPlayer };
  };

  const naRatings = calculateRatings(naPlayers);
  const euRatings = calculateRatings(euPlayers);
  const overallRatings = calculateRatings([...naPlayers, ...euPlayers]);

  const calculateStateRatings = (players: Player[]) => {
    const stateRatings: { [state: string]: { total: number; count: number } } =
      {};

    players.forEach((player) => {
      if (player.rating && Number(player.rating) > 0) {
        if (!stateRatings[player.state]) {
          stateRatings[player.state] = { total: 0, count: 0 };
        }
        stateRatings[player.state].total += Number(player.rating);
        stateRatings[player.state].count += 1;
      }
    });

    let highestAvgState = "";
    let lowestAvgState = "";
    let highestAvg = 0;
    let lowestAvg = Infinity;

    Object.keys(stateRatings).forEach((state) => {
      const avg = stateRatings[state].total / stateRatings[state].count;
      if (avg > highestAvg) {
        highestAvg = avg;
        highestAvgState = state;
      }
      if (avg < lowestAvg) {
        lowestAvg = avg;
        lowestAvgState = state;
      }
    });

    return { highestAvgState, highestAvg, lowestAvgState, lowestAvg };
  };

  const naStateRatings = calculateStateRatings(naPlayers);
  const euStateRatings = calculateStateRatings(euPlayers);
  // const overallStateRatings = calculateStateRatings([
  //   ...naPlayers,
  //   ...euPlayers,
  // ]);

  const calculateMostPlayersState = (players: Player[]) => {
    const stateCounts: { [state: string]: number } = {};

    players.forEach((player) => {
      if (player.state) {
        if (!stateCounts[player.state]) {
          stateCounts[player.state] = 0;
        }
        stateCounts[player.state] += 1;
      }
    });

    let mostPlayersState = "";
    let maxCount = 0;

    Object.keys(stateCounts).forEach((state) => {
      if (stateCounts[state] > maxCount) {
        maxCount = stateCounts[state];
        mostPlayersState = state;
      }
    });

    return { mostPlayersState, maxCount };
  };

  const naMostPlayersState = calculateMostPlayersState(naPlayers);
  const euMostPlayersState = calculateMostPlayersState(euPlayers);
  const naMostPlayersStateFullName = getFullName(
    naMostPlayersState.mostPlayersState,
    "NA"
  );
  const euMostPlayersStateFullName = getFullName(
    euMostPlayersState.mostPlayersState,
    "EU"
  );

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
        <div className="w-full mt-4 mb-4">
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
        <div className="w-full mt-4">
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
