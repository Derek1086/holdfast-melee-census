import ToolBar from "../components/ToolBar";
import { GetServerSideProps } from "next";
import { fetchPlayersData, RegionData } from "./api/playerFetching";
import { useState } from "react";
import Head from "next/head";
import RegimentsTab from "../components/regiments/tab/RegimentsTab";
import RegimentInfo from "../components/regiments/info/RegimentInfo";
import RegimentMembersTab from "../components/regiments/members/RegimentMembersTab";

import classes from "../components/regiments/Regiments.module.css";

export type Regiment = {
  name: string;
  tag: string;
  description: string[];
};

interface PlayersProps {
  players: RegionData[];
}

const Regiments: React.FC<PlayersProps> = ({ players }) => {
  const [region, setRegion] = useState<string>("NA");
  const [regiment, setRegiment] = useState<Regiment | null>(null);

  const updateRegionHandler = () => {
    setRegion((prevRegion) => (prevRegion === "NA" ? "EU" : "NA"));
  };

  return (
    <>
      <Head>
        <title>Holdfast Regiments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToolBar region={region} updateRegionHandler={updateRegionHandler} />
      <div style={{ padding: "20px", marginTop: "70px" }}>
        <h1 style={{ fontSize: "30px", paddingBottom: "15px" }}>
          {region} Regiment Registry
        </h1>
        <div className={classes.container}>
          <RegimentsTab region={region} setRegiment={setRegiment} />
          <RegimentInfo regiment={regiment} />
          <RegimentMembersTab
            regiment={regiment}
            players={players}
            region={region}
          />
        </div>
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

export default Regiments;
