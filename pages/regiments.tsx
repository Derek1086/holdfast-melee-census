import ToolBar from "../components/ToolBar";
import { useState, useEffect } from "react";

const Regiments = () => {
  const [region, setRegion] = useState<string>("NA");

  const updateRegionHandler = () => {
    setRegion((prevRegion) => (prevRegion === "NA" ? "EU" : "NA"));
  };

  return (
    <>
      <ToolBar region={region} updateRegionHandler={updateRegionHandler} />
    </>
  );
};

export default Regiments;
