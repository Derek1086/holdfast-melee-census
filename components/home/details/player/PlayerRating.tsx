import axios from "axios";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Player } from "../../../../pages/api/playerFetching";

interface PlayerRatingProps {
  region: string;
  player: Player;
}

interface PlayerRatingData {
  playerName: string;
  teamRating: string;
  impactRating: string;
}

type UpdatedData = {
  rating: string;
};

const handleUpdatePlayer = async (
  playerId: string,
  updatedData: UpdatedData,
  region: string
) => {
  try {
    const response = await axios.post("/api/updatePlayerRating", {
      playerId,
      updatedData,
      region,
    });

    if (response.status === 201) {
      console.log("Player data updated successfully");
    } else if (response.status === 404) {
      console.log("Player not found");
    } else if (response.status === 200) {
      console.log("No values were changed");
    } else {
      console.log("Internal Server Error");
    }
  } catch (error: any) {
    console.error("Error updating player: ", error);
  }
};

async function getSpreadsheetValues(region: string, playerId: string) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY) {
    //console.log("no api key");
    return undefined;
  }
  const spreadsheetId = "13U3pfFnv7kvx6j5YdUs7lEu57V07QEPdFeFWjHO79v4";
  const range = region === "NA" ? "NA Ranks" : "EU Ranks";
  const dateTimeRenderOption = "FORMATTED_STRING";
  const majorDimension = "ROWS";
  const valueRenderOption = "FORMATTED_VALUE";
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?dateTimeRenderOption=${dateTimeRenderOption}&majorDimension=${majorDimension}&valueRenderOption=${valueRenderOption}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response) {
      //console.log(response.data);
      const values: string[][] = response.data.values;

      if (!values || values.length === 0) {
        //console.log("No data found in the spreadsheet.");
        return;
      }

      const headers: string[] = values[0];
      const playerIndex: number = headers.indexOf("Player Name");

      if (playerIndex === -1) {
        //console.log("Player Name column not found in the spreadsheet.");
        return;
      }

      const plrRow: string[] | undefined = values.find((row) =>
        row[playerIndex]?.toLowerCase().includes(playerId.toLowerCase())
      );

      if (plrRow) {
        const playerData: PlayerRatingData = {
          playerName: plrRow[playerIndex],
          teamRating: plrRow[headers.indexOf("Team Rating")],
          impactRating: plrRow[headers.indexOf("Impact Rating")],
        };

        //console.log(`Player data for ${playerId}:`, playerData);
        //console.log(playerId);

        const samplePlayerId: string = playerId;
        const sampleUpdatedData: UpdatedData = {
          rating: playerData.impactRating,
        };

        handleUpdatePlayer(samplePlayerId, sampleUpdatedData, region);

        return playerData.impactRating;
      } else {
        //console.log(`Player named ${playerId} not found in the spreadsheet.`);
        return undefined;
      }
    }
  } catch (error: any) {
    //console.error("Error fetching spreadsheet values:", error.message);
    return undefined;
  }
}

const PlayerRating: React.FC<PlayerRatingProps> = ({ region, player }) => {
  if (!player || !region) {
    return <></>;
  }

  const [playerImpact, setPlayerImpact] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchPlayerImpact = async () => {
      const impactRating = await getSpreadsheetValues(region, player.name);
      setPlayerImpact(impactRating);
    };

    if (player) {
      fetchPlayerImpact();
    }
  }, [region, player]);

  if (playerImpact === undefined) {
    return (
      <Typography variant="body2" style={{ marginTop: "15px" }}>
        {player.rating === ""
          ? "Impact Rating: N/A"
          : `Impact Rating: ${player.rating}`}
      </Typography>
    );
  }

  return (
    <Typography variant="body2" style={{ marginTop: "15px" }}>
      {playerImpact === ""
        ? "Impact Rating: N/A"
        : `Impact Rating: ${playerImpact}`}
    </Typography>
  );
};

export default PlayerRating;
