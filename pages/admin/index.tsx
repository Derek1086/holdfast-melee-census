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
import PlayerStats from "../../components/admin/PlayerStats";
import PlayerBio from "../../components/home/details/player/PlayerBio";
import AdminLogin from "../../components/admin/AdminLogin";
import {
  NAREGIONS,
  EUREGIONS,
} from "../../components/home/details/location/LocationRenderer";

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

export function getFullName(
  abbreviation: string,
  region: string
): string | undefined {
  const regions = region === "EU" ? EUREGIONS : NAREGIONS;
  const title = regions.find(([fullName, abbr]) => abbr === abbreviation);
  return title ? title[0] : undefined;
}

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
          {/* Player List */}
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
          {/* Player Stats */}
          <PlayerStats
            naPlayers={naPlayers}
            euPlayers={euPlayers}
            setViewingPlayer={setViewingPlayer}
          />
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
