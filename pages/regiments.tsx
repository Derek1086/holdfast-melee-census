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
      <div style={{ padding: "20px", marginTop: "70px" }}>
        <h1 style={{ fontSize: "30px", paddingBottom: "15px" }}>
          {region} Regiment Registry
        </h1>
      </div>
    </>
  );
};

export default Regiments;
