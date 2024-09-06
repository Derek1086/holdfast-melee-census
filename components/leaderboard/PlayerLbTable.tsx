import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import findIcon from "../home/details/player/PlayerIcon";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LBPlayer } from "../../pages/leaderboards";

interface PlayerLbTableProps {
  combinedPlayers: LBPlayer[];
}

const PlayerLbTable: React.FC<PlayerLbTableProps> = ({ combinedPlayers }) => {
  const [sortedPlayers, setSortedPlayers] = useState<LBPlayer[]>([]);

  useEffect(() => {
    const sorted = combinedPlayers
      .filter((player) => player.rating !== "" && Number(player.rating) > 0)
      .sort((a, b) => Number(b.rating) - Number(a.rating));

    setSortedPlayers(sorted);
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
        Player Leaderboard
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
                Region
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow key={player.id}>
                <TableCell>{index + 1}</TableCell>
                {player.regiment === "" ? (
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar sx={{ background: "transparent" }}>
                      <Image
                        src={findIcon(player.name)}
                        alt={player.name}
                        height={50}
                        width={50}
                        unoptimized
                      />
                    </Avatar>
                    {player.name}
                  </TableCell>
                ) : (
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar sx={{ background: "transparent" }}>
                      <Image
                        src={findIcon(player.name)}
                        alt={player.name}
                        height={50}
                        width={50}
                        unoptimized
                      />
                    </Avatar>
                    {player.regiment} {player.name}
                  </TableCell>
                )}
                <TableCell align="left">{player.rating}</TableCell>
                <TableCell>{player.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayerLbTable;
