import { MongoClient } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const client: MongoClient = await clientPromise;
    const db = client.db("HOLDFASTMAP");

    const { player, region } = req.body;

    if (!player || !region) {
      return res
        .status(400)
        .json({ message: "Player data and region are required." });
    }

    console.log("Adding player:", player, "to region:", region);

    try {
      const regionDoc = await db.collection(region).findOne({});

      if (!regionDoc) {
        return res.status(404).json({ message: "Region not found." });
      }

      // Add the new player to the players array
      const result = await db
        .collection(region)
        .updateOne(
          { _id: regionDoc._id },
          { $set: { players: [...regionDoc.players, player] } }
        );

      if (result.modifiedCount === 0) {
        return res.status(500).json({ message: "Failed to add player." });
      }

      return res.status(201).json({ message: "Player added successfully." });
    } catch (error) {
      console.error("Error adding player:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
