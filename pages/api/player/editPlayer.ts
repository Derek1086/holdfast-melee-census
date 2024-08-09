import { MongoClient } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const client: MongoClient = await clientPromise;
    const db = client.db("HOLDFASTMAP");

    const { playerId, updatedData, region } = req.body;

    if (!playerId || !updatedData || !region) {
      return res
        .status(400)
        .json({ message: "Player ID, updated data, and region are required." });
    }

    console.log("Editing player:", playerId, "in region:", region);

    try {
      const regionDoc = await db.collection(region).findOne({});

      if (!regionDoc) {
        return res.status(404).json({ message: "Region not found." });
      }

      // Find the player in the players array
      const playerIndex = regionDoc.players.findIndex(
        (player: { id: string }) => player.id === playerId
      );

      if (playerIndex === -1) {
        return res.status(404).json({ message: "Player not found." });
      }

      const updatedPlayers = [...regionDoc.players];
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        ...updatedData,
      };

      // Update the players array in the document
      const result = await db
        .collection(region)
        .updateOne(
          { _id: regionDoc._id },
          { $set: { players: updatedPlayers } }
        );

      if (result.modifiedCount === 0) {
        return res.status(500).json({ message: "Failed to update player." });
      }

      return res.status(200).json({ message: "Player updated successfully." });
    } catch (error) {
      console.error("Error editing player:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
