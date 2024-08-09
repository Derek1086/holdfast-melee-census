import { MongoClient } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const client: MongoClient = await clientPromise;
    const db = client.db("HOLDFASTMAP");

    const { playerId, region } = req.body;

    if (!playerId || !region) {
      return res
        .status(400)
        .json({ message: "Player ID and region are required." });
    }

    console.log("Deleting player:", playerId, "from region:", region);

    try {
      const regionDoc = await db.collection(region).findOne({});

      if (!regionDoc) {
        return res.status(404).json({ message: "Region not found." });
      }

      // Filter out the player from the players array
      const updatedPlayers = regionDoc.players.filter(
        (player: { id: string }) => player.id !== playerId
      );

      // Update the players array in the document
      const result = await db
        .collection(region)
        .updateOne(
          { _id: regionDoc._id },
          { $set: { players: updatedPlayers } }
        );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Player not found." });
      }

      return res.status(200).json({ message: "Player deleted successfully." });
    } catch (error) {
      console.error("Error deleting player:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
