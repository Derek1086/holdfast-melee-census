import { GetServerSideProps } from "next";
import { fetchPlayersData, RegionData } from "./api/playerFetching";
import PlayersLoader from "../components/loaders/PlayersLoader";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type PlayersProps = {
  players: RegionData[];
};

const Players: React.FC<PlayersProps> = ({ players }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [players]);

  // Filter players by region
  const naPlayers = players.find((region) => region.Region === "NA");
  const euPlayers = players.find((region) => region.Region === "EU");

  return (
    <div style={{ color: "white", padding: "20px" }}>
      {loading ? (
        <PlayersLoader />
      ) : (
        <>
          {/* NA Players Table */}
          {naPlayers && (
            <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
              <h1 style={{ padding: "15px" }}>NA Players</h1>
              <Table sx={{ minWidth: 650 }} aria-label="NA players table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Regiment</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Rating</TableCell>
                    <TableCell align="left">Bio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {naPlayers.players.map((player) => (
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
          )}

          {/* EU Players Table */}
          {euPlayers && (
            <TableContainer component={Paper}>
              <h1 style={{ padding: "15px" }}>EU Players</h1>
              <Table sx={{ minWidth: 650 }} aria-label="EU players table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Regiment</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">Country</TableCell>
                    <TableCell align="left">Rating</TableCell>
                    <TableCell align="left">Bio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {euPlayers.players.map((player) => (
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
          )}
        </>
      )}
    </div>
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
