import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

interface RequestBody {
  playerId: string;
  updatedData: {
    rating: string;
  };
  region: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { playerId, updatedData, region }: RequestBody = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("HOLDFASTMAP");
    const collection = region === "NA" ? "NAREGION" : "EUREGION";

    // Update player data in the database
    const result = await db.collection(collection).updateOne(
      { "players.id": playerId },
      {
        $set: {
          "players.$.rating": updatedData.rating,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.status(201).json({ message: "Player data updated successfully" });
    } else {
      res.status(200).json({ message: "No values were different" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
