import ToolBar from "../components/ToolBar";
import { useState, useEffect } from "react";
import Head from "next/head";

const Regiments = () => {
  const [region, setRegion] = useState<string>("NA");

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
    </>
  );
};

export default Regiments;
