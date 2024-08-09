import { Player, RegionData, fetchPlayersData } from "./api/playerFetching";
import Card from "@mui/material/Card";
import NavBar from "../components/home/NavBar";
import HomeLoader from "../components/loaders/HomeLoader";
import MapActions from "../components/home/maps/MapActions";
import ListRenderer from "../components/home/details/ListRenderer";
import NAMap from "../components/home/maps/NAMap";
import EUMap from "../components/home/maps/EUMap";
import PlayerBio from "../components/home/details/player/PlayerBio";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";

import classes from "../components/home/Home.module.css";

export type Props = {
  players: RegionData[];
};

const Home: React.FC<Props> = ({ players }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [region, setRegion] = useState<string>("NA");
  const [location, setLocation] = useState<string>("");
  const [playersInLocation, setPlayersInLocation] = useState<Player[]>([]);
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);
  const [filteredPlayers, setFilteredPlayers] = useState<string>("");
  const [searchedPlayers, setSearchedPlayers] = useState<Player[] | null>(null);
  const [sortedPlayersByRating, setSortedPlayersByRating] = useState<Player[]>(
    []
  );
  const [ranking, setRanking] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

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
    if (viewingPlayer) {
      setRanking(
        sortedPlayersByRating.findIndex(
          (player) => player.id === viewingPlayer.id
        )
      );
    }
  }, [viewingPlayer]);

  useEffect(() => {
    if (regionalPlayers && regionalPlayers.players) {
      const initialSearchedPlayers = regionalPlayers.players;

      const sortedPlayers = [...regionalPlayers.players].sort(
        (a: Player, b: Player) => {
          const ratingA = a.rating ? Number(a.rating) : 0;
          const ratingB = b.rating ? Number(b.rating) : 0;
          return ratingB - ratingA;
        }
      );

      setSortedPlayersByRating(sortedPlayers);
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
    if (!text && regionalPlayers && regionalPlayers.players) {
      setSearchedPlayers(regionalPlayers.players);
      return;
    }

    if (regionalPlayers && regionalPlayers.players) {
      const searchTerms = text.toLowerCase().split(" ").filter(Boolean);

      const searchResults = regionalPlayers.players.filter((player: Player) => {
        const fullName = `${player.regiment} ${player.name}`.toLowerCase();
        return searchTerms.every((term) => fullName.includes(term));
      });

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
    event:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.TouchEvent<SVGSVGElement>
  ) => {
    setIsDragging(true);
    if ("clientX" in event) {
      setDragStart({ x: event.clientX, y: event.clientY });
    } else {
      setDragStart({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    }
  };

  const mouseMoveHandler = (
    event:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.TouchEvent<SVGSVGElement>
  ) => {
    if (!isDragging) {
      return;
    }
    let xOffset, yOffset;
    if ("clientX" in event) {
      xOffset = event.clientX - dragStart.x;
      yOffset = event.clientY - dragStart.y;
    } else {
      xOffset = event.touches[0].clientX - dragStart.x;
      yOffset = event.touches[0].clientY - dragStart.y;
    }
    setOffset({ x: offset.x + xOffset, y: offset.y + yOffset });
    setDragStart({ x: dragStart.x + xOffset, y: dragStart.y + yOffset });
  };

  const mouseUpHandler = () => {
    setIsDragging(false);
  };

  const mouseLeaveBoxHandler = () => {
    setIsDragging(false);
  };

  const mouseEnterHandler = (
    event:
      | React.MouseEvent<SVGPathElement, MouseEvent>
      | React.TouchEvent<SVGPathElement>
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
    event:
      | React.MouseEvent<SVGPathElement, MouseEvent>
      | React.TouchEvent<SVGPathElement>
  ) => {
    const target = event.target as SVGPathElement;
    target.style.transition = "fill 0.5s, color 0.3s";
    target.style.fill = updateColorHandler(target.id);
    target.style.cursor = "default";
  };

  const locationSelectHandler = (
    event:
      | React.MouseEvent<SVGPathElement, MouseEvent>
      | React.TouchEvent<SVGPathElement>
  ) => {
    const target = event.target as SVGPathElement;
    setLocation(target.id);
    setFilteredPlayers("");
  };

  return (
    <>
      <Head>
        <title>Holdfast Melee Census</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlayerBio
        viewingPlayer={viewingPlayer}
        setViewingPlayer={setViewingPlayer}
        region={region}
        ranking={ranking}
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
            <Card
              sx={{
                marginTop: "15px",
                width: "100%",
                height: "75vh",
              }}
            >
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
            </Card>
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

export default Home;
