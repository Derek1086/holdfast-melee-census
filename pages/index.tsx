import clientPromise from "@/lib/mongodb";
import { Player, RegionData } from "./api/playerFetching";
import NavBar from "@/components/navbar/NavBar";
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

export type Props = {
  players: RegionData[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("HOLDFASTMAP");

    // Fetch data from the NAREGION collection
    const naRegionData = await db
      .collection("NAREGION")
      .find({})
      .sort({})
      .limit(500)
      .toArray();

    // Fetch data from the EUREGION collection
    const euRegionData = await db
      .collection("EUREGION")
      .find({})
      .sort({})
      .limit(500)
      .toArray();

    const transformData = (data: any): RegionData[] => {
      return data.map((entry: any) => ({
        _id: entry._id,
        Region: entry.Region,
        players: entry.players.map((player: any) => ({
          id: player.id,
          name: player.name,
          regiment: player.regiment,
          city: player.city,
          bio: player.bio,
          state: player.state,
          rating: player.rating,
        })),
      }));
    };

    const transformedNaRegionData = transformData(naRegionData);
    const transformedEuRegionData = transformData(euRegionData);

    const allData = transformedNaRegionData.concat(transformedEuRegionData);
    return {
      props: { players: JSON.parse(JSON.stringify(allData)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { players: [] },
    };
  }
};

const Home: React.FC<Props> = ({ players }) => {
  const [region, setRegion] = useState<string>("NA");
  const [location, setLocation] = useState<string>("");
  const [viewingPlayer, setViewingPlayer] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] = useState<string>("");
  const [searchedPlayers, setSearchedPlayers] = useState<Player[] | null>(null);

  const updateRegionHandler = () => {
    setRegion((prevRegion) => (prevRegion === "NA" ? "EU" : "NA"));
    setLocation("");
    setViewingPlayer("");
    setFilteredPlayers("");
  };

  // get players from either NA or EU
  const regionalPlayers = players.find(
    (regionData) => regionData.Region === region
  );

  const playersInLocation = regionalPlayers
    ? regionalPlayers.players.filter((player) => player.state === location)
    : [];

  useEffect(() => {
    if (regionalPlayers && regionalPlayers.players) {
      const initialSearchedPlayers = regionalPlayers.players;
      setSearchedPlayers(initialSearchedPlayers);
      // console.log(initialSearchedPlayers);
    }
  }, [regionalPlayers, setSearchedPlayers]);

  const searchHandler = (text: string) => {
    if (text === "" && regionalPlayers && regionalPlayers.players) {
      setSearchedPlayers(regionalPlayers.players);
    }
    if (regionalPlayers && regionalPlayers.players) {
      const searchResults = regionalPlayers.players.filter(
        (player: Player) =>
          player.name.toLowerCase().includes(text) ||
          player.regiment.toLowerCase().includes(text)
      );
      setSearchedPlayers(searchResults);
    }
  };

  return (
    <>
      <NavBar
        region={region}
        updateRegionHandler={updateRegionHandler}
        setLocation={setLocation}
        setViewingPlayer={setViewingPlayer}
        filteredPlayers={filteredPlayers}
        setFilteredPlayers={setFilteredPlayers}
        searchHandler={searchHandler}
        searchedPlayers={searchedPlayers}
      />
      {/* <div className="flex flex-col place-items-center gap-12">
        {isConnected ? (
          <h2 className="text-lg text-green-500">
            You are connected to MongoDB!
          </h2>
        ) : (
          <h2 className="text-lg text-red-500">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </div> */}
    </>
  );
};

export default Home;
