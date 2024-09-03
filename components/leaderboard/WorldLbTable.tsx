import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LBPlayer } from "../../pages/leaderboards";
import { useState, useEffect } from "react";
import {
  NAREGIONS,
  EUREGIONS,
} from "../home/details/location/LocationRenderer";
import LocationIcon from "../home/details/location/LocationIcon";

type LBWorld = {
  name: string;
  count: number;
  averageImpact: number;
  region: string;
  abb: string;
};

interface WorldLbTableProps {
  combinedPlayers: LBPlayer[];
}

const WorldLbTable: React.FC<WorldLbTableProps> = ({ combinedPlayers }) => {
  const [sortedStates, setSortedStates] = useState<LBWorld[]>([]);

  const ALLREGIONS = [...NAREGIONS, ...EUREGIONS];

  useEffect(() => {
    const stateStats: {
      [key: string]: { count: number; totalRating: number };
    } = {};

    combinedPlayers.forEach((player) => {
      const state = player.state;
      if (!stateStats[state]) {
        stateStats[state] = { count: 0, totalRating: 0 };
      }
      stateStats[state].count += 1;
      if (player.rating !== "" && Number(player.rating) > 0) {
        stateStats[state].totalRating += Number(player.rating);
      }
    });

    const sortedStates = Object.keys(stateStats)
      .map((state) => {
        const abb = state;
        const foundRegion = ALLREGIONS.find((region) => region[1] === state);
        const name = foundRegion?.[0] || state;
        const region = foundRegion
          ? NAREGIONS.includes(foundRegion)
            ? "NA"
            : "EU"
          : "NA";
        const stats = stateStats[state];
        const averageImpact =
          stats.count > 0 ? stats.totalRating / stats.count : 0;
        return {
          name,
          count: stats.count,
          averageImpact,
          region,
          abb,
        };
      })
      .filter((state) => state.averageImpact > 0)
      .sort((a, b) => {
        if (a.region !== b.region) {
          return a.region.localeCompare(b.region);
        }
        return b.averageImpact - a.averageImpact;
      });

    setSortedStates(sortedStates);
    console.log(sortedStates);
  }, [combinedPlayers]);

  return (
    <>
      <Typography
        variant="h4"
        noWrap
        component="div"
        textAlign={"center"}
        className="mb-4"
      >
        World Leaderboard
      </Typography>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "72vh", overflowY: "auto", marginBottom: "20px" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1e1e1e",
                  zIndex: 1,
                  color: "white",
                }}
              >
                Rank
              </TableCell>
              <TableCell
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1e1e1e",
                  zIndex: 1,
                  color: "white",
                }}
              >
                State/Country
              </TableCell>
              <TableCell
                align="left"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1e1e1e",
                  zIndex: 1,
                  color: "white",
                }}
              >
                Impact
              </TableCell>
              <TableCell
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1e1e1e",
                  zIndex: 1,
                  color: "white",
                }}
              >
                Members
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStates.map((state, index) => (
              <TableRow key={state.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <LocationIcon region={state.region} location={state.abb} />
                  {state.name}
                </TableCell>
                <TableCell>{state.averageImpact.toFixed(2)}</TableCell>
                <TableCell>{state.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WorldLbTable;
