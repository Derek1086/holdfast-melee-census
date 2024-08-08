import Skeleton from "@mui/material/Skeleton";

const RegimentListLoader = () => {
  return (
    <Skeleton
      sx={{
        marginTop: "15px",
      }}
      variant="rounded"
      height={"65vh"}
      width={"100%"}
    />
  );
};

export default RegimentListLoader;
