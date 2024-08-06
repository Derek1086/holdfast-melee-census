import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RegionData } from "../../pages/api/playerFetching";

type PlayerTableProps = {
  regionalPlayers: RegionData[];
  region: string;
};

const PlayerTable: React.FC<PlayerTableProps> = ({
  regionalPlayers,
  region,
}) => {
  // Filter players by region
  const playersData = regionalPlayers.find((data) => data.Region === region);

  if (!playersData) {
    return null;
  }

  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      <h1 style={{ padding: "15px" }}>{region} Players</h1>
      <Table sx={{ minWidth: 650 }} aria-label={`${region} players table`}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Regiment</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">
              {region === "NA" ? "State" : "Country"}
            </TableCell>
            <TableCell align="left">Impact</TableCell>
            <TableCell align="left">Bio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playersData.players.map((player) => (
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
  );
};

export default PlayerTable;
