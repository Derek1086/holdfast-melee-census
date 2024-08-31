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
import { HOLDFASTREGIMENTS } from "../../components/regiments/RegimentRegistry";
import { Regiment } from "../regiments";

interface PlayersProps {
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

export type LBRegiment = {
  name: string;
  tag: string;
  count: number;
  region: string;
  averageImpact: number;
};

const Leaderboards: React.FC<PlayersProps> = ({ players }) => {
  const [sortedPlayers, setSortedPlayers] = useState<LBPlayer[]>([]);
  const [sortedRegiments, setSortedRegiments] = useState<LBRegiment[]>([]);
  const [view, setView] = useState<string>("Players");

  useEffect(() => {
    // PLAYERS
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

    // REGIMENTS
    const regimentStats: {
      [key: string]: { count: number; totalRating: number };
    } = HOLDFASTREGIMENTS.reduce((acc: any, regiment: Regiment) => {
      acc[regiment.tag] = { count: 0, totalRating: 0 };
      return acc;
    }, {});

    combinedPlayers.forEach((player) => {
      const regiment = regimentStats[player.regiment];
      if (regiment) {
        regiment.count += 1;
        if (player.rating !== "") {
          regiment.totalRating += Number(player.rating);
        }
      }
    });

    const sortedRegiments = HOLDFASTREGIMENTS.map((regiment: Regiment) => {
      const stats = regimentStats[regiment.tag] || { count: 0, totalRating: 0 };
      const averageImpact =
        stats.count > 0 ? stats.totalRating / stats.count : 0;
      return {
        name: regiment.name,
        tag: regiment.tag,
        count: stats.count,
        region: regiment.region,
        averageImpact,
      };
    }).sort((a, b) => b.averageImpact - a.averageImpact);

    setSortedRegiments(sortedRegiments);
    console.log(sortedRegiments);
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
        {view === "Regiments" && (
          <RegimentLbTable sortedRegiments={sortedRegiments} />
        )}
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
