import axios from "axios";
import { GetServerSideProps } from "next";
import { Player, RegionData, fetchPlayersData } from "../api/playerFetching";
import PlayerListAdmin from "../../components/admin/PlayerListAdmin";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Head from "next/head";
import SearchFilter from "../../components/regiments/SearchFilter";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "../../components/admin/UserForm";
import PlayerListLoader from "../../components/loaders/PlayerListLoader";
import PlayerBio from "../../components/home/details/player/PlayerBio";
import AdminLogin from "../../components/admin/AdminLogin";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PlayerItem from "../../components/home/details/player/PlayerItem";
import {
  NAREGIONS,
  EUREGIONS,
} from "../../components/home/details/location/LocationRenderer";
import Divider from "@mui/material/Divider";

interface AdminProps {
  players: RegionData[];
}

export type UpdatedData = {
  name: string;
  regiment: string;
  city: string;
  state: string;
  bio: string;
  rating: string;
};

const Admin: React.FC<AdminProps> = ({ players }) => {
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("NA");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);
  const [sortedPlayersByRating, setSortedPlayersByRating] = useState<Player[]>(
    []
  );
  const [ranking, setRanking] = useState<number>(0);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [naPlayers, setNaPlayers] = useState<Player[]>([]);
  const [euPlayers, setEuPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const naRegion = players.find((regionData) => regionData.Region === "NA");
    const euRegion = players.find((regionData) => regionData.Region === "EU");

    if (naRegion && euRegion) {
      setNaPlayers(naRegion.players);
      setEuPlayers(euRegion.players);
    }
  }, [players]);

  const updateRegionHandler = () => {
    setRegion((prevRegion) => (prevRegion === "NA" ? "EU" : "NA"));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setAuthenticated(true);
    }
    setLoadingAuth(false);
  }, []);

  const regionalPlayers = players.find(
    (regionData) => regionData.Region === region
  );

  useEffect(() => {
    if (viewingPlayer) {
      setRanking(
        sortedPlayersByRating.findIndex(
          (player) => player.id === viewingPlayer.id
        )
      );
    }
  }, [viewingPlayer]);

  useEffect(() => {
    if (regionalPlayers && regionalPlayers.players) {
      const sortedPlayers = [...regionalPlayers.players].sort(
        (a: Player, b: Player) => {
          const ratingA = a.rating ? Number(a.rating) : 0;
          const ratingB = b.rating ? Number(b.rating) : 0;
          return ratingB - ratingA;
        }
      );

      setSortedPlayersByRating(sortedPlayers);

      const searchResults = regionalPlayers.players.filter(
        (player: Player) =>
          player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.regiment.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const sortedSearchResults = searchResults.sort((a: Player, b: Player) => {
        const ratingA = a.rating ? Number(a.rating) : 0;
        const ratingB = b.rating ? Number(b.rating) : 0;
        return ratingB - ratingA;
      });

      setFilteredPlayers(sortedSearchResults);
    }
  }, [players, searchQuery, region]);

  const addPlayer = async (newPlayer: Player, region: string) => {
    setLoading(true);
    region = region + "REGION";
    try {
      const response = await axios.post("/api/player/addPlayer", {
        player: newPlayer,
        region,
      });

      if (response.status === 201) {
        console.log("Player added successfully");
        window.location.reload();
      } else {
        console.log("Failed to add player");
      }
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setLoading(false);
    }
  };

  const editPlayer = async (
    playerId: string,
    updatedData: UpdatedData,
    region: string
  ) => {
    region = region + "REGION";
    try {
      const response = await axios.put("/api/player/editPlayer", {
        playerId,
        updatedData,
        region,
      });

      if (response.status === 200) {
        console.log("Player updated successfully");
        window.location.reload();
      } else {
        console.log("Failed to update player");
      }
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const deletePlayer = async (playerId: string, region: string) => {
    setLoading(true);
    region = region + "REGION";
    try {
      const response = await axios.delete("/api/player/deletePlayer", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          playerId,
          region,
        },
      });

      if (response.status === 200) {
        console.log("Player deleted successfully");
        window.location.reload();
      } else if (response.status === 404) {
        console.log("Player not found");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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

  function getFullName(
    abbreviation: string,
    region: string
  ): string | undefined {
    const regions = region === "EU" ? EUREGIONS : NAREGIONS;
    const title = regions.find(([fullName, abbr]) => abbr === abbreviation);
    return title ? title[0] : undefined;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loadingAuth ? (
        <></>
      ) : !authenticated ? (
        <AdminLogin
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      ) : (
        <div className="p-4 block md:flex gap-4">
          <PlayerBio
            viewingPlayer={viewingPlayer}
            setViewingPlayer={setViewingPlayer}
            region={region}
            ranking={ranking}
          />
          <UserForm
            open={open || editingPlayer !== null}
            setOpen={setOpen}
            addPlayer={addPlayer}
            editPlayer={editPlayer}
            editingPlayer={editingPlayer}
            setEditingPlayer={setEditingPlayer}
            currRegion={region}
          />
          <div className="w-full md:w-1/2">
            <div className="flex gap-4 items-center justify-between mb-4">
              <h1 style={{ fontSize: "25px" }}>{region} Players</h1>
              <Button
                variant="text"
                color="secondary"
                onClick={updateRegionHandler}
                size="large"
              >
                {region}
              </Button>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-1/2">
                <SearchFilter
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
              <div>
                <IconButton
                  aria-label="add"
                  size="large"
                  onClick={() => setOpen(true)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
            {loading ? (
              <PlayerListLoader />
            ) : (
              <PlayerListAdmin
                players={filteredPlayers}
                deletePlayer={deletePlayer}
                region={region}
                setViewingPlayer={setViewingPlayer}
                setEditingPlayer={setEditingPlayer}
                loading={loading}
              />
            )}
          </div>
          <div className="w-full md:w-1/2 md:mt-0 mt-4">
            <Card
              sx={{
                width: "100%",
                height: "100%",
                padding: "15px",
              }}
            >
              <div className="h-1/4 w-full">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  textAlign={"center"}
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
              <div className="h-1/4 w-full mt-4">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  textAlign={"center"}
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
              </div>
              <Divider />
              <div className="h-1/4 w-full mt-4">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  textAlign={"center"}
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
              </div>
              <Divider />
              <div className="h-1/5 w-full flex flex-col md:flex-row md:gap-0 gap-4 mt-4">
                <div className="md:w-1/2 w-full">
                  <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    textAlign={"center"}
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
                <div className="md:w-1/2 w-full">
                  <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    textAlign={"center"}
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
                <div className="md:w-1/2 w-full">
                  <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    textAlign={"center"}
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
                <div className="md:w-1/2 w-full">
                  <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    textAlign={"center"}
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
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const players = await fetchPlayersData();
    return {
      props: { players: JSON.parse(JSON.stringify(players)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { players: [] },
    };
  }
};

export default Admin;
