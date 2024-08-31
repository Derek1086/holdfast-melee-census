import { GetServerSideProps } from "next";
import { fetchPlayersData, RegionData } from "../api/playerFetching";
import { useState, useEffect } from "react";
import { Player } from "../api/playerFetching";
import FlagIcon from "@mui/icons-material/Flag";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Button from "@mui/material/Button";
import MapIcon from "@mui/icons-material/Map";
import Head from "next/head";
import PlayerLbTable from "../../components/leaderboard/PlayerLbTable";

interface PlayersProps {
  players: RegionData[];
}

interface PlayerWithRegion extends Player {
  region: string;
}

const Leaderboards: React.FC<PlayersProps> = ({ players }) => {
  const [sortedPlayers, setSortedPlayers] = useState<PlayerWithRegion[]>([]);
  const [view, setView] = useState<string>("Players");

  useEffect(() => {
    const naRegion = players.find((regionData) => regionData.Region === "NA");
    const euRegion = players.find((regionData) => regionData.Region === "EU");

    const naPlayers = naRegion
      ? naRegion.players.map((player) => ({ ...player, region: "NA" }))
      : [];
    const euPlayers = euRegion
      ? euRegion.players.map((player) => ({ ...player, region: "EU" }))
      : [];

    const combinedPlayers = [...naPlayers, ...euPlayers];

    const sorted = combinedPlayers
      .map((player) => ({
        ...player,
        rating: player.rating === "" ? "0" : player.rating,
      }))
      .filter((player) => Number(player.rating) > 0)
      .sort((a, b) => Number(b.rating) - Number(a.rating));

    setSortedPlayers(sorted);
  }, [players]);

  return (
    <>
      <Head>
        <title>Holdfast Leaderboards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ color: "white", padding: "20px" }}>
        {/* Button Navigation */}
        <div className="w-full flex gap-2 mb-4">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PeopleAltIcon />}
            className="w-1/3"
            fullWidth
            onClick={() => setView("Players")}
          >
            Players
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FlagIcon />}
            className="w-1/3"
            fullWidth
            onClick={() => setView("Regiments")}
          >
            Regiments
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MapIcon />}
            className="w-1/3"
            fullWidth
            onClick={() => setView("World")}
          >
            World
          </Button>
        </div>
        {view === "Players" && <PlayerLbTable sortedPlayers={sortedPlayers} />}
      </div>
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

export default Leaderboards;
