import { GetServerSideProps } from "next";
import { fetchPlayersData, RegionData } from "../api/playerFetching";
import { useState, useEffect } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Button from "@mui/material/Button";
import MapIcon from "@mui/icons-material/Map";
import Head from "next/head";
import PlayerLbTable from "../../components/leaderboard/PlayerLbTable";
import RegimentLbTable from "../../components/leaderboard/RegimentLbTable";
import WorldLbTable from "../../components/leaderboard/WorldLbTable";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";

interface LeaderboardProps {
  players: RegionData[];
}

export type LBPlayer = {
  bio: string;
  city: string;
  id: string;
  name: string;
  rating: string;
  regiment: string;
  region: string;
  state: string;
};

const Leaderboards: React.FC<LeaderboardProps> = ({ players }) => {
  const [view, setView] = useState<string>("Players");
  const [combinedPlayers, setCombinedPlayers] = useState<LBPlayer[]>([]);

  const router = useRouter();

  useEffect(() => {
    const naRegion = players.find((regionData) => regionData.Region === "NA");
    const euRegion = players.find((regionData) => regionData.Region === "EU");

    const naPlayers = naRegion
      ? naRegion.players.map((player) => ({ ...player, region: "NA" }))
      : [];
    const euPlayers = euRegion
      ? euRegion.players.map((player) => ({ ...player, region: "EU" }))
      : [];

    setCombinedPlayers([...naPlayers, ...euPlayers]);
  }, [players]);

  return (
    <>
      <Head>
        <title>Holdfast Leaderboards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ color: "white", padding: "20px" }}>
        {/* Button Navigation */}
        <div className="w-full md:flex block gap-2 mb-4">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/")}
            className="md:w-[120px] w-full md:0 mb-2"
            tabIndex={-1}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PeopleAltIcon />}
            className="md:w-1/3 w-full md:0 mb-2"
            onClick={() => setView("Players")}
          >
            Players
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FlagIcon />}
            className="md:w-1/3 w-full md:0 mb-2"
            fullWidth
            onClick={() => setView("Regiments")}
          >
            Regiments
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MapIcon />}
            className="md:w-1/3 w-full md:0 mb-2"
            fullWidth
            onClick={() => setView("World")}
          >
            World
          </Button>
        </div>
        {/* Leaderboards */}
        {view === "Players" && (
          <PlayerLbTable combinedPlayers={combinedPlayers} />
        )}
        {view === "Regiments" && (
          <RegimentLbTable combinedPlayers={combinedPlayers} />
        )}
        {view === "World" && <WorldLbTable combinedPlayers={combinedPlayers} />}
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
