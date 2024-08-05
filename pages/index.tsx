import clientPromise from "../lib/mongodb";
import { Player, RegionData } from "./api/playerFetching";
import NavBar from "../components/NavBar";
import HomeLoader from "../components/loaders/HomeLoader";
import MapActions from "../components/home/maps/MapActions";
import ListRenderer from "../components/home/details/ListRenderer";
import NAMap from "../components/home/maps/NAMap";
import EUMap from "../components/home/maps/EUMap";
import PlayerBio from "../components/home/details/player/PlayerBio";
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import classes from "../components/home/Home.module.css";

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
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<string>("NA");
  const [location, setLocation] = useState<string>("");
  const [playersInLocation, setPlayersInLocation] = useState<Player[]>([]);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);
  const [filteredPlayers, setFilteredPlayers] = useState<string>("");
  const [searchedPlayers, setSearchedPlayers] = useState<Player[] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const updateRegionHandler = () => {
    setRegion((prevRegion) => (prevRegion === "NA" ? "EU" : "NA"));
    setLocation("");
    setFilteredPlayers("");
  };

  // get players from either NA or EU
  const regionalPlayers = players.find(
    (regionData) => regionData.Region === region
  );

  useEffect(() => {
    if (regionalPlayers && regionalPlayers.players) {
      const initialSearchedPlayers = regionalPlayers.players;
      setSearchedPlayers(initialSearchedPlayers);
      setPlayersInLocation(
        regionalPlayers
          ? regionalPlayers.players.filter(
              (player) => player.state === location
            )
          : []
      );
    }
    setLoading(false);

    if (region === "NA") {
      setZoomLevel(0.55);
      setOffset({ x: -365, y: -268 });
    } else {
      setZoomLevel(0.55);
      setOffset({ x: -117, y: -240 });
    }
  }, [regionalPlayers, setSearchedPlayers, region, location]);

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

  const zoomInHandler = () => {
    if (zoomLevel > 0.1) {
      setZoomLevel((prevZoomLevel) => prevZoomLevel - 0.1);
    }
  };

  const zoomOutHandler = () => {
    if (zoomLevel < 1) {
      setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
    }
  };

  const resetZoomHandler = () => {
    setDragStart({ x: 0, y: 0 });
    if (region === "NA") {
      setZoomLevel(0.55);
      setOffset({ x: -365, y: -268 });
    } else {
      setZoomLevel(0.55);
      setOffset({ x: -117, y: -240 });
    }
  };

  const mouseDownHandler = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const mouseMoveHandler = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (!isDragging) {
      return;
    }
    const xOffset = event.clientX - dragStart.x;
    const yOffset = event.clientY - dragStart.y;
    setOffset({ x: offset.x + xOffset, y: offset.y + yOffset });
    setDragStart({ x: event.clientX, y: event.clientY });
    console.log(offset.x + xOffset);
    console.log(offset.y + yOffset);
  };

  const mouseUpHandler = () => {
    setIsDragging(false);
  };

  const mouseLeaveBoxHandler = () => {
    setIsDragging(false);
  };

  const mouseEnterHandler = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const target = event.target as SVGPathElement;
    target.style.transition = "fill 0.5s, color 0.3s";
    target.style.fill = "#000000";
    target.style.cursor = "pointer";
  };

  const updateColorHandler = (path: string) => {
    let count = 0;

    const potentialPlayers = regionalPlayers
      ? regionalPlayers.players.filter((player) => player.state === path)
      : [];

    if (potentialPlayers.length > 0) {
      potentialPlayers.forEach(() => {
        count++;
      });
    } else {
      //console.log("No players in location.");
    }

    switch (count) {
      case 0:
        return "#FFFFFF";
      case 1:
        return "#FAD2FF";
      case 2:
        return "#F6B2FF";
      case 3:
        return "#F08EFD";
      case 4:
        return "#ED64FF";
      case 5:
        return "#E83CFF";
      case 6:
        return "#E51EFF";
      case 7:
        return "#E100FF";
      default:
        return "#DE01FD";
    }
  };

  const mouseLeaveHandler = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const target = event.target as SVGPathElement;
    target.style.transition = "fill 0.5s, color 0.3s";
    target.style.fill = updateColorHandler(target.id);
    target.style.cursor = "default";
  };

  const locationSelectHandler = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const target = event.target as SVGPathElement;
    setLocation(target.id);
    setFilteredPlayers("");
  };

  return (
    <>
      <PlayerBio
        viewingPlayer={viewingPlayer}
        setViewingPlayer={setViewingPlayer}
        region={region}
      />
      <NavBar
        region={region}
        updateRegionHandler={updateRegionHandler}
        setLocation={setLocation}
        filteredPlayers={filteredPlayers}
        setFilteredPlayers={setFilteredPlayers}
        searchHandler={searchHandler}
        searchedPlayers={searchedPlayers}
      />
      {loading ? (
        <HomeLoader />
      ) : (
        <div className={classes.container}>
          <div className={classes.map}>
            <MapActions
              zoomInHandler={zoomInHandler}
              zoomOutHandler={zoomOutHandler}
              resetZoomHandler={resetZoomHandler}
            />

            {region === "NA" ? (
              <NAMap
                zoomLevel={zoomLevel}
                offset={offset}
                mouseDownHandler={mouseDownHandler}
                mouseMoveHandler={mouseMoveHandler}
                mouseUpHandler={mouseUpHandler}
                mouseLeaveBoxHandler={mouseLeaveBoxHandler}
                mouseEnterHandler={mouseEnterHandler}
                mouseLeaveHandler={mouseLeaveHandler}
                updateColorHandler={updateColorHandler}
                locationSelectHandler={locationSelectHandler}
              />
            ) : (
              <EUMap
                zoomLevel={zoomLevel}
                offset={offset}
                mouseDownHandler={mouseDownHandler}
                mouseMoveHandler={mouseMoveHandler}
                mouseUpHandler={mouseUpHandler}
                mouseLeaveBoxHandler={mouseLeaveBoxHandler}
                mouseEnterHandler={mouseEnterHandler}
                mouseLeaveHandler={mouseLeaveHandler}
                updateColorHandler={updateColorHandler}
                locationSelectHandler={locationSelectHandler}
              />
            )}
          </div>
          <div className={`flex flex-col items-center ${classes.details}`}>
            <ListRenderer
              region={region}
              location={location}
              searchedPlayers={searchedPlayers}
              playersInLocation={playersInLocation}
              setViewingPlayer={setViewingPlayer}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
