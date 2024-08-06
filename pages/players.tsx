import { GetServerSideProps } from "next";
import { fetchPlayersData, RegionData } from "./api/playerFetching";
import PlayersLoader from "../components/loaders/PlayersLoader";
import { useState, useEffect } from "react";
import ToolBar from "../components/ToolBar";
import Head from "next/head";
import PlayerTable from "../components/players/PlayerTable";

type PlayersProps = {
  players: RegionData[];
};

const Players: React.FC<PlayersProps> = ({ players }) => {
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<string>("NA");

  const updateRegionHandler = () => {
    setRegion((prevRegion) => (prevRegion === "NA" ? "EU" : "NA"));
  };

  useEffect(() => {
    setLoading(false);
  }, [players]);

  // Filter players by region
  const naPlayers = players.find((region) => region.Region === "NA");
  const euPlayers = players.find((region) => region.Region === "EU");

  return (
    <>
      <Head>
        <title>Holdfast Players</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToolBar region={region} updateRegionHandler={updateRegionHandler} />
      <div style={{ color: "white", padding: "20px", marginTop: "70px" }}>
        {loading ? (
          <PlayersLoader />
        ) : (
          <>
            {naPlayers && euPlayers && (
              <PlayerTable regionalPlayers={players} region={region} />
            )}
          </>
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

export default Players;
