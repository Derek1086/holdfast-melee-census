import Skeleton from "@mui/material/Skeleton";

const HomeLoader = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-3/5">
        <div className="flex">
          <div className="flex gap-4 w-1/2">
            <Skeleton
              variant="text"
              sx={{ fontSize: "40px" }}
              width={"100px"}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "40px" }}
              width={"100px"}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "40px" }}
              width={"100px"}
            />
          </div>
          <div className="w-1/2">
            <Skeleton variant="text" sx={{ fontSize: "40px" }} width={"100%"} />
          </div>
        </div>
        <div>
          <Skeleton variant="rounded" height={500} width={"100%"} />
        </div>
      </div>
      <div className="w-2/5 flex flex-col items-center">
        <Skeleton variant="text" sx={{ fontSize: "40px" }} width={"50%"} />
        <Skeleton variant="rounded" height={500} width={"100%"} />
      </div>
    </div>
  );
};

export default HomeLoader;
