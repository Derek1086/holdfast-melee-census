import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { RegionData } from "../../pages/api/playerFetching";

type Player = {
  id: number;
  name: string;
  regiment: string;
  city: string;
  state: string;
  rating: number;
  bio: string;
};

type PlayerTableProps = {
  regionalPlayers: RegionData[];
  region: string;
};

type Order = "asc" | "desc";

const PlayerTable: React.FC<PlayerTableProps> = ({
  regionalPlayers,
  region,
}) => {
  // Filter players by region
  const playersData = regionalPlayers.find((data) => data.Region === region);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Player>("name");

  if (!playersData) {
    return null;
  }

  const handleRequestSort = (property: keyof Player) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPlayers = playersData.players.sort((a, b) => {
    const aValue = a[orderBy] as string | number;
    const bValue = b[orderBy] as string | number;

    if (aValue < bValue) {
      return order === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <h1 style={{ fontSize: "30px", paddingBottom: "15px" }}>
        {region} Players
      </h1>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label={`${region} players table`}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "regiment"}
                  direction={orderBy === "regiment" ? order : "asc"}
                  onClick={() => handleRequestSort("regiment")}
                >
                  Regiment
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "city"}
                  direction={orderBy === "city" ? order : "asc"}
                  onClick={() => handleRequestSort("city")}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "state"}
                  direction={orderBy === "state" ? order : "asc"}
                  onClick={() => handleRequestSort("state")}
                >
                  {region === "NA" ? "State" : "Country"}
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "rating"}
                  direction={orderBy === "rating" ? order : "asc"}
                  onClick={() => handleRequestSort("rating")}
                >
                  Impact
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Bio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="left">{player.regiment}</TableCell>
                <TableCell align="left">{player.city}</TableCell>
                <TableCell align="left">{player.state}</TableCell>
                <TableCell align="left">{player.rating}</TableCell>
                <TableCell align="left">{player.bio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayerTable;
