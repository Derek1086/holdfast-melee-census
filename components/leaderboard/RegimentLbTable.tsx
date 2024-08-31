import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RegimentIcon from "../regiments/RegimentIcon";
import { LBRegiment } from "../../pages/leaderboards";

interface RegimentLbTable {
  sortedRegiments: LBRegiment[];
}

const RegimentLbTable: React.FC<RegimentLbTable> = ({ sortedRegiments }) => {
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
