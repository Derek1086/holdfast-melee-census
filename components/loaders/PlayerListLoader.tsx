import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";

const PlayerListLoader = () => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflow: "auto",
        minHeight: "75vh",
        marginTop: "15px",
      }}
    >
      <Skeleton variant="rounded" height={"80vh"} width={"100%"} />
    </List>
  );
};

export default PlayerListLoader;
