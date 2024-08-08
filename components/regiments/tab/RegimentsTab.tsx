import Card from "@mui/material/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";
import RegimentList from "./RegimentList";
import { Regiment } from "../../../pages/regiments";
import SearchFilter from "../SearchFilter";
import { NAREGIMENTS, EUREGIMENTS } from "../RegimentRegistry";

import classes from "../Regiments.module.css";

interface RegimentsTabProps {
  region: string;
  setRegiment: (regiment: Regiment) => void;
}

const RegimentsTab: React.FC<RegimentsTabProps> = ({ region, setRegiment }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRegiments, setFilteredRegiments] = useState<Regiment[]>([]);

  const regiments = region === "NA" ? NAREGIMENTS : EUREGIMENTS;

  useEffect(() => {
    setSearchQuery("");
  }, [region]);

  useEffect(() => {
    const filtered = regiments.filter(
      (regiment) =>
        regiment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        regiment.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRegiments(filtered);
  }, [searchQuery, region]);

  return (
    <div className={classes.regiments}>
      <Card
        onClick={() => setExpanded(!expanded)}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          cursor: "pointer",
        }}
      >
        <h1>Regiments</h1>
        <ArrowDropDownIcon
          style={{
            transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </Card>
      {expanded && (
        <>
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <RegimentList
            regiments={filteredRegiments}
            setRegiment={setRegiment}
          />
        </>
      )}
    </div>
  );
};

export default RegimentsTab;
