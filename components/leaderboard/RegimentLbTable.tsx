import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RegimentIcon from "../regiments/RegimentIcon";
import { useState, useEffect } from "react";
import { LBPlayer } from "../../pages/leaderboards";
import { HOLDFASTREGIMENTS } from "../regiments/RegimentRegistry";
import { Regiment } from "../../pages/regiments";

type LBRegiment = {
  name: string;
  tag: string;
  count: number;
  region: string;
  averageImpact: number;
};

interface RegimentLbTableProps {
  combinedPlayers: LBPlayer[];
}

const RegimentLbTable: React.FC<RegimentLbTableProps> = ({
  combinedPlayers,
}) => {
  const [sortedRegiments, setSortedRegiments] = useState<LBRegiment[]>([]);

  useEffect(() => {
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
        if (player.rating !== "" && Number(player.rating) > 0) {
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
        Regiment Leaderboard
      </Typography>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "70vh", overflowY: "auto", marginBottom: "20px" }}
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
                Name
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
              <TableCell
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1e1e1e",
                  zIndex: 1,
                  color: "white",
                }}
              >
                Region
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRegiments.map((regiment, index) => (
              <TableRow key={regiment.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <RegimentIcon
                    regiment={regiment.tag}
                    height={50}
                    width={50}
                  />
                  {regiment.name}
                </TableCell>
                <TableCell align="left">
                  {regiment.averageImpact.toFixed(2)}
                </TableCell>
                <TableCell>{regiment.count}</TableCell>
                <TableCell>{regiment.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RegimentLbTable;
